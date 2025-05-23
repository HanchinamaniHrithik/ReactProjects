import express from 'express'
import {
  addSong,
  listSong,
  getSongsByAlbum,
} from '../Controllers/Songcontroller.js'
import upload from '../Middleware/multer.js'

const SongRouter = express.Router()

//Path

SongRouter.post(
  '/add-song',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
  ]),
  addSong
)
SongRouter.get('/list', listSong)
SongRouter.get('/by-album/:albumName', getSongsByAlbum)

export default SongRouter
