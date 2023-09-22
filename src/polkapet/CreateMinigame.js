import React, { useEffect, useState } from 'react'
import {
  Button,

  Modal,
  Form,

} from 'semantic-ui-react'

import { useSubstrateState } from '../substrate-lib'
import { TxButton } from '../substrate-lib/components'




const parseMiniGame = ({ gameId, owner, description, reward, maxPlayer, blockDuration,finishBlock, status }) => ({
  gameId:gameId.toJSON(),
  owner: owner.toJSON(),
  description: description.toJSON(),
  reward: reward.toJSON(),
  maxPlayer: maxPlayer.toJSON(),
  blockDuration: blockDuration.toJSON(),
  finishBlock: finishBlock.toJSON(),
  status: status.toJSON(),
})




export default function CreateMinigame(props) {
  const { api, keyring } = useSubstrateState()
  const [miniGames, setminiGames] = useState([])
  const [status, setStatus] = useState('')
  const [description, setdescription] = useState(0)
  const [reward, setreward] = useState(0)
  const [maxPlayer, setmaxPlayer] = useState(0)
  const [blockDuration, setblockDuration] = useState(0)

  const subscribeCount = () => {
    let unsub = null

    const asyncFetch = async () => {
      
      unsub = await api.query.polkapetModule.lastMinigameId(async count => {
        // Fetch all kitty keys
        const entries = await api.query.polkapetModule.minigameById.entries()
        const miniGamesMap = entries.map(entry => {
          return {
            id: entry[0],
            ...parseMiniGame(entry[1].unwrap()),
          }
        })
        setminiGames(miniGamesMap)
      })
    }

    asyncFetch()

    return () => {
      unsub && unsub()
    }
  }

  useEffect(subscribeCount, [api, keyring, miniGames])


  return (
    <>
  
    <Modal

    trigger={
      <Button basic color="blue">
        Create
      </Button>
    }
  >
    <Modal.Header>Setting</Modal.Header>
    <Modal.Content>
      <Form>
       
        <Form.Input
          fluid
          label="description"
          placeholder="Enter description"
          type="text"
          onChange={(_, { value }) => setdescription(value)}
        />
            <Form.Input
          fluid
          label="reward"
          placeholder="Enter reward"
          type="number"
          onChange={(_, { value }) => setreward(value)}
        />
            <Form.Input
          fluid
          label="maxPlayer"
          placeholder="Enter maxPlayer"
          type="number"
          onChange={(_, { value }) => setmaxPlayer(value)}
        />
            <Form.Input
          fluid
          label="blockDuration"
          placeholder="Enter blockDuration"
          type="number"
          onChange={(_, { value }) => setblockDuration(value)}
        />
      </Form>
    </Modal.Content>
    <Modal.Actions>
   
      <TxButton
        label="Create"
        type="SIGNED-TX"
        setStatus={setStatus}
        attrs={{
          palletRpc: 'polkapetModule',
          callable: 'createMinigame',
          inputParams: [description, reward, maxPlayer, blockDuration],
          paramFields: [ true, true, true,true],
        }}
      />
    </Modal.Actions>
  </Modal>
  <div style={{ overflowWrap: 'break-word', color: 'white' }}>{status}</div>
    </>
  )
}
