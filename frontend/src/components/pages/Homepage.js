import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { baseURL, headers } from './../../utils/services';
import './Homepage.css';
import { Table } from './../table/Table';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

const replaceSymbol = (symbol) => {
  return symbol.replace('USDT', '').replace('PERP', '');
};

const getPercentChange = (previous, current) => {
  previous = parseFloat(previous);
  current = parseFloat(current);
  if (current === previous || !previous) return 0;

  const change = ((Math.abs(current - previous) / previous) * 100.0).toFixed(2);
  return current >= previous ? change : change * -1;
};

export default () => {
  const [pairs, setPairs] = useState([]);
  const connection = useRef();
  const countRef = useRef(0);

  useEffect(() => {
    retrieveAllPairs();
  }, [countRef]);
  const retrieveAllPairs = () => {
    axios
      .get(`${baseURL}/pair/`)
      .then((response) => {
        const formatted_pairs = response.data.map((pair) => {
          return {
            ...pair,
            symbol: replaceSymbol(pair.symbol),
          };
        });
        setPairs(formatted_pairs);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    if (
      !(connection && connection.current && connection.current.readyState === 1)
    ) {
      connection.current = new WebSocket(
        'wss://fstream.binance.com/ws/!markPrice@arr'
      );
      connection.current.onmessage = (e) => {
        const results = JSON.parse(e.data);

        if (!results || !pairs.length) return;

        setPairs(
          pairs.map((pair) => {
            let result = results.find(
              (result) => replaceSymbol(pair.symbol) === replaceSymbol(result.s)
            );

            return result
              ? {
                  ...pair,
                  price: result.p,
                  offset: getPercentChange(pair.vwap, result.p),
                }
              : pair;
          })
        );
      };
    }
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
