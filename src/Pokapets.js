import React, { useEffect, useState } from 'react'
import { Grid } from 'semantic-ui-react'

import { useSubstrateState } from './substrate-lib'

import KittyCards from './pokapet/KittyCards'

const parseKitty = ({ dna, price, gender, owner }) => ({
  dna,
  price: price.toJSON(),
  gender: gender.toJSON(),
  owner: owner.toJSON(),
})

// Construct a Kitty ID from storage key
const convertToKittyHash = entry => `0x${entry[0].toJSON().slice(-64)}`

export default function Pokapets(props) {
  const { api, keyring } = useSubstrateState()
  const [kitties, setKitties] = useState([])

  const subscribeCount = () => {
    let unsub = null

    const asyncFetch = async () => {
      unsub = await api.query.kittiesModule?.kittyCnt(async count => {
        // Fetch all kitty keys
        const entries = await api.query.kittiesModule.kitties.entries()
        const kittiesMap = entries.map(entry => {
          return {
            id: convertToKittyHash(entry),
            ...parseKitty(entry[1].unwrap()),
          }
        })
        setKitties(kittiesMap)
      })
    }

    asyncFetch()

    return () => {
      unsub && unsub()
    }
  }

  useEffect(subscribeCount, [api, keyring, kitties])

  return (
    <Grid.Column width={16}>
      <h1 style={{ color: 'white' }}>Pokapets</h1>
      <KittyCards kitties={kitties} />
    </Grid.Column>
  )
}
