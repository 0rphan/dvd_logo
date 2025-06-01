import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DVDScreensaver from './DVDScreensaver';

function App() {
  const [count, setCount] = useState(0)

  return (
    <DVDScreensaver />
  )
}

export default App
