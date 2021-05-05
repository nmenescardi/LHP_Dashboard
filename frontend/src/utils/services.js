export const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://vwap-offset.herokuapp.com/get'
    : 'http://localhost:8000/get';
export const headers = {
  'Content-type': 'application/json',
};
