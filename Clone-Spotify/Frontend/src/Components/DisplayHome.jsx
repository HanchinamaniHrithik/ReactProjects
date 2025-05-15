import { useContext } from 'react'
import { PlayerContext } from '../Context/PlayerContext'
import { Link } from 'react-router-dom'

const DisplayHome = () => {
  const { albumsData } = useContext(PlayerContext)

  return (
    <div className='text-white'>
      <h1 className='text-2xl font-bold mb-4'>Browse Albums</h1>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {albumsData.map((album) => (
          <Link to={`/album/${album._id}`} key={album._id}>
            <div className='bg-[#1e1e1e] p-4 rounded-lg hover:bg-[#2e2e2e] transition'>
              <img
                src={album.image}
                alt={album.name}
                className='rounded w-full h-40 object-cover mb-2'
              />
              <h2 className='text-lg font-semibold'>{album.name}</h2>
              <p className='text-sm text-gray-400'>{album.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default DisplayHome
