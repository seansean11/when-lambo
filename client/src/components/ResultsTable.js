import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Table } from 'semantic-ui-react';

const renderRow = (txn) => {
  if (txn.transactionMeta && txn.transactionMeta.symbol) {
    const { side, price, symbol } = txn.transactionMeta;
    const purchasedCurrency = symbol.split('-')[0];

    return (
      <Table.Row key={txn.id}>
        <Table.Cell>
          {moment(txn.created_at).format('MMM Do YYYY')}
        </Table.Cell>
        <Table.Cell>
          {side.toUpperCase()}
        </Table.Cell>
        <Table.Cell>
          {symbol}
        </Table.Cell>
        <Table.Cell>
          {parseFloat(price).toFixed(6)}
        </Table.Cell>
        <Table.Cell>
          {parseFloat(txn[purchasedCurrency]).toFixed(6)}
        </Table.Cell>
      </Table.Row>
    );
  }
};

const ResultsTable = ({ data }) => (
  <Table celled padded>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Date</Table.HeaderCell>
        <Table.HeaderCell>Type</Table.HeaderCell>
        <Table.HeaderCell>Symbol</Table.HeaderCell>
        <Table.HeaderCell>Price</Table.HeaderCell>
        <Table.HeaderCell>Amount</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {data.map(renderRow)}
    </Table.Body>
  </Table>
);

ResultsTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ResultsTable;
