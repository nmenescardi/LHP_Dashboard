import React, { useState, useEffect, useRef, useMemo } from 'react';
import fetchAllPairs from './../../utils/fetchAllPairs';
import handleWebSocket from './../../utils/handleWebSocket';
import getNextCallTime from './../../utils/getNextCallTime';
import { Table } from './../table/Table';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

export default () => {
  const [pairs, setPairs] = useState([]);
  const [shouldFetchPairs, setShouldFetchPairs] = useState(true);
  const connection = useRef();
  const nextCallTime = useRef(useMemo((_) => getNextCallTime(), []));

  useEffect(() => {
    if (shouldFetchPairs) {
      fetchAllPairs(setPairs);
    }
    setShouldFetchPairs(false);
  }, [shouldFetchPairs]);

  useEffect(() => {
    const ten_seconds = 10000;
    const interval = setInterval(() => {
      const now = new Date();

      if (now > nextCallTime.current) {
        setShouldFetchPairs(true);
        nextCallTime.current = getNextCallTime();
      }
    }, ten_seconds);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // It runs each 3 seconds
    handleWebSocket(connection, pairs, setPairs);
  }, [pairs]);

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
