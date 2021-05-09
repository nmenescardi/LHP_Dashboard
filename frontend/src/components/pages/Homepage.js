import React, { useState, useEffect, useRef } from 'react';
import fetchAllPairs from './../../utils/fetchAllPairs';
import handleWebSocket from './../../utils/handleWebSocket';
import { Table } from './../table/Table';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

export default () => {
  const [pairs, setPairs] = useState([]);
  const connection = useRef();

  useEffect(() => {
    fetchAllPairs(setPairs);
  }, []);

  useEffect(() => {
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
