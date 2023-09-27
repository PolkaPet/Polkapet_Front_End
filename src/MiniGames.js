import React, { useEffect, useState } from 'react'
import { Grid } from 'semantic-ui-react'

import { useSubstrateState } from './substrate-lib'
import MiniGameCards from './polkapet/MiniGameCards'




const parseMiniGame = ({ gameId, owner, description, reward, maxPlayer, blockDuration,finishBlock, status }) => ({
gameId: gameId.toJSON(),
owner: owner.toJSON(),
description: description.toString(),
reward: reward.toJSON(),
maxPlayer: maxPlayer.toJSON(),
blockDuration: blockDuration.toJSON(),
finishBlock: finishBlock.toJSON(),
status: status.toJSON(),
})


  

export default function MiniGames(props) {
  const { api, keyring } = useSubstrateState()
  const [miniGames, setminiGames] = useState([])
  const [status, setStatus] = useState('')

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
      <Grid.Column width={16}>
        <h1 style={{color:"white"}}>MiniGame</h1>
        <MiniGameCards miniGames={miniGames}  setStatus={setStatus}/>
        <div style={{ overflowWrap: 'break-word' , color:'white'}}>{status}</div>
  
      </Grid.Column>
    )
  
}




