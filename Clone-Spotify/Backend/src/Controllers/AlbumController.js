import { v2 as cloudinary } from 'cloudinary'
import Album from '../Models/AlbumModel.js'
import Song from './../Models/SongModel.js'

const addAlbum = async (req, res) => {
  try {
    const { name, desc, bgColor } = req.body
    const imageFile = req.file

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: 'image',
    })

    const albumData = {
      name,
      desc,
      bgColor,
      image: imageUpload.secure_url,
    }

    const album = Album(albumData)
    await album.save()

    res.status(201).json({ success: true, message: 'Album Added' })
  } catch (error) {
    console.log('Failed at addAlbum, ', error)
    res.status(400).json({ success: false, message: 'Album Add Failed' })
  }
}

const listAlbum = async (req, res) => {
  try {
    const allAlbums = await Album.find({})
    res.status(201).json({ success: true, albums: allAlbums })
  } catch (error) {
    console.log('Failed at listAlbum, ', error)
    res.status(400).json({ success: false, message: 'Album List Failed' })
  }
}

const removeAlbum = async (req, res) => {
  try {
    const { id } = req.params

    const album = await Album.findOne({ _id: id })
    console.log('album', album)
    const albumSongs = await Song.find({ album: album.name })
    albumSongs.map(async (item) => {
      await Song.findByIdAndDelete(item._id)
    })
    await Album.findByIdAndDelete(id)
    res.status(200).json({ success: true, message: 'Album removed success' })
  } catch (error) {
    console.log('Failed at removeAlbum, ', error)
    res.status(400).json({ success: false, message: 'Album removed Failed' })
  }
}

export { addAlbum, listAlbum, removeAlbum }
