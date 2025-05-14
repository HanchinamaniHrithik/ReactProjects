import React from 'react'
import { assets } from '../assets/assets'
import { usePlayer } from '../hooks/usePlayer'

const Player = () => {
  const {
    track,
    playStatus,
    play,
    pause,
    nextSong,
    previousSong,
    seekSong,
    seekBar,
    seekBg,
    time,
    isLooping,
    toggleLoop,
    isShuffle,
    toggleShuffle,
    volume,
    handleVolumeChange,
    isMuted,
    toggleMute,
  } = usePlayer()

  const formatTime = (timeObj) => {
    return `${timeObj.minute}:${timeObj.second.toString().padStart(2, '0')}`
  }

  return (
    <div className='h-[80px] bg-[#181818] flex justify-between items-center text-white px-6 border-t border-[#282828]'>
      {/* Left Section - Track Info */}
      <div className='flex items-center gap-4 w-[30%] min-w-[180px]'>
        {track && (
          <>
            <img
              className='w-14 h-14 rounded'
              src={track.image}
              alt={track.name}
            />
            <div className='truncate'>
              <p className='font-semibold truncate'>{track.name}</p>
              <p className='text-sm text-gray-400 truncate'>{track.desc}</p>
            </div>
            <button className='ml-2'>
              <img
                src={assets.like_icon}
                alt='Like'
                className='w-5 opacity-70 hover:opacity-100'
              />
            </button>
          </>
        )}
      </div>

      {/* Center Section - Player Controls */}
      <div className='flex flex-col items-center w-[40%] max-w-[722px]'>
        <div className='flex items-center gap-6 mb-2'>
          <button
            onClick={toggleShuffle}
            className={`p-1 ${
              isShuffle ? 'opacity-100' : 'opacity-50'
            } hover:opacity-100`}
          >
            <img src={assets.shuffle_icon} alt='Shuffle' className='w-5' />
          </button>

          <button onClick={previousSong} className='p-1 hover:scale-110'>
            <img src={assets.prev_icon} alt='Previous' className='w-5' />
          </button>

          <button
            onClick={playStatus ? pause : play}
            className='bg-white p-2 rounded-full hover:scale-105'
          >
            <img
              src={playStatus ? assets.pause_icon : assets.play_icon}
              alt={playStatus ? 'Pause' : 'Play'}
              className='w-6'
            />
          </button>

          <button onClick={nextSong} className='p-1 hover:scale-110'>
            <img src={assets.next_icon} alt='Next' className='w-5' />
          </button>

          <button
            onClick={toggleLoop}
            className={`p-1 ${
              isLooping ? 'opacity-100' : 'opacity-50'
            } hover:opacity-100`}
          >
            <img src={assets.loop_icon} alt='Loop' className='w-5' />
          </button>
        </div>

        {/* Seek Bar */}
        <div className='flex items-center gap-2 w-full'>
          <span className='text-xs text-gray-400 w-10 text-right'>
            {formatTime(time.currentTime)}
          </span>
          <div
            ref={seekBg}
            onClick={seekSong}
            className='bg-[#535353] h-1 rounded-full w-full cursor-pointer group'
          >
            <div
              ref={seekBar}
              className='bg-white h-1 rounded-full relative'
              style={{
                width: `${
                  ((time.currentTime.minute * 60 + time.currentTime.second) /
                    (time.totalTime.minute * 60 + time.totalTime.second)) *
                  100
                }%`,
              }}
            >
              <div className='hidden group-hover:block absolute -right-1 -top-1 w-3 h-3 bg-white rounded-full'></div>
            </div>
          </div>
          <span className='text-xs text-gray-400 w-10'>
            {formatTime(time.totalTime)}
          </span>
        </div>
      </div>

      {/* Right Section - Volume Controls */}
      <div className='flex items-center justify-end gap-3 w-[30%] min-w-[180px]'>
        <button onClick={toggleMute} className='opacity-70 hover:opacity-100'>
          <img
            src={isMuted ? assets.mute_icon : assets.volume_icon}
            alt='Volume'
            className='w-5'
          />
        </button>
        <input
          type='range'
          min='0'
          max='1'
          step='0.01'
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className='w-24 accent-white'
        />
      </div>
    </div>
  )
}

export default Player
