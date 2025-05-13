import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext'

const Player = () => {
  const { track } = useContext(PlayerContext)

  return (
    <div className='h-[80px] bg-black flex justify-between items-center text-white px-6 border-t border-[#333]'>
      {track && (
        <div className='flex items-center gap-4'>
          <img className='w-12 h-12 rounded' src={track.image} alt='song img' />
          <div>
            <p className='font-semibold'>{track.name}</p>
            <p className='text-sm text-gray-400'>{track.desc?.slice(0, 20)}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Player
