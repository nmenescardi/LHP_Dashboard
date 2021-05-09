import axios from 'axios';
import { getPairsURL } from './services';
import replaceSymbol from './replaceSymbol';

const fetchAllPairs = (savePairs) => {
  axios
    .get(getPairsURL)
    .then((response) => {
      const formatted_pairs = response.data.map((pair) => {
        return {
          ...pair,
          symbol: replaceSymbol(pair.symbol),
        };
      });

      savePairs(formatted_pairs);
    })
    .catch((e) => {
      console.error(e);
    });
};

export default fetchAllPairs;
