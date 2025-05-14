import { v2 as Cloudinary } from 'cloudinary'
import songModel from '../Models/SongModel.js'
import ffmpeg from 'fluent-ffmpeg'
import fs from 'fs'

const addSong = async (req, res) => {
  try {
    const { name, desc, album } = req.body
    const audioFile = req.files?.audio?.[0]
    const imageFile = req.files?.image?.[0]

    // Validate inputs
    if (!name || !album || !desc) {
      return res
        .status(400)
        .json({ message: 'Name, album, and description are required.' })
    }
    if (!audioFile || !imageFile) {
      return res
        .status(400)
        .json({ message: 'Both audio and image are required.' })
    }

    // Upload to Cloudinary
    const [audioUpload, imageUpload] = await Promise.all([
      Cloudinary.uploader.upload(audioFile.path, { resource_type: 'video' }),
      Cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' }),
    ])

    // Calculate duration
    const durationInSeconds = await new Promise((resolve, reject) => {
      ffmpeg.ffprobe(audioFile.path, (err, metadata) => {
        if (err) reject(err)
        else resolve(metadata.format.duration)
      })
    })
    const formattedDuration = `${Math.floor(
      durationInSeconds / 60
    )}:${Math.floor(durationInSeconds % 60)
      .toString()
      .padStart(2, '0')}`

    // Save to DB
    const newSong = new songModel({
      name,
      desc,
      album,
      image: imageUpload.secure_url,
      file: audioUpload.secure_url,
      duration: formattedDuration,
    })
    await newSong.save()

    // Clean up local files
    fs.unlinkSync(audioFile.path)
    fs.unlinkSync(imageFile.path)

    res
      .status(201)
      .json({ message: 'Song uploaded successfully', song: newSong })
  } catch (error) {
    console.error('Error uploading song:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

const listSong = async (req, res) => {
  try {
    const songs = await songModel.find().sort({ createdAt: -1 })
    res.status(200).json({ songs })
  } catch (error) {
    console.error('Error fetching songs:', error)
    res
      .status(500)
      .json({ message: 'Failed to fetch songs', error: error.message })
  }
}

const getSongsByAlbum = async (req, res) => {
  try {
    const songs = await songModel.find({ album: req.params.albumName })
    res.status(200).json(songs)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching songs by album', error })
  }
}

export { addSong, listSong, getSongsByAlbum }
