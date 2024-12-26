import { v2 as Cloudinary } from 'cloudinary'
import songModel from '../Models/SongModel'
const addSong = async (req, res) => {
  try {
    const name = req.body.name
    const desc = req.body.desc
    const album = req.body.album

    const audioFile = req.files.audio[0]
    const imageFile = req.files.image[0]
    const audioUpload = Cloudinary.uploader.upload(audioFile.path, {
      resource_type: 'video',
    })
    const imageUpload = Cloudinary.uploader.upload(imageFile.path, {
      resource_type: 'image',
    })

    console.log(name, album, audioUpload, imageUpload)
  } catch (error) {}
}

const listSong = async () => {}

export { addSong, listSong }
