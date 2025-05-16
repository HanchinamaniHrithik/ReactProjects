import { useContext } from 'react'
import { PlayerContext } from '../Context/PlayerContext'
import { useParams } from 'react-router-dom'

const DisplayAlbum = () => {
  const { album, getSongsByAlbum, playWithId } = useContext(PlayerContext)
  const [albumSongs, setAlbumSongs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSongs = async () => {
      if (album?.name) {
        const songs = await getSongsByAlbum(album.name)
        setAlbumSongs(songs)
        setLoading(false)
      }
    }
    fetchSongs()
  }, [album])

  if (loading) return <div className='text-white p-4'>Loading songs...</div>

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
