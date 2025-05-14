import { v2 as Cloudinary } from 'cloudinary'
import songModel from '../Models/SongModel.js'
const addSong = async (req, res) => {
  try {
    const { name, desc, album } = req.body

    const audioFile = req.files?.audio?.[0]
    const imageFile = req.files?.image?.[0]

    if (!audioFile || !imageFile) {
      return res
        .status(400)
        .json({ message: 'Both audio and image are required.' })
    }

    const audioUpload = await Cloudinary.uploader.upload(audioFile.path, {
      resource_type: 'video',
    })

    const imageUpload = await Cloudinary.uploader.upload(imageFile.path, {
      resource_type: 'image',
    })

    const newSong = new songModel({
      name,
      desc,
      album,
      image: imageUpload.secure_url,
      file: audioUpload.secure_url,
      duration: '00:00', // Add logic to calculate duration if needed
    })

    await newSong.save()

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

export { addSong, listSong }
