import React, { useEffect, useMemo, useState } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';

import { TxButton } from '../substrate-lib/components';
import { BN, BN_MILLION } from '@polkadot/util';
import LoaderStatus from '../components/LoaderStatus';

export default function CreateMinigame(props) {
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState(0);
  const [reward, setReward] = useState(0);
  const [maxPlayer, setMaxPlayer] = useState(0);
  const [blockDuration, setBlockDuration] = useState(0);
  const [open, setOpen] = React.useState(false);

  const rewardBN = useMemo(
    () => new BN(reward * BN_MILLION).mul(BN_MILLION).toString(),
    [reward]
  );
  const confirmAndClose = unsub => {
    setOpen(false);
    if (unsub && typeof unsub === 'function') unsub();
  };

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
          <Button basic color="green">
            Create
          </Button>
        }
      >
        <Modal.Header>Setting</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              fluid
              label="description"
              placeholder="Enter description"
              type="text"
              onChange={(_, { value }) => setDescription(value)}
            />
            <Form.Input
              fluid
              label="reward"
              placeholder="Enter reward"
              type="number"
              onChange={(_, { value }) => setReward(value)}
            />
            <Form.Input
              fluid
              label="maxPlayer"
              placeholder="Enter maxPlayer"
              type="number"
              onChange={(_, { value }) => setMaxPlayer(value)}
            />
            <Form.Input
              fluid
              label="blockDuration"
              placeholder="Enter blockDuration"
              type="number"
              onChange={(_, { value }) => setBlockDuration(value)}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <LoaderStatus status={status} color={'#000'} />

          <TxButton
            label="Create"
            type="SIGNED-TX"
            setStatus={setStatus}
            onClick={confirmAndClose}
            attrs={{
              palletRpc: 'polkapetModule',
              callable: 'createMinigame',
              inputParams: [description, rewardBN, maxPlayer, blockDuration],
              paramFields: [true, true, true, true],
            }}
          />
        </Modal.Actions>
      </Modal>
    </>
  );
}
