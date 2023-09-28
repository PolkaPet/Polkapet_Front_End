import React, { useEffect, useMemo, useState } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';

import { useSubstrateState } from '../substrate-lib';
import { TxButton } from '../substrate-lib/components';
import { BN, BN_ONE, BN_QUINTILL } from '@polkadot/util';

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
  description: description.toString(),
  reward: reward.toJSON(),
  maxPlayer: maxPlayer.toJSON(),
  blockDuration: blockDuration.toJSON(),
  finishBlock: finishBlock.toJSON(),
  status: status.toJSON(),
});

export default function CreateMinigame(props) {
  const { api, keyring } = useSubstrateState();
  const [miniGames, setMiniGames] = useState([]);
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState(0);
  const [reward, setReward] = useState(0);
  const [maxPlayer, setMaxPlayer] = useState(0);
  const [blockDuration, setBlockDuration] = useState(0);

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
        setMiniGames(miniGamesMap);
      });
    };

    asyncFetch();

    return () => {
      unsub && unsub();
    };
  };

  useEffect(subscribeCount, [api, keyring, miniGames]);

  const rewardBN = useMemo(
    () => new BN(reward * BN_ONE).mul(BN_QUINTILL).toString(),
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
