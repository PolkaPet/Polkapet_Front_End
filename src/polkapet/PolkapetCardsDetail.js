import React, { useMemo, useState } from 'react';
import { Button, Card, Modal, Form, Label } from 'semantic-ui-react';

import PolkapetAvatar from './PolkapetAvatar';
import { useSubstrateState } from '../substrate-lib';
import { TxButton } from '../substrate-lib/components';
import { useLocation } from 'react-router';
import Header from '../components/Header';
import { BN, BN_BILLION } from '@polkadot/util';
import { convertBNtoNumber } from '../utils';

// --- Transfer Modal ---

const TransferModal = props => {
  const { polkapet, setStatus } = props;
  const [open, setOpen] = React.useState(false);
  const [formValue, setFormValue] = React.useState({});

  const formChange = key => (ev, el) => {
    setFormValue({ ...formValue, [key]: el.value });
  };

  const confirmAndClose = unsub => {
    console.log(formValue.target);
    setOpen(false);
    if (unsub && typeof unsub === 'function') unsub();
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button basic color="blue">
          Transfer
        </Button>
      }
    >
      <Modal.Header>Polkapet Transfer</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input fluid label="Pet ID" readOnly value={polkapet.id} />
          <Form.Input
            fluid
            label="Receiver"
            placeholder="Receiver Address"
            onChange={formChange('target')}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="grey" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <TxButton
          label="Transfer"
          type="SIGNED-TX"
          setStatus={setStatus}
          onClick={confirmAndClose}
          attrs={{
            palletRpc: 'polkapetModule',
            callable: 'transfer',
            inputParams: [formValue.target, polkapet.id],
            paramFields: [true, true],
          }}
        />
      </Modal.Actions>
    </Modal>
  );
};

// --- Set Price ---

const SetPrice = props => {
  const { polkapet, setStatus } = props;
  const [open, setOpen] = React.useState(false);
  const [formValue, setFormValue] = useState(0);

  const confirmAndClose = unsub => {
    setOpen(false);
    if (unsub && typeof unsub === 'function') unsub();
  };

  const formValueBN = useMemo(
    () => new BN(formValue * BN_BILLION).mul(BN_BILLION).toString(),
    [formValue]
  );

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button basic color="blue">
          Set Price
        </Button>
      }
    >
      <Modal.Header>Set Pet Price</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input fluid label="Pet ID" readOnly value={polkapet.petId} />
          <Form.Input
            fluid
            label="Price"
            placeholder="Enter Price"
            type="number"
            onChange={(_, { value }) => setFormValue(value)}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="grey" onClick={() => setOpen(false)}>
          Cancel
        </Button>

        <TxButton
          label="Set Price"
          type="SIGNED-TX"
          setStatus={setStatus}
          onClick={confirmAndClose}
          attrs={{
            palletRpc: 'polkapetModule',
            callable: 'setPrice',
            inputParams: [polkapet.petId, formValueBN],
            paramFields: [true, true],
          }}
        />
      </Modal.Actions>
    </Modal>
  );
};

// --- Buy Pet ---

const BuyPolkapet = props => {
  const { polkapet, setStatus } = props;
  const [open, setOpen] = React.useState(false);

  const confirmAndClose = unsub => {
    setOpen(false);
    if (unsub && typeof unsub === 'function') unsub();
  };

  if (!polkapet.price) {
    return <></>;
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button basic color="green">
          Buy Pet
        </Button>
      }
    >
      <Modal.Header>Buy Pet</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input fluid label="Pet ID" readOnly value={polkapet.id} />
          <Form.Input fluid label="Price" readOnly value={polkapet.price} />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="grey" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <TxButton
          label="Buy Pet"
          type="SIGNED-TX"
          setStatus={setStatus}
          onClick={confirmAndClose}
          attrs={{
            palletRpc: 'polkapetModule',
            callable: 'buyPolkapet',
            inputParams: [polkapet.id, polkapet.price],
            paramFields: [true, true],
          }}
        />
      </Modal.Actions>
    </Modal>
  );
};

// const RemovePrice = props => {
//   const { pet, setStatus } = props
//   const [open, setOpen] = React.useState(false)

//   const confirmAndClose = unsub => {
//     setOpen(false)
//     if (unsub && typeof unsub === 'function') unsub()
//   }

//   if (!pet.price) {
//     return <></>
//   }

