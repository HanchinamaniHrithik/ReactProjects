import Sidebar from './components/Sidebar'
import Display from './components/Display'
import Player from './components/Player'
import { useContext } from 'react'
import { PlayerContext } from './context/PlayerContext'

const App = () => {
  const { audioRef, track } = useContext(PlayerContext)

  return (
    <div className='h-screen bg-black text-white'>
      <div className='h-[90%] flex'>
        <Sidebar />
        <Display />
      </div>
      <Player />
    </div>
  )
}

export default App
