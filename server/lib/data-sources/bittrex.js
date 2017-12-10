const request = require('request-promise');
const logger = require('../logger');

const baseUri = 'https://bittrex.com/api/v1.1/public';

function getTicker(baseSymbol, quoteSymbol) {
  const cleanBaseSymbol = baseSymbol === 'USD' ? 'USDT' : baseSymbol;
  const cleanQuoteSymbol = quoteSymbol === 'USD' ? 'USDT' : quoteSymbol;
  const symbol = `${cleanQuoteSymbol}-${cleanBaseSymbol}`;

  return request({
    uri: `${baseUri}/getmarketsummary?market=${symbol}`,
    forever: true,
    json: true
  }).then((data) => {
    if (!data.success) {
      logger.error(`Bittrex error: ${data.message}`);
      const err = new Error(`Unable to get ${symbol} quote`);
      err.status = 400;
      throw err;
    }

    return {
      price: parseFloat(data.result[0].Last),
      volume: parseFloat(data.result[0].BaseVolume)
    };
  });
}

module.exports = {
  getTicker
};
