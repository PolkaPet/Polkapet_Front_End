import React from 'react'
import {
  Container,

  Grid,

} from 'semantic-ui-react'



import { DeveloperConsole } from './substrate-lib/components'


import Balances from './Balances'
import BlockNumber from './BlockNumber'
import Events from './Events'
import Interactor from './Interactor'
import Metadata from './Metadata'
import NodeInfo from './NodeInfo'
import TemplateModule from './TemplateModule'
import Transfer from './Transfer'
import Upgrade from './Upgrade'
import Polkapets from './Polkapets';
import './styles/blockchaininfo.css'

function Main() {



  return (
    <div style={{marginTop: "90px", backgroundColor: "white"}} >

      <Container>
        <Grid stackable columns="equal">
          <Grid.Row stretched>
            <NodeInfo />
            <Metadata />
            <BlockNumber />
            <BlockNumber finalized />
          </Grid.Row>
          <Grid.Row stretched>
            <Balances />
          </Grid.Row>
          <Grid.Row>
            <Transfer />
            <Upgrade />
          </Grid.Row>
          <Grid.Row>
            <Interactor />
            <Events />
          </Grid.Row>
          <Grid.Row>
            <TemplateModule />
          </Grid.Row>
          <Grid.Row>
            <Polkapets />
          </Grid.Row>
        </Grid>
      </Container>
      <DeveloperConsole />
    </div>
  )
}

export default function BlockchainInfo() {
  return (
   
      <Main />

  )
}
