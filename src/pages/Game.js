import React from 'react'
import Header from '../components/Header'

function Game() {
  const loadWasmButton = document.getElementById('loadWasmButton')
  const loadcanvas = document.getElementById('canvas')

  loadWasmButton.style.display = 'block'
  loadcanvas.style.display = 'block'

  return (
    <div>
      <Header />
    </div>
  )
}

export default Game
