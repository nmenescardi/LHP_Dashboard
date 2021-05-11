import React, { useState, useEffect, useRef, useMemo } from 'react';
import fetchAllPairs from './../../utils/fetchAllPairs';
import handleWebSocket from './../../utils/handleWebSocket';
import getNextCallTime from './../../utils/getNextCallTime';
import reloadInterval from './../../utils/reloadInterval';
import mergeState from './../../utils/mergeState';
import { Table } from './../table/Table';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

export default () => {
  const [pairs, setPairs] = useState([]);
  const [pairsVwap, setPairsVwap] = useState([]);
  const [pairsPrice, setPairsPrice] = useState([]);
  const [shouldFetchPairs, setShouldFetchPairs] = useState(true);
  const connection = useRef();
  const nextCallTime = useRef(useMemo((_) => getNextCallTime(), []));

  useEffect(() => {
    if (shouldFetchPairs) fetchAllPairs(setPairsVwap);

    setShouldFetchPairs(false);
  }, [shouldFetchPairs]);

  useEffect(() => {
    // It runs every 3 seconds
    handleWebSocket(connection, setPairsPrice);
  }, []);

  useEffect(() => {
    mergeState(pairsPrice, pairsVwap, setPairs);
  }, [pairsVwap, pairsPrice]);

  useEffect(() => {
    const interval = reloadInterval(nextCallTime, setShouldFetchPairs);
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
