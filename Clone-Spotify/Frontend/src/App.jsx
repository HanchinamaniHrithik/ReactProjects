import { usePlayer } from './hooks/usePlayer'
import Sidebar from './components/Sidebar'
import Display from './components/Display'
import Player from './components/Player'
const App = () => {
  const { audioRef } = usePlayer()

  return (
    <div className='h-screen bg-black text-white flex flex-col'>
      <div className='flex flex-1 overflow-hidden'>
        <Sidebar />
        <Display />
        <UploadSongForm />
      </div>
      <Player />
      <audio ref={audioRef} />
    </div>
  )
}

export default App
