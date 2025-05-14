import mongoose from 'mongoose'

const AlbumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  bgColor: { type: String, required: true },
  image: { type: String, required: true },
})

const AlbumModel =
  mongoose.models.AlbumM || mongoose.model('AlbumM', AlbumSchema)

export default AlbumModel
