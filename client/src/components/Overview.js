import React from 'react';
import PropTypes from 'prop-types';
import { Message, Grid, Segment, Icon, Header } from 'semantic-ui-react';
import AssetMix from './AssetMix';
import ResultsTable from './ResultsTable';


const Overview = ({ tickers, balances, transactions, error }) => {
  const balancesReady = balances.length > 0 && tickers.length > 0;
  const transactionsReady = transactions.length > 0;

  return (
    <Segment loading={!balancesReady || !transactionsReady}>
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
};

Overview.propTypes = {
  tickers: PropTypes.arrayOf(PropTypes.object),
  balances: PropTypes.arrayOf(PropTypes.object),
  transactions: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.string
};

Overview.defaultProps = {
  error: '',
  transactions: [],
  tickers: [],
  balances: []
};

export default Overview;
