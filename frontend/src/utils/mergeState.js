import replaceSymbol from './replaceSymbol';
import getPercentChange from './getPercentChange';

const mergeState = (pairsPrice, pairsVwap, setPairs) => {
  if (!pairsPrice.length || !pairsVwap.length) return;

  setPairs(
    pairsVwap.map((pair_vwap) => {
      let pair_price = pairsPrice.find(
        (pair_price) =>
          replaceSymbol(pair_price.symbol) === replaceSymbol(pair_vwap.symbol)
      );

      return {
        symbol: replaceSymbol(pair_vwap.symbol),
        offset: getPercentChange(pair_vwap.vwap, pair_price.price),
        vwap: pair_vwap.vwap,
        price: pair_price.price,
      };
    })
  );
};

export default mergeState;
