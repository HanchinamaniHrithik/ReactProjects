import { useState } from 'react'
import axios from 'axios'

const UploadSongForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    album: '',
    image: null,
    audio: null,
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'image' || name === 'audio') {
      setFormData({ ...formData, [name]: files[0] })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      const data = new FormData()
      data.append('name', formData.name)
      data.append('desc', formData.desc)
      data.append('album', formData.album)
      data.append('image', formData.image)
      data.append('audio', formData.audio)

      await axios.post(
        `${
          import.meta.env.VITE_API_URL || 'http://localhost:5001'
        }/api/add-song`,
        data
      )

      setMessage('Song uploaded successfully!')
      setFormData({ name: '', desc: '', album: '', image: null, audio: null })
      e.target.reset()
    } catch (error) {
      console.error('Upload failed:', error)
      setMessage('Upload failed. Please check the console.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-md mx-auto p-4 bg-white rounded-lg shadow-md space-y-4'
    >
      <h2 className='text-xl font-bold'>Upload a New Song</h2>

      <input
        type='text'
        name='name'
        placeholder='Song Name'
        onChange={handleChange}
        required
        className='w-full p-2 border rounded'
      />
      <input
        type='text'
        name='desc'
        placeholder='Description'
        onChange={handleChange}
        required
        className='w-full p-2 border rounded'
      />
      <input
        type='text'
        name='album'
        placeholder='Album Name'
        onChange={handleChange}
        required
        className='w-full p-2 border rounded'
      />
      <label className='block'>
        Image:
        <input
          type='file'
          name='image'
          accept='image/*'
          onChange={handleChange}
          required
        />
      </label>
      <label className='block'>
        Audio:
        <input
          type='file'
          name='audio'
          accept='audio/*'
          onChange={handleChange}
          required
        />
      </label>

      <button
        type='submit'
        disabled={loading}
        className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
      >
        {loading ? 'Uploading...' : 'Upload Song'}
      </button>

      {message && <p className='text-sm mt-2'>{message}</p>}
    </form>
  )
}

export default UploadSongForm
