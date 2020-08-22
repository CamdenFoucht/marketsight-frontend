import React, { createContext, useState, useContext } from 'react';

const Context = createContext<any>(null);

const AddTickerProvider: React.FC = ({ children }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Context.Provider value={{ isOpen, setOpen }}>{children}</Context.Provider>
  );
};

const useAddTickerContext = () => {
  const AddTickerContext = useContext(Context);

  if (!AddTickerContext) {
    throw new Error('Must be used in Add Ticker Provider');
  }

  return AddTickerContext;
};

export { AddTickerProvider, useAddTickerContext };
