import React from 'react';
import { Card, Grid, Message, Label } from 'semantic-ui-react';

import PolkapetAvatar from './PolkapetAvatar';
import { useSubstrateState } from '../substrate-lib';

import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import { convertBNtoNumber } from '../utils';
// --- Transfer Modal ---

// --- About Pet Card ---

const PetCard = props => {
  const { polkapet } = props;
  const {
    petId = null,
    dna = null,
    gender = null,
    price = null,
    death,
    power,
  } = polkapet;

  const { currentAccount } = useSubstrateState();
  const isSelf = currentAccount.address === polkapet.owner;
  let navigate = useNavigate();

  return (
    <Card style={{ width: '300px', height: '400px' }}>
      {isSelf && (
        <Label as="a" floating color="teal">
          Mine
        </Label>
      )}

      <PolkapetAvatar dna={dna.toU8a()} deadStatus={death} />

      <Card.Content>
        <Card.Description>
          <p style={{ overflowWrap: 'break-word' }}>
            Pet Id: <strong>{petId}</strong>
          </p>
          <p style={{ overflowWrap: 'break-word' }}>
            Gender: <strong>{gender}</strong>
          </p>
          <p style={{ overflowWrap: 'break-word' }}>
            Death: <strong>{death?.toString()}</strong>
          </p>
          <p style={{ overflowWrap: 'break-word' }}>
            Power: <strong>{power}</strong>
          </p>
          <p style={{ overflowWrap: 'break-word' }}>
            Price:{' '}
            {price ? (
              <strong>{convertBNtoNumber(price) + ' $LCW'}</strong>
            ) : (
              <strong>Not For Sale</strong>
            )}
          </p>
        </Card.Description>
        <button id="viewmore" onClick={() => navigate(`/detail/${petId}`)}>
          View more
        </button>
      </Card.Content>
    </Card>
  );
};

const PolkapetCards = props => {
  const { polkapets, setStatus } = props;

  if (polkapets.length === 0) {
    return (
      <Message info>
        <Message.Header>
          No Polkapet found here... Create one now!&nbsp;
        </Message.Header>
      </Message>
    );
  }

  return (
    <Grid columns={3}>
      {polkapets.map((polkapet, i) => (
        <Grid.Column key={`polkapet-${i}`}>
          <PetCard polkapet={polkapet} setStatus={setStatus} key={i} />
        </Grid.Column>
      ))}
    </Grid>
  );
};

export default PolkapetCards;
