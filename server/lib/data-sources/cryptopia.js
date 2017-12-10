const request = require('request-promise');
const logger = require('../logger');

const baseUri = 'https://www.cryptopia.co.nz/api';

function getTicker(baseSymbol, quoteSymbol) {
  const cleanBaseSymbol = baseSymbol === 'USD' ? 'USDT' : baseSymbol;
  const cleanQuoteSymbol = quoteSymbol === 'USD' ? 'USDT' : quoteSymbol;
  const symbol = `${cleanBaseSymbol}-${cleanQuoteSymbol}`;

  return request({
    uri: `${baseUri}/GetMarket/${symbol}`,
    forever: true,
    json: true
  }).then((data) => {
    if (data.Error) {
      logger.error(`Cryptopia error: ${data.Error}`);
      const err = new Error(`Unable to get ${symbol} quote`);
      err.status = 400;
      throw err;
    }

    return {
      price: parseFloat(data.Data.LastPrice),
      volume: parseFloat(data.Data.BaseVolume)
    };
  });
}

module.exports = {
  getTicker
};
