This Django/React project is used to show Vwap data in real time for Binance Futures coins. It calculates and shows the offset between price and vwap.

The site is deployed to Heroku: [Vwap Offset](https://vwap-offset.herokuapp.com/) and uses a remote MySQL connection to stored data.

All Vwap data is received through [TradingView](https://www.tradingview.com/) webhooks.

The Frontend is made in React using [create-react-app](https://github.com/facebook/create-react-app).

<br/>

# **Table of contents**

<!--ts-->

- [Installation](#installation)
  - [Requirements](#requirements)
  - [Install Dependencies](#install-dependencies)
  - [MySQL](#mysql)
  - [FrontEnd](#frontend)

<br/>

# **Installation**

## Requirements

Base requirements: [Python 3](https://www.python.org/) & [pip](https://pip.pypa.io/en/stable/).

Dependencies are handled using [Pipenv](https://pypi.org/project/pipenv/). To install it:

```sh
$ pip install pipenv
```

<br/>

## Install Dependencies

```
$ pipenv install
```

<br/>

## MySQL

Duplicate and rename .env file here : `/LHP_Dashboard/.env.example`. Place MySQL credentials there.
Alternatively, you can change Django settings to use a different DB engine.

<br/><br/>

## FrontEnd

To install frontend dependencies:
`cd /frontend && npm install`

And to run it locally:
`npm run start`

<br/><br/>
