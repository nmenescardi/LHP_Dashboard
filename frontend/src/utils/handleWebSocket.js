import replaceSymbol from './replaceSymbol';
import getPercentChange from './getPercentChange';
import { wssURL } from './services';

const handleWebSocket = (connection, setPairsPrice) => {
  if (
    !(connection && connection.current && connection.current.readyState === 1)
  ) {
    connection.current = new WebSocket(wssURL);
    connection.current.onmessage = (e) => {
      const results = JSON.parse(e.data);

      if (!results) return;

      setPairsPrice(
        results.map((result) => {
          return {
            symbol: replaceSymbol(result.s),
            price: result.p,
          };
        })
      );
    };
  }
};

export default handleWebSocket;
