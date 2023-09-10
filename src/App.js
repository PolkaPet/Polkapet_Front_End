import React, { createRef } from 'react'
import {
  Dimmer,
  Loader,
  Grid,
  Message,
  
} from 'semantic-ui-react'


import {  useSubstrateState } from './substrate-lib'
import Header from './components/Header'

import BlockchainInfo from './BlockchainInfo'
import './styles/blockchaininfo.css'

function Main() {
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
    <div ref={contextRef}>
   
          <Header />

       
          <BlockchainInfo />

   
      
  
    </div>
  )
}

export default function App() {
  return (
   
      <Main />

  )
}
