import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { baseURL, headers } from './../../utils/services';
import './Homepage.css';

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
      connection.current.onopen = () => {
        //do something, maybe just log that the websocket is open;
      };
      connection.current.onclose = () => {
        //do something, maybe just log that the websocket is closed;
      };
      connection.current.onmessage = (e) => {
        const value = e.data;
        console.log(e);
        console.log(value);
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
                          <td>{pair.symbol}</td>
                          <td>2.5%</td>
                          <td>58943</td>
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
