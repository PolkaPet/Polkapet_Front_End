import React, { useMemo, useState } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';

import { TxButton } from '../substrate-lib/components';
import { BN, BN_BILLION } from '@polkadot/util';

export default function CreateMinigame(props) {
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState(0);
  const [reward, setReward] = useState(0);
  const [maxPlayer, setMaxPlayer] = useState(0);
  const [blockDuration, setBlockDuration] = useState(0);

  const rewardBN = useMemo(
    () => new BN(reward * BN_BILLION).mul(BN_BILLION).toString(),
    [reward]
  );
  
  return (
    <>
      <Modal
        trigger={
          <Button basic color="blue">
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
          <div style={{ overflowWrap: 'break-word', color: '#000' }}>
            {status}
          </div>
          <TxButton
            label="Create"
            type="SIGNED-TX"
            setStatus={setStatus}
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
