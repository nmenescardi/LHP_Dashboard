export const headers = {
  'Content-type': 'application/json',
};

export const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://vwap-offset.herokuapp.com/get'
    : 'http://localhost:8000/get';

export const getPairsURL = `${baseURL}/pair/`;

export const getConfigURL = `${baseURL}/config/`;

export const wssURL = 'wss://fstream.binance.com/ws/!markPrice@arr';
