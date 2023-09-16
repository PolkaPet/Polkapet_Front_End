import React, { useEffect, useState } from 'react'
import { Grid } from 'semantic-ui-react'

import { useSubstrateState } from './substrate-lib'
import PolkapetCards from './polkapet/PolkapetCards'





const parsePolkapet = ({ dna, price, gender, owner }) => ({
  dna,
  price: price.toJSON(),
  gender: gender.toJSON(),
  owner: owner.toJSON(),
})

// Construct a polkapet ID from storage key
const convertToPolkapetHash = entry =>
  `0x${entry[0].toJSON().slice(-32)}`;


  
export default function Polkapets(props) {
  const { api, keyring } = useSubstrateState()
  const [polkapets, setPolkapets] = useState([])
  const [status, setStatus] = useState('')


  const subscribeCount = () => {
    let unsub = null

    const asyncFetch = async () => {
      unsub = await api.query.polkapetModule.countForPolkapets(async count => {
        // Fetch all polkapet keys
        const entries = await api.query.polkapetModule.polkapets.entries()
        const polkapetsMap = entries.map(entry => {
          return {
            id: convertToPolkapetHash(entry),
            ...parsePolkapet(entry[1].unwrap()),
          }
        })
        setPolkapets(polkapetsMap)
      })
    }

    asyncFetch()

    return () => {
      unsub && unsub()
    }
  }

  useEffect(subscribeCount, [api, keyring, polkapets])

 
    return (
      <Grid.Column width={16}>
        <h1 style={{color:"white"}}>Polkapets</h1>
        <PolkapetCards polkapets={polkapets}  setStatus={setStatus}/>
        <div style={{ overflowWrap: 'break-word' , color:'white'}}>{status}</div>
  
      </Grid.Column>
    )
  
}




