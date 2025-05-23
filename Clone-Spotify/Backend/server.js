import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './src/Config/Mongo.js'
import ConCloud from './src/Config/Cloudinary.js'
import SongRouter from './src/Routes/SongRoutes.js'
import albumRouter from './src/Routes/AlbumRoutes.js'
//config
console.log('All env vars:', process.env)

ConCloud()
const app = express()
const port = process.env.PORT || 5000
connectDB()
//Middleware files

app.use(express.json())
app.use(cors())

//Routes

app.use('/api/song', SongRouter)
app.use('/api/album', albumRouter)

//Test code in browser/postman
app.get('/', (req, res) => res.send('API working seamlessly, DW Hrithik'))

app.listen(port, () => console.log(`Server is lisetning on port ${port}`))
