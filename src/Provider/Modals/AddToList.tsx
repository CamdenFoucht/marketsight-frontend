import React, { createContext, useState, useContext } from 'react';

const Context = createContext<any>(null);

const AddToListProvider: React.FC = ({ children }) => {
  const [isOpen, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [ticker, setTicker] = useState('');

  const openAddToListModal = (ticker: string, name: string) => {
    setOpen(true);
    setName(name);
    setTicker(ticker);
  };

  return (
    <Context.Provider
      value={{
        isOpen,
        setOpen,
        ticker,
        name,
        setName,
        setTicker,
        openAddToListModal,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const useAddToListContext = () => {
  const AddToListContext = useContext(Context);

  if (!AddToListContext) {
    throw new Error('Must be used in Add To List Provider');
  }

  return AddToListContext;
};

export { AddToListProvider, useAddToListContext };
