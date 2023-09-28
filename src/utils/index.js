import { BN } from '@polkadot/util';
 
export async function getOvalBostNumber(api) {
  const data = api && (await api.query.polkapetModule?.ovalBostNumber());

  return data?.toHuman();
}

export async function getPolkapetsById(api, id) {
  const data =
    api && id && api && (await api.query.polkapetModule?.polkapetsByNumber(id));

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

  const numberInMil = new BN(inputFormatted).div(new BN(10 ** 6)).toString();

  return numberInMil / 10 ** 12;
}
