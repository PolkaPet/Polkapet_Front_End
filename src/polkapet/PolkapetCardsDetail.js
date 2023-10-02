/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Card, Modal, Form, Label, Loader } from 'semantic-ui-react';

import PolkapetAvatar from './PolkapetAvatar';
import { useSubstrateState } from '../substrate-lib';
import { TxButton } from '../substrate-lib/components';

import Header from '../components/Header';
import { BN, BN_MILLION, hexToU8a } from '@polkadot/util';
import { convertBNtoNumber, getPolkapetsById, shortenAddress } from '../utils';
import { useParams } from 'react-router-dom';
import useInterval from 'use-interval';
import LoaderStatus from '../components/LoaderStatus';
// --- Transfer Modal ---

const TransferModal = props => {
  const { polkapet, setStatus } = props;
  const [open, setOpen] = React.useState(false);
  const [formValue, setFormValue] = React.useState({});

  const formChange = key => (ev, el) => {
    setFormValue({ ...formValue, [key]: el.value });
  };

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
        <Button basic color="blue">
          Transfer
        </Button>
      }
    >
      <Modal.Header>Polkapet Transfer</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input fluid label="Pet ID" readOnly value={polkapet?.petId} />
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
          disabled
          label="Transfer"
          type="SIGNED-TX"
          setStatus={setStatus}
          onClick={confirmAndClose}
          attrs={{
            palletRpc: 'polkapetModule',
            callable: 'transfer',
            inputParams: [formValue.target, polkapet?.petId],
            paramFields: [true, true],
          }}
        />
      </Modal.Actions>
    </Modal>
  );
};

// --- Set Price ---

const SetPrice = props => {
  const { polkapet, setStatus, status } = props;
  const [open, setOpen] = React.useState(false);
  const [formValue, setFormValue] = useState(0);

  const confirmAndClose = unsub => {
    setOpen(false);
    if (unsub && typeof unsub === 'function') unsub();
  };

  const formValueBN = useMemo(
    () => new BN(formValue * BN_MILLION).mul(BN_MILLION).toString(),
    [formValue]
  );

  return (
    <Modal
      size="mini"
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
          <Form.Input fluid label="Pet ID" readOnly value={polkapet?.petId} />
          <Form.Input
            fluid
            label="Price ($LCW)"
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
            inputParams: [polkapet?.petId, formValueBN],
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

  const formValueBN = useMemo(
    () =>
      new BN(convertBNtoNumber(polkapet?.price) * BN_MILLION)
        .mul(BN_MILLION)
        .toString(),
    [polkapet?.price]
  );

  if (!polkapet?.price) {
    return <></>;
  }
  return (
    <Modal
      size="mini"
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
          <Form.Input fluid label="Pet ID" readOnly value={polkapet?.petId} />
          <Form.Input
            fluid
            label="Price ($LCW)"
            readOnly
            value={convertBNtoNumber(polkapet?.price)}
          />
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
            inputParams: [polkapet?.petId, formValueBN],
            paramFields: [true, true],
          }}
        />
      </Modal.Actions>
    </Modal>
  );
};

const RemovePrice = props => {
  const { pet, setStatus } = props;
  const [, setOpen] = React.useState(false);

  const confirmAndClose = unsub => {
    setOpen(false);
    if (unsub && typeof unsub === 'function') unsub();
  };

  if (!pet.price) {
    return <></>;
  }

  return (
    // <Modal
    //   onClose={() => setOpen(false)}
    //   onOpen={() => setOpen(true)}
    //   open={open}
    //   trigger={
    //     <Button basic color="green">
    //       Remove Price
    //     </Button>
    //   }
    // >
    //   <Modal.Header>Remove Price</Modal.Header>
    //   <Modal.Content>
    //     <Form>
    //       <Form.Input fluid label="Pet ID" readOnly value={pet.id} />
    //     </Form>
    //   </Modal.Content>
    //   <Modal.Actions>
    //     <Button basic color="grey" onClick={() => setOpen(false)}>
    //       Cancel
    //     </Button>
    <TxButton
      label="Remove Price"
      type="SIGNED-TX"
      setStatus={setStatus}
      onClick={confirmAndClose}
      attrs={{
        palletRpc: 'polkapetModule',
        callable: 'removePrice',
        inputParams: [pet.petId],
        paramFields: [true],
      }}
    />
    //   </Modal.Actions>
    // </Modal>
  );
};

