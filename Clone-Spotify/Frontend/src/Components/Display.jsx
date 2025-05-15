import { Route, Routes, useLocation } from 'react-router-dom'
import DisplayHome from './DisplayHome'
import DisplayAlbum from './DisplayAlbum'
import { useContext, useEffect, useRef } from 'react'
import { PlayerContext } from '../Context/PlayerContext'

function Display() {
  const { albumsData } = useContext(PlayerContext)
  const displayRef = useRef()
  const location = useLocation()

  const isAlbum = location.pathname.includes('album')
  const albumId = isAlbum ? location.pathname.split('/').pop() : ''

  const bgColor =
    isAlbum && albumsData.length > 0
      ? albumsData.find((album) => album._id === albumId)?.bgColor || '#121212'
      : '#121212'

  useEffect(() => {
    if (!displayRef.current) return

    displayRef.current.style.background = isAlbum
      ? `linear-gradient(${bgColor},#121212)`
      : '#121212'
  }, [isAlbum, bgColor])

  return (
    <div
      ref={displayRef}
      className='w-full m-2 px-6 pt-4 rounded bg-[#121212] text-white lg:w-[75%] lg:ml-0 overflow-y-auto'
    >
      {albumsData.length > 0 ? (
        <Routes>
          <Route path='/' element={<DisplayHome />} />
          <Route
            path='/album/:id'
            element={
              <DisplayAlbum
                album={albumsData.find((album) => album._id === albumId)}
              />
            }
          />
        </Routes>
      ) : (
        <p className='text-gray-400'>No albums found.</p>
      )}
    </div>
  )
}

export default Display
