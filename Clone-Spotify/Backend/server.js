import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './src/Config/Mongo'
import ConCloud from './src/Config/Cloudinary'

//config

const app = express()
const port = process.env.PORT || 5001
connectDB()
ConCloud()
//Middleware files

app.use(express.json())
app.use(cors())

//Routes

app.get('/', (req, res) => res.send('API working seamlessly'))

app.listen(port, () => console.log(`Server is lisetning on port ${port}`))
