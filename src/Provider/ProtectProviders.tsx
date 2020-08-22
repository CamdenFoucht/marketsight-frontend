import React from 'react';

import { AddToListProvider } from './Modals/AddToList';
import { AddTickerProvider } from './Modals/AddTicker';
import { CreateListProvider } from './Modals/CreateList';
import { StockDataProvider } from './StockData/StockData';
import { StockProfileProvider } from './StockData/StockProfile';
import { WatchlistProvider } from './Watchlists/Watchlist';

const ProtectedProviders = (props: any) => (
  <AddToListProvider>
    <AddTickerProvider>
      <CreateListProvider>
        <StockDataProvider>
          <WatchlistProvider>
            <StockProfileProvider>{props.children}</StockProfileProvider>
          </WatchlistProvider>
        </StockDataProvider>
      </CreateListProvider>
    </AddTickerProvider>
  </AddToListProvider>
);

export default ProtectedProviders;
