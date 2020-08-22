import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const Context = createContext<any>(null);

// API KEYS
const IEX_TOKEN = process.env.REACT_APP_IEX_API_KEY;
const RAPID_TOKEN = process.env.REACT_APP_RAPID_API_KEY;
const RAPID_API_HOST = 'apidojo-yahoo-finance-v1.p.rapidapi.com';

const StockProfileProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<any>({
    peers: [],
  });
  const [loading, setLoading] = useState(true);

  const manageChart = (stockData: any, historical?: boolean) => {
    const arr = stockData
      .map((el: any) => {
        if (historical) {
          return {
            time: el.date,
            price: el.close,
          };
        }
        if (el.average) {
          return {
            time: el.minute,
            price: el.average,
          };
        }
        return undefined;
      })
      .filter((el: any) => el !== undefined);

    let openingPrice = stockData[0].open;
    let lastPrice;

    if (stockData[stockData.length - 1].close) {
      lastPrice = stockData[stockData.length - 1].close;
    } else if (stockData[stockData.length - 1].average) {
      lastPrice = stockData[stockData.length - 1].average;
    } else {
      // The IEX API is quite unreliable so I have to find the
      // last valid quote given for the symbol
      for (let i = stockData.length - 2; i >= 0; i--) {
        if (stockData[i].average) {
          lastPrice = stockData[i].average;
          break;
        }
        if (stockData[i].close) {
          lastPrice = stockData[i].close;
          break;
        }
      }
    }
    let isGreen = lastPrice > openingPrice;
    let chartData = arr;
    let changeInPrice = (lastPrice - openingPrice).toFixed(2) || 0;
    let changePercentage = (lastPrice / openingPrice).toFixed(2) || 0;

    return {
      openingPrice,
      lastPrice,
      isGreen,
      chartData,
      changeInPrice,
      changePercentage,
    };
  };

  const fetchStockProfile = (symbol: string) => {
    setLoading(true);
    axios
      .all([
        axios.get(
          `https://cloud.iexapis.com/stable/stock/${symbol}/company?token=${IEX_TOKEN}`
        ),
        axios.get(
          `https://cloud.iexapis.com/stable/stock/${symbol}/intraday-prices?chartInterval=5&token=${IEX_TOKEN}`
        ),
        axios.get(
          `https://cloud.iexapis.com/stable/stock/${symbol}/news?token=${IEX_TOKEN}`
        ),
        axios.get(
          `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-financials?symbol=${symbol}`,
          {
            method: 'GET',
            headers: {
              'x-rapidapi-host': RAPID_API_HOST,
              'x-rapidapi-key': RAPID_TOKEN,
            },
          }
        ),
        axios.get(
          `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-analysis?symbol=${symbol}`,
          {
            method: 'GET',
            headers: {
              'x-rapidapi-host': RAPID_API_HOST,
              'x-rapidapi-key': RAPID_TOKEN,
            },
          }
        ),
      ])
      .then(
        axios.spread(
          (companyData, stockData, stockNews, financialData, ratingData) => {
            let sData = manageChart(stockData.data);
            setData({
              ...sData,
              company: companyData.data,
              news: stockNews.data,
              financial: financialData.data,
              ratings: ratingData.data,
              peers: [],
            });
            setLoading(false);
          }
        )
      )
      .catch((err) => {
        console.log(err);
      });

    setTimeout(() => {
      axios
        .get(
          'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-trending-tickers?region=US',
          {
            method: 'GET',
            headers: {
              'x-rapidapi-host': RAPID_API_HOST,
              'x-rapidapi-key': RAPID_TOKEN,
            },
          }
        )
        .then((res) => {
          if (
            res.data.finance.error === null &&
            res.data.finance.result[0] &&
            res.data.finance.result[0].count > 0
          ) {
            setData((prevData: any) => {
              return {
                ...prevData,
                peers: res.data.finance.result[0].quotes,
              };
            });
          }
        });
    }, 5000);
  };

  const filterChart = (symbol: string, range: string) => {
    axios
      .get(
        `https://cloud.iexapis.com/stable/stock/${symbol}/chart/${range}?token=${IEX_TOKEN}`
      )
      .then((res) => {
        let sData = manageChart(res.data, range !== '1d' ? true : false);
        setData((prevData: any) => ({
          ...prevData,
          ...sData,
        }));
      });
  };

  return (
    <Context.Provider value={{ fetchStockProfile, data, filterChart, loading }}>
      {children}
    </Context.Provider>
  );
};

const useStockProfile = () => {
  const ProfileContext = useContext(Context);

  if (!ProfileContext) {
    throw new Error('Must be used in StockProfile Provider');
  }

  return ProfileContext;
};

export { StockProfileProvider, useStockProfile };
