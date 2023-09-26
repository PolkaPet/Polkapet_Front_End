import React, { createRef } from 'react'
import '../styles/Home.css'

import MiniGames from '../polkapet/MiniGames'
import CreateMinigame from '../polkapet/CreateMinigame'
import { useSubstrateState } from '../substrate-lib'
import { Dimmer, Loader, Grid, Message } from 'semantic-ui-react'

import Header from '../components/Header'

const Home = () => {
  const { apiState, apiError, keyringState } = useSubstrateState()

  const loader = text => (
    <Dimmer active>
      <Loader size="small">{text}</Loader>
    </Dimmer>
  )

  const message = errObj => (
    <Grid centered columns={2} padded>
      <Grid.Column>
        <Message
          negative
          compact
          floating
          header="Error Connecting to Substrate"
          content={`Connection to websocket '${errObj.target.url}' failed.`}
        />
      </Grid.Column>
    </Grid>
  )

  if (apiState === 'ERROR') return message(apiError)
  else if (apiState !== 'READY') return loader('Connecting to Substrate')

  if (keyringState !== 'READY') {
    return loader(
      "Loading accounts (please review any extension's authorization)"
    )
  }

  const contextRef = createRef()

  return (
    <div id="home" ref={contextRef}>
      <Header />
      <div style={{ marginTop: '90px' }}>
        <CreateMinigame />
      </div>

      <MiniGames />
    </div>
  )
}

export default Home
