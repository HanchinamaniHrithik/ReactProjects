import { createContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
const url = import.meta.env.VITE_API_URL

export const PlayerContext = createContext()

export const PlayerContextProvider = ({ children }) => {
  const url = import.meta.env.VITE_API_URL

  const audioRef = useRef()
  const seekBar = useRef()
  const seekBg = useRef()

  const [songsData, setSongsData] = useState([])
  const [albumsData, setAlbumsData] = useState([])
  const [track, setTrack] = useState(null)
  const [playStatus, setPlayStatus] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [originalSongsData, setOriginalSongsData] = useState([])
  const [isShuffle, setIsShuffle] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [isMuted, setIsMuted] = useState(false)
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  })

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value)
    setVolume(vol)
    if (audioRef.current) {
      audioRef.current.volume = vol
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (!isMuted) {
      audioRef.current.volume = 0
      setVolume(0)
    } else {
      audioRef.current.volume = 0.5
      setVolume(0.5)
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = isLooping
    }
  }, [isLooping])

  useEffect(() => {
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.ontimeupdate = () => {
          const curr = audioRef.current.currentTime
          const dur = audioRef.current.duration
          seekBar.current.style.width = `${Math.floor((curr / dur) * 100)}%`
          setTime({
            currentTime: {
              second: Math.floor(curr % 60),
              minute: Math.floor(curr / 60),
            },
            totalTime: {
              second: Math.floor(dur % 60),
              minute: Math.floor(dur / 60),
            },
          })
        }
      }
    }, 1000)
  }, [])

  const play = () => {
    audioRef.current.play()
    setPlayStatus(true)
  }

  const pause = () => {
    audioRef.current.pause()
    setPlayStatus(false)
  }

  const playWithId = async (id) => {
    const song = songsData.find((item) => item._id === id)
    if (song) {
      setTrack(song)
      await audioRef.current.play()
      setPlayStatus(true)
    }
  }

  const previousSong = async () => {
    songsData.forEach(async (item, index) => {
      if (track && track._id === item._id && index > 0) {
        setTrack(songsData[index - 1])
        await audioRef.current.play()
        setPlayStatus(true)
      }
    })
  }

  const nextSong = async () => {
    songsData.forEach(async (item, index) => {
      if (track && track._id === item._id && index < songsData.length - 1) {
        setTrack(songsData[index + 1])
        await audioRef.current.play()
        setPlayStatus(true)
      }
    })
  }

  const seekSong = (e) => {
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration
  }

  const shuffleSongs = () => {
    const shuffled = [...songsData]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    setSongsData(shuffled)
  }

  useEffect(() => {
    if (isShuffle) {
      shuffleSongs()
    } else {
      setSongsData(originalSongsData)
    }
  }, [isShuffle])

  const getSongsData = async () => {
    try {
      const res = await axios.get(`${url}/api/song/list`)
      console.log('songs:', res.data.songs)
      setSongsData(res.data.songs)
      setOriginalSongsData(res.data.songs)
      setTrack(res.data.songs[0] || null)
    } catch (error) {
      console.log('error getSongsData:', error)
    }
  }

  const getAlbumsData = async () => {
    try {
      const res = await axios.get(`${url}/api/album/list`)
      console.log('albums:', res.data.albums)
      setAlbumsData(res.data.albums)
    } catch (error) {
      console.log('error getAlbumsData:', error)
    }
  }
  const getSongsByAlbum = async (albumName) => {
    try {
      const res = await axios.get(`${url}/api/song/album/${albumName}`)

      return res.data
    } catch (error) {
      console.error('Error fetching album songs:', error)
      return []
    }
  }

  useEffect(() => {
    getAlbumsData()
    getSongsData()
  }, [])

  return (
    <PlayerContext.Provider
      value={{
        audioRef,
        axios,
        seekBar,
        seekBg,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        playWithId,
        previousSong,
        nextSong,
        seekSong,
        songsData,
        albumsData,
        isLooping,
        toggleLoop: () => setIsLooping((prev) => !prev),
        isShuffle,
        toggleShuffle: () => setIsShuffle((prev) => !prev),
        volume,
        handleVolumeChange,
        isMuted,
        toggleMute,
        getSongsByAlbum,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
export default PlayerContextProvider
