import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ContentLoader from 'react-content-loader';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import { Row, Col } from 'react-flexbox-grid';

import { useStockData } from '../../Provider/StockData/StockData';
import WLChartDropdown from '../Dropdowns/WLChartDropdown';
import StockChart from './StockChart';
import ExpandMore from '../Btn/ExpandMore';
import ExpandLess from '../Btn/ExpandLess';

import './index.css';

const WatchlistRowChart = (props: any) => {
  const theme: any = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { getTicker, tickers } = useStockData();

  useEffect(() => {
    getTicker(props.ticker);
  }, []);

  const stock = tickers[props.ticker];

  return stock ? (
    <div
      className={
        'rowchart ' +
        css`
          border-bottom: ${theme.rowChartBorderBottom};
        `
      }
      style={{ position: 'relative', padding: '2rem 0' }}
    >
      <Link
        to={'/stocks/' + props.ticker}
        className={
          'stock-card ' +
          css`
            color: ${theme.text};
            text-decoration: none;
          `
        }
      >
        <Row>
          <Col xs={2} sm={1} className='row-column'>
            <span className='rowchart__ticker'>{props.ticker}</span>
          </Col>
          <Col xs={2} sm={2} className='row-column row-company-name'>
            <h3 className='rowchart__company'>{props.name}</h3>
          </Col>

          <Col xs={4} sm={4}>
            <StockChart
              data={stock.data}
              height={25}
              isGreen={stock.isGreen}
              hideGradient={true}
            />
          </Col>
          <Col xsOffset={1} xs={2} smOffset={1} sm={2} className='row-column'>
            <h3 className='rowchart__current-price mr-1'>
              {stock.lastPrice.toFixed(2)}
            </h3>
          </Col>
          <Col xs={2} sm={2} className='row-column'>
            <span
              className='rowchart__price-change'
              style={{ color: stock.isGreen ? '#0f9d58' : '#e64a19' }}
            >
              {stock.changeInPrice.toFixed(2)} (
              {stock.changePercentage.toFixed(2)}%)
            </span>
          </Col>
        </Row>
      </Link>
      <div className='chart__dropdown-container rowchart__dropdown-container'>
        {dropdownOpen ? (
          <ExpandLess onClick={() => setDropdownOpen(false)} />
        ) : (
          <ExpandMore onClick={() => setDropdownOpen(true)} />
        )}
        {dropdownOpen ? (
          <WLChartDropdown
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
        height={66}
      >
        <rect x='0' y='0' rx='2' ry='2' width='100%' height='66px' />
      </ContentLoader>
    </div>
  );
};

export default WatchlistRowChart;