//   return (
//     <Modal
//       onClose={() => setOpen(false)}
//       onOpen={() => setOpen(true)}
//       open={open}
//       trigger={
//         <Button basic color="green">
//           Remove Price
//         </Button>
//       }
//     >
//       <Modal.Header>Remove Price</Modal.Header>
//       <Modal.Content>
//         <Form>
//           <Form.Input fluid label="Pet ID" readOnly value={pet.id} />
//         </Form>
//       </Modal.Content>
//       <Modal.Actions>
//         <Button basic color="grey" onClick={() => setOpen(false)}>
//           Cancel
//         </Button>
//         <TxButton
//           label="Remove Price"
//           type="SIGNED-TX"
//           setStatus={setStatus}
//           onClick={confirmAndClose}
//           attrs={{
//             palletRpc: 'polkapetModule',
//             callable: 'removePrice',
//             inputParams: [pet.id],
//             paramFields: [true],
//           }}
//         />
//       </Modal.Actions>
//     </Modal>
//   )
// }
const EmpowerPet = props => {
  const { polkapet, setStatus } = props;
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
          Empower
        </Button>
      }
    >
      <Modal.Header>Empower</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input fluid label="Pet ID" readOnly value={polkapet.id} />
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
            inputParams: [polkapet.id],
            paramFields: [true],
          }}
        />
      </Modal.Actions>
    </Modal>
  );
};
// --- About Pet Card ---

const PolkapetCardsDetail = () => {
  const location = useLocation();

  const { polkapet } = location.state || {};
  const [status, setStatus] = useState('');

  const { currentAccount } = useSubstrateState();
  const isSelf = currentAccount.address === polkapet.owner;

  return (
    <div>
      <Header />
      <div id="nft-detail-card-wrapper">
        <div>
          <div style={{ overflowWrap: 'break-word', color: 'white' }}>
            {status}
          </div>

          <Card
            style={{
              width: '500px',
              height: '650px',
              top: '100px',
              left: '35%',
            }}
          >
            {isSelf && (
              <Label as="a" floating color="teal">
                Mine
              </Label>
            )}
            <div style={{ marginLeft: '50px' }}>
              <PolkapetAvatar dna={polkapet.dna} deadStatus={polkapet.death} />
            </div>

            <Card.Content>
              <Card.Description>
                <p style={{ overflowWrap: 'break-word', fontSize: '18px' }}>
                  Pet Id: {polkapet.id}
                </p>
                <p style={{ overflowWrap: 'break-word', fontSize: '18px' }}>
                  Gender: {polkapet.gender}
                </p>
                <p style={{ overflowWrap: 'break-word', fontSize: '18px' }}>
                  {'Death:    ' +
                    polkapet.death +
                    ' - ' +
                    'Respawn:    ' +
                    polkapet.respawn}
                </p>
                <p style={{ overflowWrap: 'break-word', fontSize: '18px' }}>
                  {'Oval Position:   ' +
                    polkapet.ovalPosition +
                    ' - ' +
                    'Power: ' +
                    polkapet.power}
                </p>
              </Card.Description>
              <div style={{ fontSize: '18px', marginTop: '15px' }}>
                Description:
              </div>

              <div style={{ fontSize: '16px', marginTop: '15px' }}>
                "Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised
                in the 1960s with the release of Letraset sheets containing
                Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of Lorem
                Ipsum.",
              </div>
            </Card.Content>
            <Card.Content extra style={{ textAlign: 'center' }}>
              <p
                style={{
                  overflowWrap: 'break-word',
                  fontSize: '18px',
                  color: 'black',
                }}
              >
                Price:{' '}
                {polkapet.price
                  ? convertBNtoNumber(polkapet.price) + ' LCW'
                  : 'Not For Sale'}
              </p>
              {polkapet.owner === currentAccount.address ? (
                <>
                  <SetPrice polkapet={polkapet} setStatus={setStatus} />
                  <EmpowerPet polkapet={polkapet} setStatus={setStatus} />
                  {/* <RemovePrice pet={pet} setStatus={setStatus} /> */}
                  <TransferModal polkapet={polkapet} setStatus={setStatus} />
                </>
              ) : (
                <>
                  <BuyPolkapet polkapet={polkapet} setStatus={setStatus} />
                </>
              )}
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PolkapetCardsDetail;
