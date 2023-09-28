import React, { createRef } from 'react'
import '../styles/Home.css'
import { useSubstrateState } from '../substrate-lib'
import { Dimmer, Loader, Grid, Message } from 'semantic-ui-react'

import Header from '../components/Header'
import Events from '../components/Events'
import OvalBostNumber from '../components/OvalBostNumber'

const WorldEnv = () => {
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
      <div style={{ color: '#fff', marginTop: '90px' }}>
        <Grid columns={2} stackable>
          <Grid.Column>
            <OvalBostNumber />
          </Grid.Column>
          <Grid.Column>
            <Events />
          </Grid.Column>
        </Grid>
      </div>
    </div>
  )
}

export default WorldEnv
