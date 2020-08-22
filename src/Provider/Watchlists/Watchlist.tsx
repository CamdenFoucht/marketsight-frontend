import React, { createContext, useState, useContext, useEffect } from 'react';
import Axios from 'axios';

import { useAuth } from '../Auth';

const API_URL = 'https://marketwatchserver.herokuapp.com/';

const Context = createContext<any>(null);

const WatchlistProvider: React.FC = ({ children }) => {
  const { token } = useAuth();

  const [lists, setLists] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchWatchlists = async () => {
    try {
      setLoading(true);
      let res = await Axios.get(`${API_URL}api/market/marketList`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      if (res.data.lists) {
        setLists(res.data.lists);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchWatchlists();
  }, []);

  const [activeList, setActiveList] = useState(0);

  const removeCompany = (listIndex: string, ticker: string) => {
    let items = [...lists[activeList].tickers];
    let index = items.findIndex((el: any) => el.ticker === ticker);

    if (index >= 0) {
      items.splice(index, 1);
    }

    const arr = [...lists];
    arr[activeList].tickers = items;

    setLists(arr);

    Axios.delete(
      `${API_URL}api/market/ticker/` + ticker + '/listIndex/' + listIndex,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
  };

  const addCompany = (ticker: string, company: string) => {
    try {
      let items: any[] = [...lists[activeList].tickers];
      if (!items.some((el: any) => el.ticker === ticker)) {
        items.push({ ticker, name: company });
        let arr = [...lists];
        arr[activeList].tickers = items;
        setLists(arr);

        Axios.post(`${API_URL}api/market/ticker`, {
          ticker,
          name: company,
          token,
          listTitle: lists[activeList].title,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addList = async (name: string) => {
    try {
      setLists([...lists, { title: name, tickers: [] }]);
      await Axios.post(`${API_URL}api/market/marketList`, {
        token,
        listTitle: name,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const addTickerToMultiple = (
    ticker: string,
    company: string,
    indexs: number[]
  ) => {
    let arr = [...lists];

    for (let index of indexs) {
      let items = [...arr[index].tickers];
      if (!items.some((element) => element.ticker === ticker)) {
        items.push({ ticker, name: company });
      }
      arr[index].tickers = items;
    }

    setLists(arr);
  };

  const deleteList = async (index: number) => {
    let items = [...lists];
    items.splice(index, 1);
    setLists(items);
    setActiveList(0);
  };

  const getTickers = () => {
    let set = new Set();
    for (let i = 0; i < lists.length; i++) {
      for (let j = 0; j < lists[i].tickers.length; j++) {
        set.add(lists[i].tickers[j].ticker);
      }
    }
    return Array.from(set);
  };

  return (
    <Context.Provider
      value={{
        lists,
        addCompany,
        removeCompany,
        addList,
        setActiveList,
        activeList,
        addTickerToMultiple,
        deleteList,
        loading,
        getTickers,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const useWatchList = () => {
  const WatchListContext = useContext(Context);

  if (!WatchListContext) {
    throw new Error('Must be used in Watchlist Provider');
  }

  return WatchListContext;
};

export { WatchlistProvider, useWatchList };
