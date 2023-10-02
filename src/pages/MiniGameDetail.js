import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import '../styles/Home.css';
import useInterval from 'use-interval';

import { useSubstrateState } from '../substrate-lib';
import {
  Dimmer,
  Loader,
  Grid,
  Message,
  Feed,
  Modal,
  Button,
  Form,
  Select,
  Container,
  Image,
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
import LoaderStatus from '../components/LoaderStatus';

const MiniGameDetail = () => {
  const { api, apiState, apiError, keyringState, currentAccount } =
    useSubstrateState();

  const { gameId } = useParams();

  const [gameData, setGameData] = useState(null);
  const [playersData, setPlayersData] = useState(null);
  const [blockCountdown, setBlockCountdown] = useState(0);

  const fetchGameData = useCallback(async () => {
    if (!api) return;

    // returns Hash

    const data = await getGameDetailById(api, gameId);
    setGameData(data);

    const playerData = await getPlayersByGameId(api, gameId);
    setPlayersData(playerData);

    api.query?.system?.number(blockNo => {
      const countdown =
        gameData?.finishBlock?.replaceAll(',', '') - blockNo?.toString();

      if (countdown >= 0) {
        setBlockCountdown(countdown);
      }
    });
  }, [api, gameData?.finishBlock, gameId]);

  useEffect(() => {
    api && fetchGameData();
  }, [gameId, api, fetchGameData, gameData?.finishBlock]);

  useInterval(() => fetchGameData(), 1000);

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
      <Container>
        <div style={{ color: '#fff', marginTop: '90px', textAlign: 'center' }}>
          <Grid columns={2} stackable>
            <Grid.Column>
              <h1> Game info</h1>
              <div style={{ marginTop: '10px', textAlign: 'left' }}>
                <p>Game Id: {gameData?.gameId}</p>
                <p>Owner: {gameData?.owner}</p>
                <p>Description: {gameData?.description}</p>
                <p>Reward: {convertBNtoNumber(gameData?.reward)} $LCW</p>
                <p>Max Player: {gameData?.maxPlayer}</p>
                <p>Block Duration: {gameData?.blockDuration} block(s)</p>
                <p>Finish at block No: {gameData?.finishBlock}</p>
                <p>Game Status: {gameData?.status}</p>
                <p>
                  Block Countdown: {blockCountdown < 0 ? 0 : blockCountdown}{' '}
                  block
                  {blockCountdown > 1 ? 's' : null}
                </p>
              </div>
            </Grid.Column>
            <Grid.Column>
              <h1> Sponsors</h1>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Image
                  size="large"
                  src="https://react.semantic-ui.com/images/wireframe/image.png"
                />
              </div>
            </Grid.Column>
          </Grid>

          {gameData?.status === 'Finish' ? (
            <h1>Game ended</h1>
          ) : gameData?.status === 'OnGoing' ? (
            <h1>Game On Going...</h1>
          ) : (
            <div style={{ margin: '30px auto' }}>
              {isOwner ? (
                <StartGameButton gameId={gameId} />
              ) : (
                <JoinGameButton gameId={gameId} />
              )}
            </div>
          )}

          <Grid columns={2} stackable>
            <Grid.Column>
              <RacingChart gameId={gameId} players={playersData} />
            </Grid.Column>
            <Grid.Column>
              <ListOfPlayer players={playersData} />
            </Grid.Column>
          </Grid>
        </div>
      </Container>
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
              <div>Pet Id: {event?.petId}</div>
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
      <LoaderStatus status={status}/>

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
  const [petId, setPetId] = useState('');
  const [dnaList, setDnaList] = useState(null);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const fetchGameData = async () => {
      if (!api) return;

      let data = await getPolkapetsOwnedByAddress(api, currentAccount?.address);

      data = data.map(item => ({ key: item, value: item, text: item }));

      setDnaList(data);
    };
    api && fetchGameData();
  }, [gameId, api, currentAccount?.address]);

  useEffect(() => {
    if (status === 'Tx Finalized') {
      setOpen(false);
    }
  }, [status]);

  return (
    <>
      <Modal
        size="mini"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
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
              placeholder="your pet id"
              onChange={(_, { value }) => setPetId(value)}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <LoaderStatus status={status} color="#000" />
          <TxButton
            label="Join"
            type="SIGNED-TX"
            setStatus={setStatus}
            attrs={{
              palletRpc: 'polkapetModule',
              callable: 'joinMinigame',
              inputParams: [gameId, petId],
              paramFields: [true, true],
            }}
          />
        </Modal.Actions>
      </Modal>
    </>
  );
}
