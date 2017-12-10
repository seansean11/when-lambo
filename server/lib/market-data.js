const bittrex = require('./data-sources/bittrex');
const cryptopia = require('./data-sources/cryptopia');
const hitbtc = require('./data-sources/hitbtc');

function weightedAvgPrice(priceVolumeData) {
  const totalVolume = priceVolumeData.reduce((total, pvd) => total + pvd.volume, 0);

  return priceVolumeData
    .map(pvd => pvd.price * (pvd.volume / totalVolume))
    .reduce((total, weightedPrice) => total + weightedPrice, 0);
}

function getTickerPrice(symbol) {
  const symbols = symbol.split('-');
  const cleanBaseSymbol = symbols[0].toUpperCase();
  const cleanQuoteSymbol = symbols[1].toUpperCase();

  return Promise.all([
    bittrex.getTicker(cleanBaseSymbol, cleanQuoteSymbol),
    cryptopia.getTicker(cleanBaseSymbol, cleanQuoteSymbol),
    hitbtc.getTicker(cleanBaseSymbol, cleanQuoteSymbol)
  ]).then(weightedAvgPrice);
}

module.exports = {
  getTickerPrice
};
