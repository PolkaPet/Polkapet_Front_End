/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import { Checkbox, Container, Grid } from 'semantic-ui-react';

import { useSubstrateState } from '../substrate-lib';
import MiniGameCards from './MiniGameCards';

const parseMiniGame = ({
  gameId,
  owner,
  description,
  reward,
  maxPlayer,
  blockDuration,
  finishBlock,
  status,
}) => ({
  gameId: gameId.toJSON(),
  owner: owner.toJSON(),
  description: description.toHuman(),
  reward: reward.toHuman(),
  maxPlayer: maxPlayer.toJSON(),
  blockDuration: blockDuration.toJSON(),
  finishBlock: finishBlock.toJSON(),
  status: status.toJSON(),
});

export default function MiniGames(props) {
  const { api, keyring, currentAccount } = useSubstrateState();
  const [miniGames, setminiGames] = useState([]);
  const [status, setStatus] = useState('');
  const [checked, setChecked] = useState(false);

  const subscribeCount = () => {
    let unsub = null;

    const asyncFetch = async () => {
      unsub = await api.query.polkapetModule.lastMinigameId(async count => {
        // Fetch all kitty keys
        const entries = await api.query.polkapetModule.minigameById.entries();
        const miniGamesMap = entries.map(entry => {
          return {
            id: entry[0],
            ...parseMiniGame(entry[1].unwrap()),
          };
        });
        setminiGames(miniGamesMap);
      });
    };

    asyncFetch();

    return () => {
      unsub && unsub();
    };
  };

  useEffect(subscribeCount, [api, keyring]);


  const myGames = useMemo(
    () =>
      miniGames.filter(item => {
        if (checked === true) {
          return currentAccount?.address === item?.owner;
        } else {
          return item;
        }
      }),
    [checked, currentAccount?.address, miniGames]
  );

  return (
    <Container>
      <Grid.Column width={16}>
        <h1 style={{ color: 'white', margin: '30px auto' }}>MiniGame</h1>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            color: '#fff',
            justifyContent: 'end',
            margin: '20px auto',
          }}
        >
          <div
            style={{
              marginRight: '10px',
            }}
          >
            Filter my Game
          </div>
          <Checkbox
            checked={checked}
            onClick={() => {
              setChecked(!checked);
            }}
          />
        </div>

        <MiniGameCards miniGames={myGames} setStatus={setStatus} />
        <div style={{ overflowWrap: 'break-word', color: 'white' }}>
          {status}
        </div>
      </Grid.Column>
    </Container>
  );
}
