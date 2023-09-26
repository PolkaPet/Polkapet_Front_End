import React from 'react'
import '../styles/Hero.css'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import YoutubeEmbed from "./YoutubeEmbed";

const Hero = () => {
  let navigate = useNavigate()
  const goCreate = () => {
    navigate('/mintnft')
  }

  return (
    <div id="hero">
      {/* <img id='hero-background' src={list[0].src}/> */}

      <Header />

      <h1 id="header-text-first"> Polkapet </h1>
      <h5 id="header-subtext">Welcome to the Limitless Creature World</h5>
      <YoutubeEmbed embedId="-a8TKbGHCj8" />
      <div id="hero-buttons">
        <button id="create" onClick={goCreate}>
          Create
        </button>
      </div>
    </div>
  )
}

export default Hero
