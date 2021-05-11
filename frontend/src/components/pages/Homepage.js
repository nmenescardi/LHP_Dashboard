import React, { useState, useEffect, useRef, useMemo } from 'react';
import fetchAllPairs from './../../utils/fetchAllPairs';
import handleWebSocket from './../../utils/handleWebSocket';
import getNextCallTime from './../../utils/getNextCallTime';
import reloadInterval from './../../utils/reloadInterval';
import { Table } from './../table/Table';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import replaceSymbol from './../../utils/replaceSymbol';
import getPercentChange from './../../utils/getPercentChange';

export default () => {
  const [pairs, setPairs] = useState([]);
  const [pairsVwap, setPairsVwap] = useState([]);
  const [pairsPrice, setPairsPrice] = useState([]);
  const connection = useRef();
  const nextCallTime = useRef(useMemo((_) => getNextCallTime(), []));

  useEffect(() => {
    fetchAllPairs(setPairsVwap);
  }, []);

  useEffect(() => {
    // It runs each 3 seconds
    handleWebSocket(connection, setPairsPrice);
  }, []);

  useEffect(() => {
    // It merges the state

    if (!pairsPrice.length || !pairsVwap.length) return;
    console.log(`pairsPrice`, pairsPrice);
    console.log(`pairsVwap`, pairsVwap);

    setPairs(
      pairsVwap.map((pair_vwap) => {
        let pair_price = pairsPrice.find(
          (pair_price) =>
            replaceSymbol(pair_price.symbol) === replaceSymbol(pair_vwap.symbol)
        );

        console.log(`pair_price`, pair_price);

        return {
          symbol: replaceSymbol(pair_vwap.symbol),
          offset: getPercentChange(pair_vwap.vwap, pair_price.price),
          vwap: pair_vwap.vwap,
          price: pair_price.price,
        };
      })
    );
  }, [pairsVwap, pairsPrice]);

  useEffect(() => {
    const interval = reloadInterval(nextCallTime);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <div>
          <Typography variant="h3" component="h1" gutterBottom>
            Binance Futures
          </Typography>
        </div>
        <div>
          <Table data={pairs} />
        </div>
      </Container>
    </>
  );
};
