const COIN_API = 'https://api.coincap.io/v2/assets';

export const getCoins = async () => {
  const response = await fetch(COIN_API);
  return await response.json();
};

export const getHistoryCoin = async (id: string, interval: string) => {
  const response = await fetch(`${COIN_API}/${id}/history?interval=${interval}`);
  return await response.json();
};

export const getActiveCoin = async (id: string) => {
  const response = await fetch(`${COIN_API}/${id}`);
  return await response.json();
};

export const getTopCoins = async (limit: number) => {
  const response = await fetch(`${COIN_API}?limit=${limit}`);
  return await response.json();
};
