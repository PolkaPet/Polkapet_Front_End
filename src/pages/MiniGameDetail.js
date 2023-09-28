/* eslint-disable no-unused-vars */
import React, { createRef, useEffect, useMemo, useState } from 'react';
import '../styles/Home.css';

import { useSubstrateState } from '../substrate-lib';
import {
  Dimmer,
  Loader,
  Grid,
  Message,
  Image,
  List,
  Feed,
  Modal,
  Button,
  Form,
  Dropdown,
  Select,
} from 'semantic-ui-react';

import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import {
  convertBNtoNumber,
  getGameDetailById,
  getPlayersByGameId,
  getPolkapetsOwnedByAddress,
} from '../utils';
import PolkapetAvatar from '../polkapet/PolkapetAvatar';
import { hexToU8a } from '@polkadot/util';
import { TxButton } from '../substrate-lib/components';
import RacingChart from '../components/RacingChart';

const MiniGameDetail = () => {
  const { api, apiState, apiError, keyringState, currentAccount } =
    useSubstrateState();

  const { gameId } = useParams();

  const [gameData, setGameData] = useState(null);
  const [playersData, setPlayersData] = useState(null);

  useEffect(() => {
    const fetchGameData = async api => {
      if (!api) return;

      const data = await getGameDetailById(api, gameId);
      setGameData(data);

      const playerData = await getPlayersByGameId(api, gameId);
      setPlayersData(playerData);
    };
    api && fetchGameData(api);
  }, [gameId, api]);

  const isOwner = useMemo(
    () => currentAccount?.address === gameData?.owner,
    [currentAccount?.address, gameData?.owner]
  );

  const loader = text => (
    <Dimmer active>
      <Loader size="small">{text}</Loader>
    </Dimmer>
  );

  const message = errObj => (
    <Grid centered columns={2} padded>
      <Grid.Column>
        <Message
          negative
          compact
          floating
          header="Error Connecting to Substrate"
          content={`Connection to websocket '${errObj.target.url}' failed.`}
        />
      </Grid.Column>
    </Grid>
  );

  if (apiState === 'ERROR') return message(apiError);
  else if (apiState !== 'READY') return loader('Connecting to Substrate');

  if (keyringState !== 'READY') {
    return loader(
      "Loading accounts (please review any extension's authorization)"
    );
  }

  const contextRef = createRef();

  return (
    <div id="home" ref={contextRef}>
      <Header />

      <div style={{ color: '#fff', marginTop: '90px', textAlign: 'left' }}>
        <h1> Game info</h1>
        <div>
          <p>gameId: {gameData?.gameId}</p>
          <p>owner: {gameData?.owner}</p>
          <p>description: {gameData?.description}</p>
          <p>reward: {convertBNtoNumber(gameData?.reward)}</p>
          <p>maxPlayer: {gameData?.maxPlayer}</p>
          <p>blockDuration: {gameData?.blockDuration}</p>
          <p>finishBlock: {gameData?.finishBlock}</p>
          <p>status: {gameData?.status}</p>
        </div>
        <Grid columns={2} stackable>
          <Grid.Column>
            <RacingChart gameId={gameId} />
          </Grid.Column>
          <Grid.Column>
            <ListOfPlayer players={playersData} />
          </Grid.Column>
        </Grid>

        <div style={{ marginTop: '90px' }}>
          {isOwner ? (
            <StartGameButton gameId={gameId} />
          ) : (
            <JoinGameButton gameId={gameId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MiniGameDetail;

const ListOfPlayer = ({ players }) => {
  return players?.length === 0 ? (
    <h3>No players yet</h3>
  ) : (
    <>
      <h1>List Of Player</h1>
      <Feed
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
        }}
      >
        {players?.map(event => (
          <Feed.Event key={event.dna}>
            <PolkapetAvatar
              dna={hexToU8a(event?.dna)}
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
                justifyContent: 'start',
                alignItems: 'start',
              }}
            >
              <div>Pet Id: {event?.petId || event?.petNumber}</div>
              <div>Gender: {event?.gender}</div>
              <div>Oval position: {event?.ovalPosition} </div>
            </div>
          </Feed.Event>
        ))}
      </Feed>
    </>
  );
};

const StartGameButton = ({ gameId }) => {
  const [status, setStatus] = useState('');

  return (
    <>
      <div style={{ overflowWrap: 'break-word', color: 'white' }}>{status}</div>

      <TxButton
        label="Start Game"
        type="SIGNED-TX"
        setStatus={setStatus}
        attrs={{
          palletRpc: 'polkapetModule',
          callable: 'startMinigame',
          inputParams: [gameId],
          paramFields: [true],
        }}
      />
    </>
  );
};

function JoinGameButton({ gameId }) {
  const { api, currentAccount } = useSubstrateState();
  const [status, setStatus] = useState('');

  const [dnaList, setDnaList] = useState(null);

  useEffect(() => {
    const fetchGameData = async api => {
      if (!api) return;

      let data = await getPolkapetsOwnedByAddress(api, currentAccount?.address);

      data = data.map(item => ({ key: item, value: item, text: item }));

      setDnaList(data);
    };
    api && fetchGameData(api);
  }, [gameId, api, currentAccount?.address]);

  return (
    <>
      <Modal
        trigger={
          <Button basic color="blue">
            Join game
          </Button>
        }
      >
        <Modal.Header>Select Pet to Join</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field
              control={Select}
              label="Pet List"
              options={dnaList}
              placeholder="Gender"
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <div style={{ overflowWrap: 'break-word', color: '#000' }}>
            {status}
          </div>
          <TxButton
            label="Join"
            type="SIGNED-TX"
            setStatus={setStatus}
            attrs={{
              palletRpc: 'polkapetModule',
              callable: 'joinMinigame',
              inputParams: [gameId, 2],
              paramFields: [true, true],
            }}
          />
        </Modal.Actions>
      </Modal>
    </>
  );
}
