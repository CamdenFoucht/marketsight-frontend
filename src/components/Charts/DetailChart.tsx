import React, { useState } from 'react';

import StockChart from './StockChart';

const DetailChart = (props: any) => {
  const [range, setRange] = useState('1d');

  let activeName = 'active-green';

  if (!props.isGreen) {
    activeName = 'active-red';
  }

  const rangeHandler = (num: any) => {
    setRange(num);
    if (num === '1w') {
      props.filterChart(props.ticker, '5dm');
    } else {
      props.filterChart(props.ticker, num);
    }
  };

  const arr = ['1d', '1w', '1m', '3m', '1y', '5y'].map((el: any) => {
    let activeClass = range === el ? activeName : '';
    return (
      <li
        className={'chart__item ' + activeClass}
        onClick={() => rangeHandler(el)}
      >
        {el}
      </li>
    );
  });

  return (
    <div className='mb-5'>
      <StockChart {...props} stroke={2} />
      <ul className='chart__list'>{arr}</ul>
    </div>
  );
};

export default DetailChart;
