import replaceSymbol from './replaceSymbol';
import getPercentChange from './getPercentChange';
import { wssURL } from './services';

const handleWebSocket = (connection, pairs, setPairs) => {
  if (
    !(connection && connection.current && connection.current.readyState === 1)
  ) {
    connection.current = new WebSocket(wssURL);
    connection.current.onmessage = (e) => {
      const results = JSON.parse(e.data);

      if (!results || !pairs.length) return;

      setPairs(
        pairs.map((pair) => {
          let result = results.find(
            (result) => replaceSymbol(pair.symbol) === replaceSymbol(result.s)
          );

          return result
            ? {
                ...pair,
                price: result.p,
                offset: getPercentChange(pair.vwap, result.p),
              }
            : pair;
        })
      );
    };
  }
};

export default handleWebSocket;
