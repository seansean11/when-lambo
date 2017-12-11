import React, { Component } from 'react';
import { getTickers, getBalances, postTransactions, getTransactions } from '../core/api-service';
import Header from './Header';
import Overview from './Overview';
import Trading from './Trading';

class App extends Component {
  constructor() {
    super();
    this.state = { tickers: [], balances: [], transactions: [] };
    this.getData = this.getData.bind(this);
    this.handleTradeSubmit = this.handleTradeSubmit.bind(this);
  }

  componentDidMount() {
    // Polling every 30sec
    this.getData();
    setTimeout(this.getData, 30000);
  }

  getData() {
    Promise.all([
      getTickers(),
      getBalances(),
      getTransactions()
    ])
      .then(([tickers, balances, transactions]) => this.setState({ tickers, balances, transactions }))
      .catch(err => console.log(err));
  }

  handleTradeSubmit({ symbol, side, price, amount }) {
    postTransactions({ symbol, side, price, amount })
      .then(this.getData)
      .catch(err => console.log(err));
  }

  render() {
    const { tickers, balances, transactions } = this.state;
    return (
      <div>
        <Header />
        <Overview tickers={tickers} balances={balances} transactions={transactions} />
        <Trading tickers={tickers} balances={balances} handleTradeSubmit={this.handleTradeSubmit} />
      </div>
    );
  }
}

export default App;
