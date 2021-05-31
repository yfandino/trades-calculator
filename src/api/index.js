import { URLS, createSignature, callAPI } from "./util";

const getServerTime = async () => {
  const response = await callAPI('/api/v3/time');
  return response.serverTime;
}

export const getWallet = async (tradingType) => {
  const timestamp = await getServerTime();
  const queryString = `timestamp=${timestamp}`;
  const signature = createSignature(queryString);
  const url = `${URLS[tradingType].account}?timestamp=${timestamp}&signature=${signature}`;
  const accountInfo = await callAPI(url);

  if (tradingType === "SPOT")
    return accountInfo?.balances?.filter(e => (e.free > 0.00000000 || e.locked > 0.00000000) && e.asset !== "USDT");
  else
    return accountInfo?.userAssets?.filter(
      e => (parseFloat(e.free) > 0.00000000 || parseFloat(e.locked) > 0.00000000) && e.asset !== "USDT"
    );
}

export const getTrades = async (tradingType, symbol) => {
  const timestamp = await getServerTime();
  const queryString = `symbol=${symbol}&timestamp=${timestamp}`;
  const signature = createSignature(queryString);
  const url = `${URLS[tradingType].trades}?${queryString}&signature=${signature}`;
  const trades = await callAPI(url);

  if (trades.code) throw trades;

  return trades?.sort((x, y) => y.time - x.time) || null;
}

export async function getAvgPrice(symbol) {
  const queryString = `symbol=${symbol}`;
  const url = `${URLS['MARKET'].avgPrice}?${queryString}`;
  const avgPrice = await callAPI(url);

  return avgPrice.price;
}