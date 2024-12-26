import { addSong, listSong } from '../Controllers/Songcontroller'
import express from 'express'

const SongRouter = express.Router()

//Path

SongRouter.post('/add', addSong)
SongRouter.post('list', listSong)
