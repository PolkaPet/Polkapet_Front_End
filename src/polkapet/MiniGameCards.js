import React from 'react'
import { Button, Card, Grid, Message, Label } from 'semantic-ui-react'

//import MinigameAvatar from './MinigameAvatar'
import { useSubstrateState } from '../substrate-lib'
import { useNavigate } from 'react-router-dom'

const MiniGameCard = props => {
  const { miniGame } = props
  const { gameId, owner, status, description, reward } = miniGame
  //  const {gameId, owner, description, reward, maxPlayer, blockDuration,finishBlock, status} = miniGame
  const { currentAccount } = useSubstrateState()
  const isSelf = currentAccount.address === owner
  let navigate = useNavigate()

  function handleClick(gameId) {
    navigate(`/minigame/${gameId}`)
  }
  return (
    <Card style={{ width: '350px', height: '400px' }}>
      {isSelf && (
        <Label as="a" floating color="teal">
          Mine
        </Label>
      )}
      <Card.Content>
        <Card.Meta style={{ fontSize: '.9em', overflowWrap: 'break-word' }}>
          gameId: {gameId}
        </Card.Meta>
        <Card.Description>
          <p style={{ overflowWrap: 'break-word' }}>gameId: {gameId}</p>
          <p style={{ overflowWrap: 'break-word' }}>status: {status}</p>
          <p style={{ overflowWrap: 'break-word' }}>
            description: {description}
          </p>
          <p style={{ overflowWrap: 'break-word' }}>reward: {reward}</p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra style={{ textAlign: 'center' }}>
        <Button basic color="green" onClick={() => handleClick(gameId)}>
          View Game
        </Button>{' '}
      </Card.Content>
    </Card>
  )
}

const MiniGameCards = props => {
  const { miniGames, setStatus } = props

  if (miniGames.length === 0) {
    return (
      <Message info>
        <Message.Header>
          No Minigame found here... Create one now!&nbsp;
          <span role="img" aria-label="point-down">
            👇
          </span>
        </Message.Header>
      </Message>
    )
  }

  return (
    <Grid columns={3}>
      {miniGames.map((miniGame, i) => (
        <Grid.Column key={`minigame-${i}`}>
          <MiniGameCard miniGame={miniGame} setStatus={setStatus} />
        </Grid.Column>
      ))}
    </Grid>
  )
}

export default MiniGameCards
