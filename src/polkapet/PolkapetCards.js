import React  from 'react'
import {

  Card,
  Grid,
  Message,

  Label,
} from 'semantic-ui-react'

import PolkapetAvatar from './PolkapetAvatar'
import { useSubstrateState } from '../substrate-lib'

import { useNavigate } from 'react-router-dom'

// --- Transfer Modal ---


// --- About Pet Card ---

const PetCard = props => {
  const { polkapet } = props
  const {id = null, dna = null, gender = null, price = null,  death, respawn, power, ovalPosition} = polkapet
  const displayDna = dna && dna.toJSON()
  const { currentAccount } = useSubstrateState()
  const isSelf = currentAccount.address === polkapet.owner
  let navigate = useNavigate()

  return (
    <Card style={{width:"350px", height:"400px"}}>
      {isSelf && (
        <Label as="a" floating color="teal">
          Mine
        </Label>
      )}
      <PolkapetAvatar dna={dna.toU8a()} />
      <Card.Content>
        <Card.Meta style={{ fontSize: '.9em', overflowWrap: 'break-word' }}>
          DNA: {displayDna}
        </Card.Meta>
        <Card.Description>
          <p style={{ overflowWrap: 'break-word' }}>Pet_id: {id}</p>
          <p style={{ overflowWrap: 'break-word' }}>Gender: {gender}</p>
          <p style={{ overflowWrap: 'break-word' }}>{"Death: "  + death  +" - " +"Respawn: " +respawn}</p>
          <p style={{ overflowWrap: 'break-word' }}>{"Oval Position: " +ovalPosition +" - " +"Power: "  + power }</p>
          <p style={{ overflowWrap: 'break-word' }}>
            Price: {price || 'Not For Sale'}
          </p>
        </Card.Description>
        <button onClick={() => navigate('/detail', { state: { polkapet} })}>
          View
        </button>
      </Card.Content>

    </Card>
  )
}

const PolkapetCards = props => {
  const { polkapets, setStatus } = props


  if (polkapets.length === 0) {
    return (
      <Message info>
        <Message.Header>
          No Kitty found here... Create one now!&nbsp;
          <span role="img" aria-label="point-down">
            👇
          </span>
        </Message.Header>
      </Message>
    )
  }

  return (
    <Grid columns={3}>
      {polkapets.map((polkapet, i) => (
        <Grid.Column key={`polkapet-${i}`}>
          <PetCard polkapet={polkapet} setStatus={setStatus}   key={i}
         />
        </Grid.Column>
      ))}
    </Grid>
  )
}

export default PolkapetCards
