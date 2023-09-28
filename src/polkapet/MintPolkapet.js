import React, { useState } from 'react';
import { Form, Grid } from 'semantic-ui-react';

import { TxButton } from '../substrate-lib/components';

export default function Polkapets(props) {
  const [status, setStatus] = useState('');

  return (
    <Grid.Column width={16}>
      <h1 style={{ color: 'white' }}>Mint</h1>
      <Form style={{ margin: '1em 0' }}>
        <Form.Field style={{ textAlign: 'center' }}>
          <TxButton
            label="Create Polkapet"
            type="SIGNED-TX"
            setStatus={setStatus}
            attrs={{
              palletRpc: 'polkapetModule',
              callable: 'createPolkapet',
              inputParams: [],
              paramFields: [],
            }}
          />
        </Form.Field>
      </Form>
      <div style={{ overflowWrap: 'break-word', color: 'white' }}>{status}</div>
    </Grid.Column>
  );
}
