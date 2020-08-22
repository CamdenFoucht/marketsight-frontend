import React, { createContext, useState, useContext } from 'react';

const Context = createContext<any>(null);

const CreateListProvider: React.FC = ({ children }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Context.Provider
      value={{
        isOpen,
        setOpen,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const useCreateListContext = () => {
  const AddToListContext = useContext(Context);

  if (!AddToListContext) {
    throw new Error('Must be used in Create List Provider');
  }

  return AddToListContext;
};

export { CreateListProvider, useCreateListContext };
