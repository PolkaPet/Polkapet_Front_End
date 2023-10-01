/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Button,
  Card,
  Grid,
  Message,
  Label,
  Modal,
  Form,
} from 'semantic-ui-react';

//import MinigameAvatar from './MinigameAvatar'
import { useSubstrateState } from '../substrate-lib';
import { TxButton } from '../substrate-lib/components';
import { useNavigate } from 'react-router-dom';
import subwalelet from '../../public/assets/logoPartner/partner_1.jpeg';
import { convertBNtoNumber } from '../utils';

const MiniGameCard = props => {
  const { miniGame } = props;
  const { gameId, owner, status, description, reward } = miniGame;
  //  const {gameId, owner, description, reward, maxPlayer, blockDuration,finishBlock, status} = miniGame
  const { currentAccount } = useSubstrateState();
  const isSelf = currentAccount.address === owner;
  let navigate = useNavigate();

  function handleClick(gameId) {
    navigate(`/minigame/${gameId}`);
  }
  const imgUrl = `${process.env.PUBLIC_URL}/assets/logoPartner/partner_${
    gameId % 5 + 1
  }.jpeg`;
  return (
    <Card style={{ width: '300px', height: '450px' }}>
      {isSelf && (
        <Label as="a" floating color="teal">
          Mine
        </Label>
      )}
      <img alt="subwalelet" src={imgUrl} width="100%" height="200" />
      <Card.Content>
        <Card.Meta style={{ fontSize: '.9em', overflowWrap: 'break-word' }}>
          <h3>Game Id: {gameId}</h3>
        </Card.Meta>
        <Card.Description>
          <p style={{ overflowWrap: 'break-word' }}>Status: {status}</p>
          <p style={{ overflowWrap: 'break-word' }}>
            Description: {description}
          </p>
          <p style={{ overflowWrap: 'break-word' }}>
            Reward: {convertBNtoNumber(reward)} $LCW
          </p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra style={{ textAlign: 'center' }}>
        <Button basic color="green" onClick={() => handleClick(gameId)}>
          View Game
        </Button>{' '}
      </Card.Content>
    </Card>
  );
};

const MiniGameCards = props => {
  const { miniGames, setStatus } = props;

  if (miniGames.length === 0) {
    return (
      <Message info>
        <Message.Header>
          No Minigame found here... Create one now!&nbsp;
        </Message.Header>
      </Message>
    );
  }

  return (
    <Grid columns={3}>
      {miniGames.map((miniGame, i) => (
        <Grid.Column key={`minigame-${i}`}>
          <MiniGameCard miniGame={miniGame} setStatus={setStatus} />
        </Grid.Column>
      ))}
    </Grid>
  );
};

export default MiniGameCards;
