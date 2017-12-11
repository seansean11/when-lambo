import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment, Image, Icon, Header, Label } from 'semantic-ui-react';
import TradingForm from './TradingForm';
import { colors } from '../core/constants';

const Trading = ({ tickers, balances, handleTradeSubmit }) => {
  const usdBalance = balances.find(b => b.label === 'USD');
  const btcBalance = balances.find(b => b.label === 'BTC');
  const isLoading = balances.length < 1 && tickers.length < 1;
  console.log(tickers);

  return (
    <div className="Trading">
      <Header as="h1">Trading</Header>
      <Segment.Group>
        {tickers.map((ticker, i) => (
          <Segment loading={isLoading} key={i}>
            <Grid>
              <Grid.Row>
                <Grid.Column width={6}>
                  {isLoading && <Image alt="placeholder" src="/skeleton-img.png" />}
                  <h1><Icon name="circle" color={colors[i + 1]} /> {ticker.symbol}</h1>
                  <Header>
                    {ticker.price.toFixed(14)}
                    <Label className="Trading-tag" tag>{(ticker.symbol === 'BTC-USD') ? 'USD' : 'BTC'}</Label>{' '}
                  </Header>
                </Grid.Column>
                <Grid.Column width={10}>
                  {isLoading && <Image alt="placeholder" src="/skeleton.png" />}
                  <TradingForm ticker={ticker} handleTradeSubmit={handleTradeSubmit} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        ))}
      </Segment.Group>
    </div>
  );
};

Trading.propTypes = {
  tickers: PropTypes.arrayOf(PropTypes.object).isRequired,
  balances: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleTradeSubmit: PropTypes.func.isRequired
};

export default Trading;
