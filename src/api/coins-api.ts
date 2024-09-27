const COIN_API = import.meta.env.VITE_COIN_API;

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
