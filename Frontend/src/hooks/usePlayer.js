import { useContext } from 'react'
import { PlayerContext } from '../Context/PlayerContext'

export const usePlayer = () => {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerContextProvider')
  }
  return context
}
