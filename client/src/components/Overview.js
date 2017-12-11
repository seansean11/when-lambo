import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Message, Grid, Segment, Image, Icon, Header } from 'semantic-ui-react';
import AssetMix from './AssetMix';
import ResultsTable from './ResultsTable';
import { getTransactions } from '../core/api-service';


class Overview extends Component {
  constructor() {
    super();

    this.state = {
      transactions: [],
      isLoading: true,
      error: ''
    };
  }

  componentDidMount() {
    getTransactions()
      .then((transactions) => {
        this.setState({ transactions, isLoading: false });
      }).catch((err) => {
        console.log(err);
        this.setState({
          isLoading: false,
          error: 'There was an error loading the request.'
        });
      });
  }

  render() {
    const { tickers, balances } = this.props;
    const {
      transactions,
      isLoading,
      error
    } = this.state;

    const balancesReady = balances.length > 0 && tickers.length > 0;
    const transactionsReady = transactions.length > 0;

    return (
      <Segment loading={isLoading || !balancesReady || !transactionsReady}>
        <Grid>
          {error && <Message negative>{error}</Message>}
          {!error &&
            <Grid.Row>
              <Icon as="a" name="refresh" size="big" />
              <Grid.Column width={8}>
                {balancesReady &&
                  <div>
                    <Header>Balances</Header>
                    <AssetMix data={balances} tickers={tickers} />
                  </div>
                }
              </Grid.Column>
              <Grid.Column width={8} className="Transactions">
                {transactionsReady
                  ? <div className="Transactions-table"><Header>Transactions</Header><ResultsTable data={transactions} /></div>
                  : <p>No Transactions Recorded</p>
                }
              </Grid.Column>
            </Grid.Row>
          }
        </Grid>
      </Segment>
    );
  }
}

Overview.propTypes = {
  tickers: PropTypes.arrayOf(PropTypes.object).isRequired,
  balances: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Overview;
