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

// --- Transfer Modal ---

// const TransferModal = props => {
//   const { polkapet, setStatus } = props
//   const [open, setOpen] = React.useState(false)
//   const [formValue, setFormValue] = React.useState({})

//   const formChange = key => (ev, el) => {
//     setFormValue({ ...formValue, [key]: el.value })
//   }

//   const confirmAndClose = unsub => {
//     console.log(formValue.target)
//     setOpen(false)
//     if (unsub && typeof unsub === 'function') unsub()
//   }

//   return (
//     <Modal
//       onClose={() => setOpen(false)}
//       onOpen={() => setOpen(true)}
//       open={open}
//       trigger={
//         <Button basic color="blue">
//           Transfer
//         </Button>
//       }
//     >
//       <Modal.Header>Polkapet Transfer</Modal.Header>
//       <Modal.Content>
//         <Form>
//           <Form.Input fluid label="Pet ID" readOnly value={polkapet.id} />
//           <Form.Input
//             fluid
//             label="Receiver"
//             placeholder="Receiver Address"
//             onChange={formChange('target')}
//           />
//         </Form>
//       </Modal.Content>
//       <Modal.Actions>
//         <Button basic color="grey" onClick={() => setOpen(false)}>
//           Cancel
//         </Button>
//         <TxButton
//           label="Transfer"
//           type="SIGNED-TX"
//           setStatus={setStatus}
//           onClick={confirmAndClose}
//           attrs={{
//             palletRpc: 'polkapetModule',
//             callable: 'transfer',
//             inputParams: [formValue.target, polkapet.id],
//             paramFields: [true, true],
//           }}
//         />
//       </Modal.Actions>
//     </Modal>
//   )
// }

// eslint-disable-next-line no-unused-vars
const EmpowerPet = props => {
  const { miniGame, setStatus } = props;
  const [open, setOpen] = React.useState(false);

  const confirmAndClose = unsub => {
    setOpen(false);
    if (unsub && typeof unsub === 'function') unsub();
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button basic color="green">
          Join Game
        </Button>
      }
    >
      <Modal.Header>Empower</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input fluid label="Pet ID" readOnly value={miniGame.id} />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="grey" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <TxButton
          label="Empower Pet"
          type="SIGNED-TX"
          setStatus={setStatus}
          onClick={confirmAndClose}
          attrs={{
            palletRpc: 'polkapetModule',
            callable: 'empower',
            inputParams: [miniGame.id],
            paramFields: [true],
          }}
        />
      </Modal.Actions>
    </Modal>
  );
};
// --- About Pet Card ---

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
  return (
    <Card style={{ width: '350px', height: '500px' }}>
      {isSelf && (
        <Label as="a" floating color="teal">
          Mine
        </Label>
      )}
      <img alt="subwalelet" src={subwalelet} width="100%" height="200" />
      <Card.Content>
        <Card.Meta style={{ fontSize: '.9em', overflowWrap: 'break-word' }}>
          gameId: {gameId}
        </Card.Meta>
        <Card.Description>
          <p style={{ overflowWrap: 'break-word' }}>gameId: {gameId}</p>
          <p style={{ overflowWrap: 'break-word' }}>status: {status}</p>
          <p style={{ overflowWrap: 'break-word' }}>
            description: {description}
          </p>
          <p style={{ overflowWrap: 'break-word' }}>reward: {reward}</p>
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
