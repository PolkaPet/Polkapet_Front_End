import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import './styles/Polkapet.css';

import { useSubstrateState } from './substrate-lib';
import PolkapetCards from './polkapet/PolkapetCards';

const parsePolkapet = ({
  dna,
  price,
  gender,
  owner,
  petId,
  death,
  respawn,
  power,
  ovalPosition,
  id,
}) => ({
  dna,
  id: petId.toJSON(),
  price: price.toHuman(),
  gender: gender.toJSON(),
  owner: owner.toJSON(),
  petId: petId.toJSON(),
  death: death.toPrimitive(),
  respawn: respawn.toJSON(),
  power: power.toJSON(),
  ovalPosition: ovalPosition.toJSON(),
});

export default function Polkapets(props) {
  const { api, keyring } = useSubstrateState();
  const [polkapets, setPolkapets] = useState([]);
  const [status, setStatus] = useState('');

  const subscribeCount = () => {
    let unsub = null;

    const asyncFetch = async () => {
      unsub = await api.query.polkapetModule.lastPetId(async count => {
        // Fetch all polkapet keys
        const entries = await api.query.polkapetModule.polkapetsById.entries();

        const polkapetsMap = entries.map(entry => {
          return { ...parsePolkapet(entry[1].unwrap()) };
        });
        setPolkapets(polkapetsMap);
      });
    };

    asyncFetch();

    return () => {
      unsub && unsub();
    };
  };

  useEffect(subscribeCount, [api, keyring]);

  return (
    <Grid.Column width={16}>
      <h1 style={{ color: 'white' }}>Polkapets</h1>
      <PolkapetCards polkapets={polkapets} setStatus={setStatus} />
      <div style={{ overflowWrap: 'break-word', color: 'white' }}>{status}</div>
    </Grid.Column>
  );
}
