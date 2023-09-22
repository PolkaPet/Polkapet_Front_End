import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Create from './pages/Create'
import Explore from './pages/Explore'
import { SubstrateContextProvider } from './substrate-lib'
import MintNFT from './pages/MintNFT'
import MiniGame from './pages/MiniGame'
import Game from './pages/Game'


//dapp

import NFTDetail from './pages/NFTDetail'


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
            {' '}
            <Home />{' '}
          </SubstrateContextProvider>
        }
      />
      <Route
        path="/"
        element={
          <SubstrateContextProvider>
            {' '}
            <Create />{' '}
          </SubstrateContextProvider>
        }
      />
      <Route
        path="/"
        element={
          <SubstrateContextProvider>
            {' '}
            <Explore />{' '}
          </SubstrateContextProvider>
        }
      />
      <Route
        path="/"
        element={
          <SubstrateContextProvider>
            {' '}
            <NFTDetail />{' '}
          </SubstrateContextProvider>
        }
      />
      <Route
        path="/game"
        element={
          <SubstrateContextProvider>
            {' '}
            <Game />{' '}
          </SubstrateContextProvider>
        }
      />
      <Route
        path="/mintnft"
        element={
          <SubstrateContextProvider>
            {' '}
            <MintNFT />{' '}
          </SubstrateContextProvider>
        }
      />
      <Route
        path="/createminigame"
        element={
          <SubstrateContextProvider>
            {' '}
            <MiniGame />{' '}
          </SubstrateContextProvider>
        }
      />
      <Route
        path="/blockchaininfo"
        element={
          <SubstrateContextProvider>
            {' '}
            <App />{' '}
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
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
