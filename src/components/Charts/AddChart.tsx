import React from 'react';
import { MdAdd } from 'react-icons/md';

import { useAddTickerContext } from '../../Provider/Modals/AddTicker';

import './index.css';

const AddChart = () => {
  const { setOpen } = useAddTickerContext();

  return (
    <div className='add-chart' onClick={() => setOpen(true)}>
      <MdAdd className='add-icon' />
      <span className='add-text'>Add Company</span>
    </div>
  );
};

export default AddChart;
