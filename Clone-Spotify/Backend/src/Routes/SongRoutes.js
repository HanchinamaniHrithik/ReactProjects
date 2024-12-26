import { addSong, listSong } from '../Controllers/Songcontroller'
import express from 'express'
import upload from '../Middleware/multer'

const SongRouter = express.Router()

//Path

SongRouter.post(
  '/add',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
  ]),
  addSong
)
SongRouter.post('list', listSong)
