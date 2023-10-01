import { BN } from '@polkadot/util';

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