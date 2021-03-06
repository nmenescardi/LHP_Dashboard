import replaceSymbol from './replaceSymbol';
import getPercentChange from './getPercentChange';

const mergeState = (pairsPrice, pairsVwap, setPairs, pairsConfig) => {
  if (!pairsPrice.length || !pairsVwap.length) return;

  setPairs(
    pairsVwap.map((pair_vwap) => {
      let pair_price = pairsPrice.find(
        (pair_price) =>
          replaceSymbol(pair_price.symbol) === replaceSymbol(pair_vwap.symbol)
      );

      let pair_config = pairsConfig.find(
        (pair_config) =>
          replaceSymbol(pair_config.symbol) === replaceSymbol(pair_vwap.symbol)
      );

      const offset = getPercentChange(pair_vwap.vwap, pair_price.price);
      const delta = pair_config
        ? offset >= 0
          ? offset - pair_config.shortoffset
          : (offset + pair_config.longoffset) * -1
        : 0;

      return {
        symbol: replaceSymbol(pair_vwap.symbol),
        offset,
        vwap: pair_vwap.vwap,
        price: pair_price.price,
        delta,
      };
    })
  );
};

export default mergeState;
