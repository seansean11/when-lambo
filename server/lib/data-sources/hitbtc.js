const request = require('request-promise');
const logger = require('../logger');

const baseUri = 'https://api.hitbtc.com/api/2/public';

function getTicker(baseSymbol, quoteSymbol) {
  const symbol = `${baseSymbol}${quoteSymbol}`;

  return request({
    uri: `${baseUri}/ticker/${symbol}`,
    forever: true,
    json: true
  }).then(data => ({
    price: parseFloat(data.last),
    volume: parseFloat(data.volumeQuote)
  })).catch((err) => {
    logger.error(`Hitbtc error: ${err.error.message}`);
    const newErr = new Error(`Unable to get ${symbol} quote`);
    newErr.status = 400;
    throw newErr;
  });
}

module.exports = {
  getTicker
};
