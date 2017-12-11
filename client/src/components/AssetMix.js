import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Table } from 'semantic-ui-react';
import { colors } from '../core/constants';

const renderRow = (currency, i) => (
  <Table.Row key={i}>
    <Table.Cell>
      <Icon name="circle" color={colors[i]} />{currency.label}
    </Table.Cell>
    <Table.Cell>
      {parseFloat(currency.balance)}
    </Table.Cell>
    <Table.Cell>
      {currency.usd}
    </Table.Cell>
    <Table.Cell>
      {currency.percentage.toFixed(4)}
    </Table.Cell>
  </Table.Row>
);

const AssetMix = ({ data, tickers }) => {
  const usdTicker = tickers.find(t => t.symbol === 'BTC-USD');
  const updatedData = data.map((d) => {
    const balance = parseFloat(d.balance);

    if (d.label === 'USD') {
      return { ...d, usd: balance.toFixed(2) };
    }

    if (d.label === 'BTC') {
      return { ...d, usd: (balance * usdTicker.price).toFixed(2) };
    }

    const matchingTicker = tickers.find(t => t.symbol === `${d.label}-BTC`);
    return { ...d, usd: (balance * matchingTicker.price * usdTicker.price).toFixed(2) };
  });
  const totalUsd = updatedData.reduce((total, d) => total + Number(d.usd), 0);
  const finalData = updatedData.map(d => ({ ...d, percentage: (d.usd / totalUsd) * 100 }));

  return (
    <Table celled padded>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Currency</Table.HeaderCell>
          <Table.HeaderCell>Amount</Table.HeaderCell>
          <Table.HeaderCell>USD amount</Table.HeaderCell>
          <Table.HeaderCell>Portfolio %</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {finalData.map(renderRow)}
      </Table.Body>
    </Table>
  );
};

AssetMix.propTypes = {
  tickers: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default AssetMix;
