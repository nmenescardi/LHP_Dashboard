import React, { useState, useEffect, useRef } from 'react';
import fetchAllPairs from './../../utils/fetchAllPairs';
import handleWebSocket from './../../utils/handleWebSocket';
import getNextCallTime from './../../utils/getNextCallTime';
import { Table } from './../table/Table';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

export default () => {
  const [pairs, setPairs] = useState([]);
  const [nextCallTime, setNextCallTime] = useState(getNextCallTime);
  const [shouldFetchPairs, setShouldFetchPairs] = useState(true);
  const connection = useRef();

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
      console.log(`now`, now);
      console.log(`state next call `, nextCallTime);
      if (now > nextCallTime) {
        setShouldFetchPairs(true);
        setNextCallTime(getNextCallTime());
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
