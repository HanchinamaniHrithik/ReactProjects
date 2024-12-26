import mongoose from 'mongoose'

const connectDB = async () => {
  mongoose.Connection.on('Connected', () => {
    console.log('Connection established')
  })
  await mongoose.connect(`${process.env.MONGO_URI}/spotify`)
}

export default connectDB
