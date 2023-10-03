import React, { useCallback, useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';

import { useSubstrateState } from '../substrate-lib';
import { convertCamelCase, getOvalBoostNumber } from '../utils';
import useInterval from 'use-interval';

export default function OvalBoostNumber(props) {
  const { api } = useSubstrateState();

  const [ovalBoostNumber, setOvalBoostNumber] = useState(null);

  const fetchData = useCallback(async () => {
    const num = await getOvalBoostNumber(api);
    setOvalBoostNumber(num);
  }, [api]);

  useEffect(() => {
    api && fetchData();
  }, [api, fetchData]);

  useInterval(() => fetchData(), 1000);

  return (
    <Grid.Column style={{ color: 'white' }} width={16}>
      <img
        alt="logo_mean"
        width={300}
        src={`${process.env.PUBLIC_URL}/assets/KittyAvatar/logo_mean.png`}
      />
      <div>
        {ovalBoostNumber &&
          Object.entries(ovalBoostNumber).map(([k, v]) => {
            return (
              <p key={k}>
                {convertCamelCase(k)} : {v}
              </p>
            );
          })}
      </div>{' '}
    </Grid.Column>
  );
}
