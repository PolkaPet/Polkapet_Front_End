import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { SubstrateContextProvider } from './substrate-lib';
import MintNFT from './pages/MintNFT';
import MiniGame from './pages/MiniGame';
import Game from './pages/Game';

//dapp

import WorldEnv from './pages/WorldEnv';
import MiniGameDetail from './pages/MiniGameDetail';
import PolkapetCardsDetail from './polkapet/PolkapetCardsDetail';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      {/* <Route path="/" element={<SubstrateContextProvide config={{}}><Home /></SubstrateContextProvide>} />
        <Route path="/create" element={<SubstrateContextProvide><Create /></SubstrateContextProvide>} />
        <Route path="/explore" element={<SubstrateContextProvide config={{}}><Explore /></SubstrateContextProvide>} />
        <Route path="/detail" element={<SubstrateContextProvide config={{}}><NFTDetail /></SubstrateContextProvide>} />
        <Route path="/blockchaininfo" element={<App />} /> */}

      <Route
        path="/"
        element={
          <SubstrateContextProvider>
            <Home />
          </SubstrateContextProvider>
        }
      />
      <Route
        path="/detail"
        element={
          <SubstrateContextProvider>
            {' '}
            <PolkapetCardsDetail />{' '}
          </SubstrateContextProvider>
        }
      />
      <Route
        path="/game"
        element={
          <SubstrateContextProvider>
            <Game />
          </SubstrateContextProvider>
        }
      />
      <Route
        path="/mintnft"
        element={
          <SubstrateContextProvider>
            <MintNFT />
          </SubstrateContextProvider>
        }
      />

      <Route
        path="/world-env"
        element={
          <SubstrateContextProvider>
            <WorldEnv />
          </SubstrateContextProvider>
        }
      />
      <Route
        path="/minigame/create"
        element={
          <SubstrateContextProvider>
            <MiniGame />
          </SubstrateContextProvider>
        }
      />
      <Route
        path="/minigame/:gameId"
        element={
          <SubstrateContextProvider>
            <MiniGameDetail />
          </SubstrateContextProvider>
        }
      />

      {/* <Route path="/create" element={<Create />} />
        <Route path="/explore" element={<App />} />
        <Route path="/detail"element={<Explore />} />
        <Route path="/detail"element={<NFTDetail />} />
        <Route path="/blockchaininfo" element={<App />} /> */}
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
