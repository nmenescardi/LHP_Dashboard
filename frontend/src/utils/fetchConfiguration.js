import axios from 'axios';
import { getConfigURL } from './services';
import replaceSymbol from './replaceSymbol';

const fetchAllPairs = (setPairsConfig) => {
  axios
    .get(getConfigURL)
    .then((response) => {
      const formatted_pairs = response.data.map((pair) => {
        return {
          ...pair,
          symbol: replaceSymbol(pair.symbol),
        };
      });

      setPairsConfig(formatted_pairs);
    })
    .catch((e) => {
      console.error(e);
    });
};

export default fetchAllPairs;
