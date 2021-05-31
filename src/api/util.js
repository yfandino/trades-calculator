import crypto from "crypto";

const SECRET = localStorage.getItem('secret');
const API_KEY = localStorage.getItem('apiKey');

export const URLS = {
  SPOT: {
    trades: "/api/v3/myTrades",
    account: "/api/v3/account"
  },
  MARGIN: {
    trades: "/sapi/v1/margin/myTrades",
    account: "/sapi/v1/margin/account"
  },
  MARKET: {
    avgPrice: "/api/v3/avgPrice"
  }
}

export function createSignature(queryString) {
  return crypto
    .createHmac('sha256', SECRET)
    .update(queryString)
    .digest('hex');
}

export async function callAPI(url) {
  const response = await fetch(url, {
    headers: {
      'X-MBX-APIKEY': API_KEY
    }
  });
  return response.json();
}