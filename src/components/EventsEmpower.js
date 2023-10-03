/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Feed, Grid, Button, Card } from 'semantic-ui-react';

import { useSubstrateState } from '../substrate-lib';
import { getPolkapetsById } from '../utils';
import PolkapetAvatar from '../polkapet/PolkapetAvatar';
import { hexToU8a, u8aToHex } from '@polkadot/util';

// Events to be filtered from feed
const FILTERED_EVENTS = [
  'system:ExtrinsicSuccess::(phase={"applyExtrinsic":0})',
];

const eventName = ev => `${ev.section}:${ev.method}`;
const eventParams = ev => JSON.stringify(ev.data);

function Main() {
  const { api } = useSubstrateState();
  const [eventFeed, setEventFeed] = useState([]);
  console.log('eventFeed', eventFeed);
  useEffect(() => {
    let unsub = null;
    let keyNum = 0;
    const allEvents = async () => {
      unsub = await api.query.system.events(events => {
        // loop through the Vec<EventRecord>
        events.forEach(async record => {
          // extract the phase, event and the event types
          const { event, phase } = record;

          // show what we are busy with
          const evHuman = event.toHuman();
          const evName = eventName(evHuman);
          const evParams = eventParams(evHuman);
          const evNamePhase = `${evName}::(phase=${phase.toString()})`;
          // Empowered

          // polkapetModule.Empowered
          // polkapet: u64 11
          // power: u32 4

          if (FILTERED_EVENTS.includes(evNamePhase)) return;
          if (evName === 'polkapetModule:Empowered') {
            const pet = await getPolkapetsById(
              api,
              JSON.parse(evParams)?.polkapet
            );

            setEventFeed(e => [
              {
                key: keyNum,
                icon: 'bell',
                summary: evName,
                content: evParams,
                ...pet,
              },
              ...e,
            ]);

            keyNum += 1;
          }
        });
      });
    };

    allEvents();
    return () => unsub && unsub();
  }, [api, api.query.system]);

  return <CardContentBlock events={eventFeed} />;
}

export default function EventsEmpower(props) {
  const { api } = useSubstrateState();
  return api.query && api.query.system && api.query.system.events ? (
    <Main {...props} />
  ) : null;
}

const CardContentBlock = ({ events }) => (
  <Card
    width="100%"
    style={{ color: 'grey', overflow: 'hidden', justifyContent: 'center' }}
  >
    <Card.Content>
      <Feed
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
        }}
      >
        {events.map(event => (
          <Feed.Event key={event.dna}>
            <PolkapetAvatar
              dna={hexToU8a(event?.dna)}
              deadStatus={event?.death}
              heightOuterStyle={64}
              widthOuterStyle={'auto'}
              heightInnerStyle={60}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                paddingLeft: '70px',
                justifyContent: 'center',
                alignItems: 'start',
              }}
            >
              <div>
                Pet killed Id: <strong>{event?.petId}</strong>
              </div>
              <div>
                New power: <strong>{event?.power}</strong>
              </div>
            </div>
          </Feed.Event>
        ))}
      </Feed>
    </Card.Content>
  </Card>
);
