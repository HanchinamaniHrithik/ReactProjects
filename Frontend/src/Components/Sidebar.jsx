import React from 'react'
import { assets } from '../assets/assets'

function Sidebar() {
  return (
    <div className='w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex'>
      <div className='bg-[#121212] h-[15%] rounded flex flex-col justify-around'>
        <div className='flex items-center gap-3 pl-8 cursor-pointer'>
          <img className='w-6' src={assets.home_icon} alt='home icon' />
          <p className='font-bold'>Home</p>
        </div>
        <div className='flex items-center gap-3 pl-8 cursor-pointer'>
          <img className='w-6' src={assets.search_icon} alt='search icon' />
          <p className='font-bold'>Search</p>
        </div>
      </div>
      <div className='bg-[#121212] h-[85%] rounded'>
        <div className='p-4 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <img className='w-8' src={assets.stack_icon} alt='stack_icon' />
            <p className=' font-bold'>Your Library</p>
          </div>
          <div className='flex items-center gap-3'>
            <img className='w-5' src={assets.arrow_icon} alt='arrow_icon' />
            <img className='w-5' src={assets.plus_icon} alt='plus_icon' />
          </div>
        </div>
        <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4'>
          <h1>Create your first playlist</h1>
          <p className='font-light'>It&apos;s easy, we'll help you</p>
          <button className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-2'>
            Create Playlist
          </button>
        </div>
        <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start mt-4 gap-1 pl-4'>
          <h1>Let's find some podcasts to follow</h1>
          <p className='font-light'>
            We&apos;ll keep you updated on new episodes
          </p>
          <button className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-2'>
            Browse Podcasts
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
