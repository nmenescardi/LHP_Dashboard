import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { baseURL, headers } from './../../utils/services';
import './Homepage.css';
import { Table } from './../table/Table';

const replaceSymbol = (symbol) => {
  return symbol.replace('USDT', '').replace('PERP', '');
};

const getPercentChange = (previous, current) => {
  previous = parseFloat(previous);
  current = parseFloat(current);
  if (current === previous || !previous) return 0;

  const change = ((Math.abs(current - previous) / previous) * 100.0).toFixed(2);
  const sign = current >= previous ? '+' : '-';
  return sign + change + '%';
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
    <main className="content">
      <div className="container-fluid p-0">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Pairs </h5>
              </div>
              <div className="card-body">
                <Table data={pairs} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
