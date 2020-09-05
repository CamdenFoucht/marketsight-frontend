import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import ContentLoader from 'react-content-loader';

import { useStockData } from '../../Provider/StockData/StockData';
import StockChart from './StockChart';
import WLChartDropdown from '../Dropdowns/WLChartDropdown';
import ExpandLess from '../Btn/ExpandLess';
import ExpandMore from '../Btn/ExpandMore';
import Delete from '../Btn/Delete';

import './index.css';

const WatchlistChart = (props: any) => {
  const theme: any = useTheme();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { getTicker, tickers } = useStockData();

  useEffect(() => {
    getTicker(props.ticker);
  }, []);

  const stock = tickers[props.ticker];

  return stock ? (
    <div style={{ position: 'relative' }}>
      <Link
        to={'/stocks/' + props.ticker}
        className={
          'stock-card ' +
          css`
            background: ${theme.chartBackground};
            color: ${theme.text};
          `
        }
      >
        <div className='stock-info'>
          <div className='flex-between-row mb-1'>
            <div className='flex-row width-80 pr-2'>
              <h3 className='company'>{props.name}</h3>

              <span className='ticker' style={{ marginBottom: '1px' }}>
                ({props.ticker})
              </span>
            </div>
          </div>
          <div className='flex-bottom-row mb-1'>
            <h3 className='current-price mr-1'>
              {stock.lastPrice.toFixed(2)} USD
            </h3>
            <span
              style={{
                color: stock.isGreen ? '#0f9d58' : '#e64a19',
                marginBottom: '2px',
              }}
            >
              {stock.changeInPrice.toFixed(2)} (
              {stock.changePercentage.toFixed(2)}%)
            </span>
          </div>
        </div>

        <StockChart
          data={stock.data}
          width={275}
          height={props.height || 125}
          isGreen={stock.isGreen}
          stroke={2}
          hideAnimation
        />
      </Link>
      <div className='chart__dropdown-container'>
        {props.editMode ? (
          <Delete onClick={props.deleteTicker} />
        ) : dropdownOpen ? (
          <ExpandLess onClick={() => setDropdownOpen(!dropdownOpen)} />
        ) : (
          <ExpandMore onClick={() => setDropdownOpen(!dropdownOpen)} />
        )}
        {dropdownOpen ? (
          <WLChartDropdown
            editMode={props.editMode}
            setDropdownOpen={setDropdownOpen}
            dropdownOpen={dropdownOpen}
            deleteTicker={props.deleteTicker}
            saveToLists={props.saveToLists}
          />
        ) : null}
      </div>
    </div>
  ) : (
    <div>
      <ContentLoader
        speed={2}
        backgroundColor={theme.skeletonBackground}
        foregroundColor={theme.skeletonForeground}
        {...props}
        height={183}
      >
        <rect x='0' y='0' rx='2' ry='2' width='100%' height='183px' />
      </ContentLoader>
    </div>
  );
};

export default WatchlistChart;
