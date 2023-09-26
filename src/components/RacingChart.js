/* eslint-disable no-unused-vars */
import { React, useState, useEffect, useCallback } from 'react';
import ChartRace from 'react-chart-race';
import { useSubstrateState } from '../substrate-lib';
import { getPolkapetsById, getResultByGameId } from '../utils';
import useInterval from 'use-interval';
import PolkapetAvatar from '../polkapet/PolkapetAvatar';
import { hexToU8a } from '@polkadot/util';

const color = [
  '#50c4fe',
  '#3fc42d',
  '#c33178',
  '#423bce',
  '#c8303b',
  '#2c2c2c',
];

function RacingChart({ gameId }) {
  const { api } = useSubstrateState();

  const [point, setPoint] = useState(null);

  const fetchData = useCallback(async () => {
    let num = await getResultByGameId(api, gameId);
    console.log('num A', num);

    Promise.all(
      num?.map(async ({ petNumber, point }, idx) => {
        const petInfo = await getPolkapetsById(api, petNumber);
        console.log('petInfo A', petInfo);
        return {
          id: idx + 1,
          title: (
            <PolkapetAvatar
              dna={hexToU8a(petInfo?.dna)}
              heightOuterStyle={64}
              widthOuterStyle={'auto'}
              heightInnerStyle={60}
            />
          ),
          value: point,
          color: color[idx],
        };
      })
    ).then(arr => setPoint(arr));

    // setPoint([...num]);
    console.log('num', num);
  }, [api, gameId]);

  console.log('point', point);
  useEffect(() => {
    api && fetchData();
  }, [api, fetchData]);

  useInterval(() => fetchData(), 1000);

  return (
    <div>
      {point && (
        <ChartRace
          data={point}
          backgroundColor="#000"
          width={500}
          padding={12}
          itemHeight={58}
          gap={12}
          titleStyle={{ font: 'normal 400 13px Arial', color: '#fff' }}
          valueStyle={{
            font: 'normal 400 11px Arial',
            color: 'rgba(255,255,255, 0.42)',
          }}
        />
      )}

      {/* <button onClick={handleChange}>Click Me!</button> */}
    </div>
  );
}

export default RacingChart;
