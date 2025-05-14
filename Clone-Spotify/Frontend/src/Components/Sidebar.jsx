import React from 'react'
import { assets } from '../assets/assets'
import { usePlayer } from '../hooks/usePlayer'

function Sidebar() {
  const { albumsData } = usePlayer()
  return (
    <div className='w-[260px] h-full p-4 flex flex-col gap-4 bg-[#000]'>
      {/* Home & Search */}
      <div className='bg-[#121212] p-4 rounded space-y-4'>
        <div className='flex items-center gap-3 cursor-pointer'>
          <img className='w-6' src={assets.home_icon} alt='home icon' />
          <p className='font-bold'>Home</p>
        </div>
        <div className='flex items-center gap-3 cursor-pointer'>
          <img className='w-6' src={assets.search_icon} alt='search icon' />
          <p className='font-bold'>Search</p>
        </div>
      </div>

      {/* Your Library */}
      <div className='bg-[#121212] p-4 rounded'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <img className='w-6' src={assets.stack_icon} alt='stack_icon' />
            <p className='font-bold'>Your Library</p>
          </div>
          <div className='flex items-center gap-3'>
            <img className='w-4' src={assets.arrow_icon} alt='arrow_icon' />
            <img className='w-4' src={assets.plus_icon} alt='plus_icon' />
          </div>
        </div>
      </div>

      {/* Playlist Section */}
      <div className='bg-[#242424] p-4 rounded space-y-2'>
        <h2 className='font-semibold'>Create your first playlist</h2>
        <p className='text-sm font-light'>
          It&apos;s easy, we&apos;ll help you
        </p>
        <button className='text-sm bg-white text-black px-4 py-1 rounded-full'>
          Create Playlist
        </button>
      </div>

      {/* Podcast Section */}
      <div className='bg-[#242424] p-4 rounded space-y-2'>
        <h2 className='font-semibold'>
          Let&apos;s find some podcasts to follow
        </h2>
        <p className='text-sm font-light'>We&apos;ll keep you updated</p>
        <button className='text-sm bg-white text-black px-4 py-1 rounded-full'>
          Browse Podcasts
        </button>
      </div>

      {/* Ablum list */}
      <div className='space-y-2'>
        {albumsData?.map((album) => (
          <Link
            key={album._id}
            to={`/album/${album._id}`}
            className='block p-2 hover:bg-[#2a2a2a] rounded text-sm'
          >
            {album.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
