import { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'
import { useParams } from 'react-router-dom'

const DisplayAlbum = () => {
  const { songsData, albumsData, playWithId } = useContext(PlayerContext)
  const { id } = useParams()

  const album = albumsData.find((a) => a._id === id)
  const albumSongs = songsData.filter((song) => song.album === album?.name)

  return (
    <div className='text-white'>
      <div className='mb-6'>
        <img src={album?.image} className='w-48 rounded mb-4' />
        <h1 className='text-3xl font-bold'>{album?.name}</h1>
        <p className='text-sm text-gray-400'>{album?.desc}</p>
      </div>
      <ul className='space-y-4'>
        {albumSongs.map((song) => (
          <li
            key={song._id}
            className='bg-[#1e1e1e] p-4 rounded hover:bg-[#2e2e2e] cursor-pointer flex items-center gap-4'
            onClick={() => playWithId(song._id)}
          >
            <img src={song.image} className='w-16 h-16 rounded' />
            <div>
              <p className='text-lg font-semibold'>{song.name}</p>
              <p className='text-sm text-gray-400'>{song.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DisplayAlbum