const EmpowerPet = props => {
  const { polkapet, setStatus, status } = props;
  const [, setOpen] = React.useState(false);

  const confirmAndClose = unsub => {
    setOpen(false);
    if (unsub && typeof unsub === 'function') unsub();
  };

  return (
    // <Modal
    //   onClose={() => setOpen(false)}
    //   onOpen={() => setOpen(true)}
    //   open={open}
    //   trigger={
    //     <Button basic color="green">
    //       Empower
    //     </Button>
    //   }
    // >
    //   <Modal.Header>Empower</Modal.Header>
    //   <Modal.Content>
    //     <Form>
    //       <Form.Input fluid label="Pet ID" readOnly value={polkapet?.petId} />
    //     </Form>
    //   </Modal.Content>
    //   <Modal.Actions>
    //     <Button basic color="grey" onClick={() => setOpen(false)}>
    //       Cancel
    //     </Button>
    <TxButton
      label="Empower Pet"
      type="SIGNED-TX"
      setStatus={setStatus}
      onClick={confirmAndClose}
      attrs={{
        palletRpc: 'polkapetModule',
        callable: 'empower',
        inputParams: [polkapet?.petId],
        paramFields: [true],
      }}
    />
    //   </Modal.Actions>
    // </Modal>
  );
};
const RespawnPet = props => {
  const { polkapet, setStatus, status } = props;
  const [, setOpen] = React.useState(false);

  const confirmAndClose = unsub => {
    setOpen(false);
    if (unsub && typeof unsub === 'function') unsub();
  };

  return (
    <TxButton
      label="Respawn Pet"
      type="SIGNED-TX"
      setStatus={setStatus}
      onClick={confirmAndClose}
      attrs={{
        palletRpc: 'polkapetModule',
        callable: 'respawn',
        inputParams: [polkapet?.petId],
        paramFields: [true],
      }}
    />
  );
};
// --- About Pet Card ---

const PolkapetCardsDetail = () => {
  const { petId } = useParams();

  const [polkapet, setPolkapet] = useState(null);

  const {
    api,
    // apiState, apiError, keyringState
  } = useSubstrateState();

  const fetchPetData = useCallback(async () => {
    if (!api) return;

    const data = await getPolkapetsById(api, petId);

    setPolkapet(data);
  }, [api, petId]);

  useEffect(() => {
    api && fetchPetData();
    // eslint-disable-next-line no-sparse-arrays
  }, [, api, fetchPetData]);

  useInterval(() => fetchPetData(), 1000);

  const [status, setStatus] = useState('');

  const { currentAccount } = useSubstrateState();
  const isSelf = currentAccount?.address === polkapet?.owner;

  return (
    <div>
      <Header />
      <div id="nft-detail-card-wrapper">
        <div>
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
            <div>
              <PolkapetAvatar
                dna={hexToU8a(polkapet?.dna)}
                deadStatus={polkapet?.death}
              />
            </div>

            <Card.Content>
              <Card.Description>
                <p style={{ overflowWrap: 'break-word', fontSize: '18px' }}>
                  Pet Id: <strong>{polkapet?.petId}</strong>
                </p>
                <p style={{ overflowWrap: 'break-word', fontSize: '18px' }}>
                  Gender: <strong>{polkapet?.gender}</strong>
                </p>
                <p style={{ overflowWrap: 'break-word', fontSize: '18px' }}>
                  Owner: <strong>{shortenAddress(polkapet?.owner)}</strong>
                </p>
                <p style={{ overflowWrap: 'break-word', fontSize: '18px' }}>
                  DNA: <strong>{polkapet?.dna}</strong>
                </p>
                <p style={{ overflowWrap: 'break-word', fontSize: '18px' }}>
                  Death: <strong>{polkapet?.death?.toString()}</strong>
                </p>
                <p style={{ overflowWrap: 'break-word', fontSize: '18px' }}>
                  Respawn: <strong>{polkapet?.respawn}</strong>
                </p>
                <p style={{ overflowWrap: 'break-word', fontSize: '18px' }}>
                  Power: <strong>{polkapet?.power}</strong>
                </p>
                <p style={{ overflowWrap: 'break-word', fontSize: '18px' }}>
                  Oval Position: <strong>{polkapet?.ovalPosition}</strong>
                </p>
              </Card.Description>
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
                {polkapet?.price ? (
                  convertBNtoNumber(polkapet?.price) + ' $LCW'
                ) : (
                  <strong>Not For Sale</strong>
                )}
              </p>

              <LoaderStatus status={status} />

              {polkapet?.owner === currentAccount?.address ? (
                <>
                  {!polkapet?.price ? (
                    <SetPrice
                      polkapet={polkapet}
                      setStatus={setStatus}
                      status={status}
                    />
                  ) : (
                    <RemovePrice
                      pet={polkapet}
                      setStatus={setStatus}
                      status={status}
                    />
                  )}
                  <EmpowerPet
                    polkapet={polkapet}
                    setStatus={setStatus}
                    status={status}
                  />
                  {polkapet?.price ? null : (
                    <>
                      <RespawnPet
                        polkapet={polkapet}
                        setStatus={setStatus}
                        status={status}
                      />
                      <TransferModal
                        polkapet={polkapet}
                        setStatus={setStatus}
                        status={status}
                      />
                    </>
                  )}
                </>
              ) : (
                <BuyPolkapet polkapet={polkapet} setStatus={setStatus} />
              )}
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PolkapetCardsDetail;
