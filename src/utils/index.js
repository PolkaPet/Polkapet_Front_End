import { BN } from '@polkadot/util';
import numeral from 'numeral';

export async function getOvalBoostNumber(api) {
  const data = api && (await api.query.polkapetModule?.ovalBoostNumber());

  return data?.toHuman();
}

export async function getPolkapetsById(api, id) {
  const data =
    api && id && api && (await api.query.polkapetModule?.polkapetsById(id));

  return data?.toHuman();
}

export async function getPolkapetsOwnedByAddress(api, ownerAddress) {
  const data =
    ownerAddress &&
    api &&
    (await api.query.polkapetModule?.polkapetsOwned(ownerAddress));

  return data?.toHuman();
}

export async function getGameDetailById(api, id) {
  const data =
    id && api && (await api?.query?.polkapetModule?.minigameById(id));

  return data?.toHuman();
}

export async function getPlayersByGameId(api, id) {
  const data =
    id && api && (await api.query.polkapetModule?.minigamePlayers(id));

  return data?.toHuman();
}

export async function getRunningGameId(api) {
  const data = api && (await api.query.polkapetModule?.runningMinigameIds());

  return data?.toHuman();
}

export async function getResultByGameId(api, id) {
  const data =
    id && (await api.query.polkapetModule?.minigameResultsByMinigameId(id));

  return data?.toHuman();
}

export function convertCamelCase(inputString) {
  return inputString
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, f => f.toUpperCase());
}

export function convertBNtoNumber(inputString) {
  if (typeof inputString !== 'string') return 0;

  const inputFormatted = inputString?.replaceAll(',', '');

  const numberInDecimal = new BN(inputFormatted).toString() / 10 ** 12;

  return numberInDecimal;
}

export function generateRandomColors(count) {
  const colors = [];

  for (let i = 0; i < count; i++) {
    const randomColor = getRandomHexColor();
    colors.push(randomColor);
  }

  return colors;
}

function getRandomHexColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
export const shortenAddress = (str, n = 6) => {
  if (!str) return '';

  const length = str?.length;

  return length > n
    ? str?.substr(0, n - 1) + ' ... ' + str?.substr(length - n, length - 1)
    : str;
};

export const formatNumeber = (num = 0, dec = 2) => {
  const number = parseInt(num * 10 ** dec) / 10 ** dec;
  const numStr = number.toString();
  const dotIdx = numStr.indexOf('.');

  if (dotIdx === -1) {
    return numeral(numStr).format('0,0');
  }

  const intPart = numeral(numStr.slice(0, dotIdx)).format('0,0');
  const decPart = numStr.slice(dotIdx + 1, numStr.length);

  return (
    <span>
      {intPart}
      <>{`${dotIdx === -1 ? '' : `.${decPart}`}`}</>
    </span>
  );
};

export const strToNumber = (str = '') => {
  if (typeof str !== 'string') return str;

  const number = str?.replace(/,/g, '');
  return parseFloat(number);
};
