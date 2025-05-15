import express from 'express'
import upload from '../Middleware/multer.js'
import { addAlbum } from '../Controllers/AlbumController.js'

const albumRouter = express.Router()

albumRouter.post('/add', upload.single('image'), addAlbum)

export default albumRouter
