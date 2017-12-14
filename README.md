# When Lambo

## Problem Statement
Donald wants to educate his kids about investing in cryptocurrencies. To accomplish this, he will create a virtual crypto exchange where they can pretend to buy and sell cryptocurrencies. You are Donald.

Write a web app that tracks the price of Bitcoin (in USD), as well as the prices of Litecoin, Dogecoin, and Ethereum (in BTC). Prices should be the volume-weighted average from at least 3 exchanges. Each kid should start with 10,000 USD and 0 balance for each crypto asset. The app should allow the kids to view the current prices of assets, place orders, view their portfolio distribution, and view the total value. To keep things simple, ALL TRADES MUST INVOLVE BTC. The kids must use USD to buy BTC, and they use BTC to buy and sell alts. Obviously, we need to know which kid is making the trade, but don't prioritize authentication. Use a DB of your choice. Assume that later, each kid will be developing their own client portals, wanting access to various pieces of data, so design the API accordingly.

## Dependencies
- PostgreSQL, NodeJS

## Install
1. Make sure you have PostgreSQL and NodeJS installed on your computer
2. Run `npm install` from the root directory
3. CD into the `client` directory and run `npm install`
4. Create a PostgreSQL DB for this project with the name of your choice
5. Fill in your `.env.template` file with the correct credentials in the root directory and rename the file to `.env`
6. Run `npm run db:build` from the root directory

## Run
1. Run `npm start` from the root directory
2. Choose an email address and passwords in the `db/seeds` file and log in
  - **All of the dev passwords are just `p@ssw0rd`**
