import React from 'react'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[20%] h-full p-4 flex-col gap-2 text-white hidden lg:flex'>
      <div className='bg-[#121212] h-[15%] w-full rounded flex flex-col justify-around'>
        <div className='flex flex-row items-center gap-1 pl-8 cursor-pointer'>
          <img className='w-6 ' src={assets.home_icon} alt='home icon' />
          <p className='font-bold'> Home</p>
        </div>
        <div className='flex flex-row items-center gap-1 pl-8 cursor-pointer'>
          <img className='w-6' src={assets.search_icon} alt='search icon' />
          <p className='font-bold'>Search</p>
        </div>

        <div className='bg-[#121212] h=[85%] rounded'>
          <div className='p-4 flex items-center justify-between'>
            <div className='w-8 flex items-center gap-3'>
              <img src={assets.stack_icon} alt='Stack image' />
              <p className='w-5 font-bold flex'> Your library </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
