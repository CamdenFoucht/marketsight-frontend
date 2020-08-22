import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-flexbox-grid';

import { useAddToListContext } from '../../Provider/Modals/AddToList';
import { useStockProfile } from '../../Provider/StockData/StockProfile';
import StockProfileSkeleton from './StockProfileSkeleton';
import ProfileHeader from './ProfileHeader';
import DetailChart from '../Charts/DetailChart';
import About from './About';
import Earnings from './Earnings';
import StockPeers from './StockPeers';
import News from './News';
import Ratings from '../Charts/Ratings';
import VerticalWatchlist from '../VerticalWatchlist/VerticalWatchlist';
import VerticalSkeleton from '../VerticalWatchlist/VerticalSkeleton';

import './index.css';

const StockProfile = () => {
  let { ticker } = useParams();

  const { fetchStockProfile, data, filterChart, loading } = useStockProfile();

  useEffect(() => {
    fetchStockProfile(ticker);
  }, []);

  const { setOpen, setName, setTicker } = useAddToListContext();

  const addHandler = () => {
    if (data.company) {
      setOpen(true);
      setName(data.company.companyName);
      setTicker(data.company.symbol);
    }
  };

  let els = null;

  let stockPeers = <StockPeers peers={data.peers} />;

  if (
    data.company !== undefined &&
    data.news !== undefined &&
    data.financial !== undefined &&
    data.ratings !== undefined
  ) {
    els = (
      <div>
        <ProfileHeader
          addHandler={addHandler}
          lastPrice={data.lastPrice}
          isGreen={data.isGreen}
          changeInPrice={data.changeInPrice}
          changePercentage={data.changePercentage}
          company={data.company}
        />

        <DetailChart
          width={800}
          height={300}
          isGreen={data.isGreen}
          data={data.chartData}
          ticker={ticker}
          filterChart={filterChart}
        />

        <About company={data.company} financial={data.financial} />

        <Earnings financial={data.financial} isGreen={data.isGreen} />

        <div className='mb-3'>
          <h3 className='stock__profile-header'>Analyst Ratings</h3>
          <Ratings
            isGreen={data.isGreen}
            ratings={data.ratings.recommendationTrend.trend[0]}
          />
        </div>
        <div className='mb-3'>
          <h3 className='stock__profile-header'>News</h3>
          <News articles={data.news} />
        </div>
        <div>
          <h3 className='stock__profile-header'>Trending Stocks</h3>
          <Row>{stockPeers}</Row>
        </div>
      </div>
    );
  }

  return (
    <div className='container'>
      {loading ? (
        <Row>
          <Col xs={12} sm={12} md={8}>
            <StockProfileSkeleton />
          </Col>
          <Col mdOffset={1} md={3} xs={0} className='vertical__skeleton__col'>
            <VerticalSkeleton />
          </Col>
        </Row>
      ) : (
        <>
          <Row>
            <Col md={8}>{els}</Col>
            <Col xsOffset={1} md={3}>
              <div style={{ position: 'fixed' }}>
                <VerticalWatchlist />
              </div>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default StockProfile;
