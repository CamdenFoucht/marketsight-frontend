import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import { Col, Row } from 'react-flexbox-grid';
import ContentLoader from 'react-content-loader';

import { useStockData } from '../../Provider/StockData/StockData';
import StockChart from '../Charts/StockChart';

import './index.css';

const VerticalChart = (props: any) => {
  const theme: any = useTheme();

  const { getTicker, tickers } = useStockData();

  useEffect(() => {
    getTicker(props.ticker);
  }, []);

  const stock = tickers[props.ticker];

  return stock ? (
    <Link
      to={'/stocks/' + props.ticker}
      className={
        'vertical__card ' +
        css`
          background: ${theme.chartBackground};
          color: ${theme.text};
          &:hover {
            background: ${theme.chartBackgroundHover};
          }
        `
      }
    >
      <Row center='xs' style={{ margin: 0 }}>
        <Col xs={3} style={{ padding: 0 }}>
          <div className='vertical__col'>
            <span className='vertical__ticker'>{props.ticker}</span>
          </div>
        </Col>
        <Col xs={5} style={{ padding: 0 }}>
          <StockChart
            data={stock.data}
            height={25}
            isGreen={stock.isGreen}
            hideGradient={true}
          />
        </Col>
        <Col xs={4} style={{ padding: 0 }}>
          <div className='vertical__price-col'>
            <h3 className='vertical__current-price'>
              {stock.lastPrice.toFixed(2)} USD
            </h3>
            <span style={{ color: stock.isGreen ? '#0f9d58' : '#e64a19' }}>
              {stock.changeInPrice.toFixed(2)} (
              {stock.changePercentage.toFixed(2)}%)
            </span>{' '}
          </div>
        </Col>
      </Row>
    </Link>
  ) : (
    <ContentLoader
      speed={2}
      width={300}
      height={66}
      backgroundColor={theme.skeletonBackground}
      foregroundColor={theme.skeletonForeground}
      {...props}
    >
      <rect x='0' y='0' width='100%' height='66' />
    </ContentLoader>
  );
};

export default VerticalChart;
