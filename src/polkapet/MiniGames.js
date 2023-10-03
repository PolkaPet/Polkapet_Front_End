import React, { useEffect, useMemo, useState } from 'react';
import { Checkbox, Container, Grid } from 'semantic-ui-react';

import { useSubstrateState } from '../substrate-lib';
import MiniGameCards from './MiniGameCards';
import LoaderStatus from '../components/LoaderStatus';

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

  const [gameStatus, setGameStatus] = useState('All');

  const myGames = useMemo(
    () =>
      miniGames
        .filter(item => {
          if (checked === true) {
            return currentAccount?.address === item?.owner;
          }

          return item;
        })
        .filter(item => {
          if (gameStatus === 'All') {
            return item;
          } else {
            return item?.status === gameStatus;
          }
        }),
    [checked, currentAccount?.address, gameStatus, miniGames]
  );

  return (
    <Container>
      <Grid.Column width={16}>
        <h1 style={{ color: 'white', margin: '30px auto' }}>Mini Game</h1>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            color: '#fff',
            justifyContent: 'end',
            margin: '20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              color: '#fff',
              justifyContent: 'end',
              margin: '20px',
            }}
          >
            <div
              style={{
                marginRight: '10px',
              }}
            >
              All Status
            </div>
            <Checkbox
              checked={gameStatus === 'All'}
              onClick={() => setGameStatus('All')}
            />
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              color: '#fff',
              justifyContent: 'end',
              margin: '20px',
            }}
          >
            <div
              style={{
                marginRight: '10px',
              }}
            >
              Prepare Games
            </div>
            <Checkbox
              checked={gameStatus === 'Prepare'}
              onClick={() => setGameStatus('Prepare')}
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              color: '#fff',
              justifyContent: 'end',
              margin: '20px',
            }}
          >
            <div
              style={{
                marginRight: '10px',
              }}
            >
              OnGoing Game
            </div>
            <Checkbox
              checked={gameStatus === 'OnGoing'}
              onClick={() => setGameStatus('OnGoing')}
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              color: '#fff',
              justifyContent: 'end',
              margin: '20px',
            }}
          >
            <div
              style={{
                marginRight: '10px',
              }}
            >
              Finish Games
            </div>
            <Checkbox
              checked={gameStatus === 'Finish'}
              onClick={() => setGameStatus('Finish')}
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              color: '#fff',
              justifyContent: 'end',
              margin: '20px',
            }}
          >
            <div
              style={{
                marginRight: '10px',
              }}
            >
              My Games
            </div>
            <Checkbox
              checked={checked}
              onClick={() => {
                setChecked(!checked);
              }}
            />
          </div>
        </div>

        <MiniGameCards miniGames={myGames} setStatus={setStatus} />

        <LoaderStatus status={status} color="white" />
      </Grid.Column>
    </Container>
  );
}
