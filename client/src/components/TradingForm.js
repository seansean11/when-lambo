import React, { Component } from 'react';
import { Form, Icon, Button, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { colors } from '../core/constants';

class TradingForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trade: '',
      action: 'buy',
      error: this.props.error || ''
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
  }

  handleFormSubmit() {
    const { action, trade } = this.state;
    const { symbol, price } = this.props.ticker;

    this.props.handleTradeSubmit({
      symbol,
      side: action,
      price,
      amount: trade
    });

    this.setState({ trade: '' });
  }

  handleInputChange(event) {
    this.setState({ trade: event.target.value });
  }

  handleRadioChange(e, { value }) {
    this.setState({ action: value });
  }

  render() {
    const { disableButton, action, error, trade } = this.state;
    const { ticker } = this.props;
    const usingUsd = ticker.symbol === 'BTC-USD';

    return (
      <Form unstackable>
        <Form.Group widths="equal">
          <Form.Input
            name="trade"
            type="number"
            step="0.0000000000001"
            value={trade}
            label={`${action.toUpperCase()} ${ticker.symbol.split('-')[0]}`}
            placeholder={`${action.toUpperCase()} ${ticker.symbol.split('-')[0]}`}
            onChange={this.handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <label>Action: </label>
          <Form.Radio label="Buy" value="buy" checked={action === 'buy'} onChange={this.handleRadioChange} />
          <Form.Radio label="Sell" value="sell" checked={action === 'sell'} onChange={this.handleRadioChange} />
        </Form.Group>
        <p className="Trading-total">
          {usingUsd
            ? <span>Total Amount: <Icon name="circle" color={colors[0]} /> 0.00 USD</span>
            : <span>Total Amount: <Icon name="circle" color={colors[0]} /> 0.00 BTC</span>
          }
        </p>
        {error && <Message negative>{error}</Message>}
        <Button onClick={this.handleFormSubmit} disabled={disableButton}>Submit</Button>
      </Form>
    );
  }
}

TradingForm.propTypes = {
  ticker: PropTypes.shape({
    symbol: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  handleTradeSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
};

TradingForm.defaultProps = {
  error: ''
};

export default TradingForm;
