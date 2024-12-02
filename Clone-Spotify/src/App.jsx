import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href='https://vite.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          I just loaded the vite package for spotify clone project, so don't
          look at the details
        </p>
      </div>
      <p className='read-the-docs'>
        Go to Hrithik's Github learn more
        <a href='https://github.com/HanchinamaniHrithik/ReactProjects'>
          {' '}
          Github
        </a>
      </p>
    </>
  )
}

export default App
