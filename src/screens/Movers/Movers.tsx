import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';
import { Row, Col } from 'react-flexbox-grid';

import VerticalWatchlist from '../../components/VerticalWatchlist/VerticalWatchlist';

import './index.css';

const Movers = () => {
  const theme: any = useTheme();
  const [data, setData] = useState<any>({});
  const [gainers, setGainers] = useState<any>({});
  const [losers, setLosers] = useState<any>({});
  const [sectors, setSectors] = useState<any>([]);
  const [sector, setSector] = useState<any>({});

  let axiosHeaders: any = {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'schwab.p.rapidapi.com',
      'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
    },
  };

  const fetchMovers = async (cusip: string) => {
    axios
      .all([
        axios.get(urlHandler(cusip, 'MostActives'), axiosHeaders),
        axios.get(urlHandler(cusip, 'PctChgGainers'), axiosHeaders),
        axios.get(urlHandler(cusip, 'PctChgLosers'), axiosHeaders),
      ])
      .then(
        axios.spread((activeRes, gainerRes, loserRes) => {
          if (sectors.length === 0) {
            setSectors(activeRes.data.Sectors);
            setSector(activeRes.data.Sectors[0]);
          }
          setData(activeRes.data);
          setGainers(gainerRes.data);
          setLosers(loserRes.data);
        })
      );
  };

  useEffect(() => {
    fetchMovers('ALL');
  }, []);

  const MoverList = (ranking: string, companyMovers: any, type: string) => {
    const items = companyMovers.map((el: any) => {
      const className = el.PriceChange < 0 ? 'loser' : 'gainer';

      return (
        <div className={'mover__div ' + className} key={el.Symbol}>
          <span className={'mover__symbol ' + className}>({el.Symbol})</span>

          <span className={'mover__company ' + className}>
            {el.CompanyName}
          </span>

          <div>
            <span className={'mover__lastPrice ' + className}>
              {el.PriceLastFormatted}
            </span>
          </div>
          <div>
            <span className={'mover__change ' + className}>
              {el.PriceChangeFormatted}
            </span>
            <span className={'mover__percent ' + className}>
              {el.PriceChangePercentFormatted}
            </span>
          </div>
        </div>
      );
    });
    return (
      <div>
        <div className='canonical'>{ranking}</div>
        <div className='flex-wrap-row'>{items}</div>
      </div>
    );
  };

  let movers = null;
  let gainerItems = null;
  let loserItems = null;

  if (data.hasOwnProperty('CompanyMovers')) {
    movers = MoverList('Most Active', data.CompanyMovers, 'Most Active');
  }

  if (gainers.hasOwnProperty('CompanyMovers')) {
    gainerItems = MoverList(
      'Day Gainers',
      gainers.CompanyMovers,
      'Day Gainers'
    );
  }

  if (losers.hasOwnProperty('CompanyMovers')) {
    loserItems = MoverList('Day Losers', losers.CompanyMovers, 'Day Losers');
  }

  const categoryHandler = (category: any) => {
    setSector(category);
    fetchMovers(category.SectorCusip);
  };

  const categories = sectors.map((el: any) => {
    const activeClass = sector.SectorName === el.SectorName ? 'active' : '';
    return (
      <span
        className={
          'newslist__category ' +
          activeClass +
          ' ' +
          css`
            background: ${theme.category};
            color: ${theme.text};
          `
        }
        onClick={() => categoryHandler(el)}
      >
        {el.SectorName}
      </span>
    );
  });

  let urlHandler = (cusip: string, rank: string) =>
    `https://schwab.p.rapidapi.com/market/get-movers?sectorCusip=${cusip}&rankType=${rank}&exchange=US`;

  return (
    <div className='container'>
      <Row>
        <Col md={8}>
          <div>
            <div className='title-container'>
              <h3 className='title'>Market Movers</h3>
            </div>
            {categories}
            {movers}
            {gainerItems}
            {loserItems}
          </div>
        </Col>
        <Col xsOffset={1} md={3}>
          <div style={{ position: 'fixed' }}>
            <VerticalWatchlist />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Movers;
