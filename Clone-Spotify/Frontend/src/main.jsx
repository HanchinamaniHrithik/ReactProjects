import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import PlayerContextProvider from './context/PlayerContext'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <PlayerContextProvider>
      <App />
    </PlayerContextProvider>
  </BrowserRouter>
)
