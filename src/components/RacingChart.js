import { React, useState, useEffect, useCallback, useMemo } from 'react';
import ChartRace from 'react-chart-race';
import { useSubstrateState } from '../substrate-lib';
import {
  getPolkapetsById,
  getResultByGameId,
  generateRandomColors,
} from '../utils';
import useInterval from 'use-interval';
import PolkapetAvatar from '../polkapet/PolkapetAvatar';
import { hexToU8a } from '@polkadot/util';
import { Image } from 'semantic-ui-react';

const color = generateRandomColors(100);

function RacingChart({ gameId, players }) {
  const { api, currentAccount } = useSubstrateState();

  const [point, setPoint] = useState(null);

  const fetchData = useCallback(async () => {
    let num = await getResultByGameId(api, gameId);

    num?.sort((a, b) => {
      return (
        Number(b.point.replaceAll(',', '')) -
        Number(a.point.replaceAll(',', ''))
      );
    });

    num &&
      Promise.all(
        num?.map(async ({ petId, point }, idx) => {
          const petInfo = await getPolkapetsById(api, petId);

          return {
            petId: petInfo?.petId,
            id: idx + 1,
            title: (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'center',
                  color: '#fff',
                }}
              >
                <div style={{ marginLeft: '25px' }}>Id: {petId}</div>{' '}
                <PolkapetAvatar
                  dna={hexToU8a(petInfo?.dna)}
                  deadStatus={petInfo?.death}
                  heightOuterStyle={44}
                  widthOuterStyle={44}
                  heightInnerStyle={44}
                  margin="1px auto"
                />
              </div>
            ),
            value: point,
            color: color[idx],
          };
        })
      ).then(arr => setPoint(arr));

    // setPoint([...num]);
  }, [api, gameId]);

  useEffect(() => {
    api && fetchData();
  }, [api, fetchData]);

  const userPlayers = useMemo(() => {
    let p = players?.filter(i => i?.owner === currentAccount?.address);

    p = p
      ?.map(item => {
        const raceInfo = point?.find(i => i.petId === item.petId);
        return { ...item, point: raceInfo?.value, id: raceInfo?.id };
      })
      .sort((a, b) => {
        return (
          Number(b?.point?.replaceAll(',', '')) -
          Number(a?.point?.replaceAll(',', ''))
        );
      });

    return p;
  }, [currentAccount?.address, players, point]);

  useInterval(() => fetchData(), 1000);

  const imgUrl = `${process.env.PUBLIC_URL}/assets/logoPartner/partner_${
    (gameId % 5) + 1
  }.jpeg`;

  return (
    <div>
      {point ? (
        <ChartRace
          data={point}
          backgroundColor="#3a403c"
          width={500}
          padding={12}
          itemHeight={50}
          gap={32}
          valueStyle={{
            font: 'normal 600 11px Arial',
            color: 'rgba(255,255,255, 0.9)',
            backgroundColor: 'rgba(25,25,25, 0.3)',
            position: 'absolute',
            top: '15px',
            left: '5px',
            padding: '2px 3px',
          }}
        />
      ) : (
        <Image size="large" src={imgUrl} />
      )}

      {userPlayers?.length !== 0 &&
        userPlayers?.map(item => {
          return (
            <div key={item?.petId}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'center',
                  color: '#fff',
                }}
              >
                <div>Rank: {item?.id}</div> <div> - Point: {item?.point}</div>{' '}
                <div> - Id: {item?.petId}</div>{' '}
                <PolkapetAvatar
                  dna={hexToU8a(item?.dna)}
                  deadStatus={item?.death}
                  heightOuterStyle={48}
                  widthOuterStyle={48}
                  heightInnerStyle={48}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default RacingChart;
