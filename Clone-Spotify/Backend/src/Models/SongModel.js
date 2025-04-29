import mongoose from 'mongoose'

const SongSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  album: { type: String, required: true },
  image: {
    type: String,
    required: true,
  },
  file: { type: String, required: true },
  duration: { type: String, required: true },
})

const songModel =
  mongoose.models.songM || mongoose.model('songModel', SongSchema)

export default songModel
