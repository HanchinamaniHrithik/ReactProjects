import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    console.log('MONGO_URI:', process.env.MONGO_URI)
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (error) {
    console.error('MongoDB connection failed:', error)
    process.exit(1)
  }
}

export default connectDB
