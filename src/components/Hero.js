/* eslint-disable no-unused-vars */
import React from 'react';
import '../styles/Hero.css';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import YoutubeEmbed from './YoutubeEmbed';

const Hero = () => {
  let navigate = useNavigate();
  const goCreate = () => {
    navigate('/mintnft');
  };

  return (
    <div id="hero">
      {/* <img id='hero-background' src={list[0].src}/> */}

      <Header />

      <h1
        id="header-text-first"
        style={{ fontFamily: 'Unbounded, sans-serif' }}
      >
        Polkapet
      </h1>
      <h3 style={{ fontFamily: 'Unbounded, sans-serif' }} id="header-subtext">
        Welcome to the Limitless Creature World
      </h3>
      <YoutubeEmbed embedId="FEjNzmv781s" />
      <div id="hero-buttons">
        <button id="create" onClick={goCreate}>
          Create
        </button>
      </div>
    </div>
  );
};

export default Hero;
