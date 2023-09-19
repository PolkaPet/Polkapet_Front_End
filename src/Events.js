/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Feed, Grid, Button, Card } from 'semantic-ui-react'

import { useSubstrateState } from './substrate-lib'
import { getPolkapetsById } from './utils'
import PolkapetAvatar from './polkapet/PolkapetAvatar'
import { hexToU8a, u8aToHex } from '@polkadot/util'

// Events to be filtered from feed
const FILTERED_EVENTS = [
  'system:ExtrinsicSuccess::(phase={"applyExtrinsic":0})',
]

const eventName = ev => `${ev.section}:${ev.method}`
const eventParams = ev => JSON.stringify(ev.data)

function Main(props) {
  const { api } = useSubstrateState()
  const [eventFeed, setEventFeed] = useState([])

  useEffect(() => {
    let unsub = null
    let keyNum = 0
    const allEvents = async () => {
      unsub = await api.query.system.events(events => {
        // loop through the Vec<EventRecord>
        events.forEach(async record => {
          // extract the phase, event and the event types
          const { event, phase } = record

          // show what we are busy with
          const evHuman = event.toHuman()
          const evName = eventName(evHuman)
          const evParams = eventParams(evHuman)
          const evNamePhase = `${evName}::(phase=${phase.toString()})`
          console.log('evNamePhase', evNamePhase)
          if (FILTERED_EVENTS.includes(evNamePhase)) return
          console.log('content?.polkapet', JSON.parse(evParams))
          console.log('content?.polkapet', typeof evParams)
          console.log('content?.polkapet', evParams?.polkapet)

          console.log('content?.polkapetxxx', JSON.parse(evParams)?.polkapet)
          const pet = await getPolkapetsById(
            api,
            JSON.parse(evParams)?.polkapet
          )
          console.log('pet', pet)
          setEventFeed(e => [
            {
              key: keyNum,
              icon: 'bell',
              summary: evName,
              content: evParams,
              ...pet,
            },
            ...e,
          ])

          keyNum += 1
        })
      })
    }

    allEvents()
    return () => unsub && unsub()
  }, [api, api.query.system])

  const { feedMaxHeight = 250 } = props

  return (
    <Grid.Column
      width={8}
      style={{
        background: '#ffe',
      }}
    >
      <h1 style={{ float: 'left' }}>Events</h1>
      <Button
        basic
        circular
        size="mini"
        color="grey"
        floated="right"
        icon="erase"
        onClick={_ => setEventFeed([])}
      />

      <CardContentBlock events={eventFeed} />
    </Grid.Column>
  )
}

export default function Events(props) {
  const { api } = useSubstrateState()
  return api.query && api.query.system && api.query.system.events ? (
    <Main {...props} />
  ) : null
}

const CardContentBlock = ({ events }) => (
  <Card width="100%">
    <Card.Content>
      <Card.Header>Recent Activity</Card.Header>
    </Card.Content>
    <Card.Content>
      <Feed>
        {events.map(event => (
          <Feed.Event key={event.dna}>
            <PolkapetAvatar
              dna={hexToU8a(event?.dna)}
              heightOuterStyle={64}
              widthOuterStyle={'auto'}
              heightInnerStyle={60}
            />
            <div
              style={{ display: 'flex', width: '100%', paddingLeft: '70px' }}
            >
              <Feed.Content>
                <Feed.Summary>
                  Pet killed. Id: {event?.petId}
                  <br />
                  Gender: {event?.gender}
                  <br />
                  Oval position: {event?.ovalPosition}{' '}
                </Feed.Summary>
              </Feed.Content>
            </div>
          </Feed.Event>
        ))}
      </Feed>
    </Card.Content>
  </Card>
)
