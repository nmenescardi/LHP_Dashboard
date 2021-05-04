import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { baseURL, headers } from './../../utils/services';
import './Homepage.css';

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
        setPairs(response.data);
        console.log(response.data);
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

        if (!results) return;

        // Update price
        setPairs(
          pairs.map((pair) => {
            let result = results.find(
              (result) => replaceSymbol(pair.symbol) === replaceSymbol(result.s)
            );

            return result ? { ...pair, price: result.p } : pair;
          })
        );
      };
    }
  });
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
                <table id="datatables-basic" className="table table-striped">
                  <thead>
                    <tr>
                      <th>Pair</th>
                      <th>Current Offset</th>
                      <th>Price</th>
                      <th>Vwap</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pairs &&
                      pairs.map((pair, index) => (
                        <tr key={index}>
                          <td>{replaceSymbol(pair.symbol)}</td>
                          <td>
                            {getPercentChange(pair.vwap, pair.price || 0)}
                          </td>
                          <td>
                            {pair.price
                              ? parseFloat(pair.price).toFixed(3)
                              : '-'}
                          </td>
                          <td>{pair.vwap}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
