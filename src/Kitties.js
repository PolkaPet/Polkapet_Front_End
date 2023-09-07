import React, { useEffect, useState } from 'react'
import { Form, Grid } from 'semantic-ui-react'

import { useSubstrateState } from './substrate-lib'
import { TxButton } from './substrate-lib/components'

import KittyCards from './KittyCards'



const parseKitty = ({ dna, price, gender, owner }) => ({
  dna,
  price: price.toJSON(),
  gender: gender.toJSON(),
  owner: owner.toJSON(),
})

// Construct a Kitty ID from storage key
const convertToKittyHash = entry =>
  `0x${entry[0].toJSON().slice(-64)}`;



export default function Kitties(props) {
  const { api, keyring } = useSubstrateState()
  const [kitties, setKitties] = useState([])
  const [status, setStatus] = useState('')



  const subscribeCount = () => {
    let unsub = null

    const asyncFetch = async () => {
      unsub = await api.query.kittiesModule.kittyCnt(async count => {
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
      <h1>Kitties</h1>
      <KittyCards kitties={kitties} setStatus={setStatus} />
      <Form style={{ margin: '1em 0' }}>
        <Form.Field style={{ textAlign: 'center' }}>
          <TxButton
            label="Create Kitty"
            type="SIGNED-TX"
            setStatus={setStatus}
            attrs={{
              palletRpc: 'kittiesModule',
              callable: 'createKitty',
              inputParams: [],
              paramFields: [],
            }}
          />
        </Form.Field>
      </Form>
      <div style={{ overflowWrap: 'break-word' }}>{status}</div>
    </Grid.Column>
  )
}