import React from 'react';

import { useAddTickerContext } from '../../Provider/Modals/AddTicker';
import { useCreateListContext } from '../../Provider/Modals/CreateList';
import { useAddToListContext } from '../../Provider/Modals/AddToList';
import AddToList from '../Modals/AddToList';
import AddTicker from './AddTicker';
import CreateList from './CreateList';

const ModalRoot = () => {
  const { isOpen } = useAddToListContext();

  const { isOpen: isCreateOpen } = useCreateListContext();
  const { isOpen: isTickerOpen } = useAddTickerContext();
  return (
    <>
      <AddToList isOpen={isOpen} />
      <AddTicker isOpen={isTickerOpen} />
      <CreateList isOpen={isCreateOpen} />
    </>
  );
};

export default ModalRoot;
