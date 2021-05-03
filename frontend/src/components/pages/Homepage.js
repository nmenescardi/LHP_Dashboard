import React from 'react';
import './Homepage.css';

export default () => {
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
                    <tr>
                      <td>BTCUSDTPERP</td>
                      <td>2.5%</td>
                      <td>58943</td>
                      <td>55999</td>
                    </tr>
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
