import React, { createRef } from 'react'
import Hero from "../components/Hero";
import "../styles/Home.css";
// import CardList from "../components/CardList";
import { hotDropsData } from "../constants/MockupData";
import Polkapets from "../Polkapets";
import {  useSubstrateState } from '../substrate-lib'
import {
  Dimmer,
  Loader,
  Grid,
  Message,
} from 'semantic-ui-react'





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
      <Hero list={hotDropsData} />

      {/* <p id="card-list-header-text"> Hot Drops </p>
      <div id="list-container">
        <CardList list={hotDropsData} />
      </div> */}
      <Polkapets />
    </div>
  )
}

export default Home
