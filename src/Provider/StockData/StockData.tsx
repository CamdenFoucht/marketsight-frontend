import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import useInterval from 'use-interval';

import { times } from './times';

const Context = createContext<any>(null);

// API KEYS
const IEX_TOKEN = process.env.REACT_APP_IEX_API_KEY;

const StockDataProvider: React.FC = ({ children }) => {
  const [tickers, setTickers] = useState<any>({});

  // Check if its a 5th minute interval, if so update the tickers
  useInterval(() => {
    let date = new Date();
    if (
      date.getMinutes() % 5 === 0 &&
      date.getDay() >= 1 &&
      date.getDay() <= 5
    ) {
      updateTickers(tickers);
    }
  }, 60000);

  const updateTickers = (tickers: any) => {
    Object.keys(tickers).forEach((el: any) => {
      fetchTicker(el);
    });
  };

  const getTicker = async (symbol: string) => {
    if (symbol === '') {
      return {};
    }

    if (tickers['symbol']) {
      return tickers[symbol];
    } else {
      await fetchTicker(symbol);
    }

    return tickers[symbol];
  };

  const fetchTicker = async (symbol: string) => {
    let data: any = {};

    axios
      .get(
        `https://cloud.iexapis.com/stable/stock/${symbol}/intraday-prices?chartInterval=1&token=${IEX_TOKEN}`
      )
      .then((res) => {
        let rData = res.data
          .map((el: any) => {
            if (el.average) {
              data[el.minute] = el.average;

              return {
                time: el.minute,
                price: el.average.toFixed(2),
              };
            }
            return undefined;
          })
          .filter((el: any) => el !== undefined);

        rData = times.map((el: any) => {
          let price = data[el];

          if (
            price === undefined &&
            el < res.data[res.data.length - 1].minute
          ) {
            price = data['09:30'];
          }

          return {
            time: el,
            price: price,
          };
        });

        let openingPrice = res.data[0].open;

        let lastPrice = 0;

        if (res.data[res.data.length - 1].close) {
          lastPrice = res.data[res.data.length - 1].close;
        } else if (res.data[res.data.length - 1].average) {
          lastPrice = res.data[res.data.length - 1].average;
        } else {
          // The IEX API is quite unreliable so I have to find the
          // last valid quote given for the symbol
          for (let i = res.data.length - 2; i >= 0; i--) {
            if (res.data[i].average) {
              lastPrice = res.data[i].average;
              break;
            }
            if (res.data[i].close) {
              lastPrice = res.data[i].close;
              break;
            }
          }
        }

        let isGreen = lastPrice > openingPrice;

        let obj = {
          openingPrice,
          lastPrice,
          isGreen,
          data: rData,
          loading: false,
          changeInPrice: lastPrice - openingPrice,

          changePercentage: lastPrice / openingPrice || 0,
        };

        setTickers((prevState: any) => {
          return {
            ...prevState,
            [symbol]: obj,
          };
        });
      })
      .catch((err: any) => console.log(err));
  };

  return (
    <Context.Provider value={{ tickers, getTicker }}>
      {children}
    </Context.Provider>
  );
};

const useStockData = () => {
  const StockContext = useContext(Context);

  if (!StockContext) {
    throw new Error('Must be used in Stock Data Provider');
  }

  return StockContext;
};

export { StockDataProvider, useStockData };
