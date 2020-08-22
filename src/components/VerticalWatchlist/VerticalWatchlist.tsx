import React from 'react';
import Dropdown from 'react-dropdown';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import { Col, Row } from 'react-flexbox-grid';

import { useWatchList } from '../../Provider/Watchlists/Watchlist';
import VerticalChart from './VerticalChart';

import 'react-dropdown/style.css';
import './index.css';

const VerticalWatchlist = () => {
  const theme: any = useTheme();

  const { lists, setActiveList, activeList } = useWatchList();

  let navItems = [];

  navItems = lists.map((el: any, index: number) => {
    return {
      label: el.title,
      value: index,
    };
  });

  let items = null;

  if (lists[activeList]) {
    items = lists[activeList].tickers.map((el: any, index: number) => (
      <Col xs={12} style={{ padding: 0 }}>
        <VerticalChart
          height={50}
          key={el.ticker}
          ticker={el.ticker}
          name={el.name}
        />
      </Col>
    ));
  }

  const dropdownChangeHandler = (e: any) => {
    setActiveList(e.value);
  };

  return (
    <div
      className={
        'vertical__wrapper ' +
        css`
          box-shadow: ${theme.verticalBoxShadow};
        `
      }
    >
      <div className='vertical__container'>
        <Dropdown
          onChange={(e) => dropdownChangeHandler(e)}
          controlClassName={css`
            background: ${theme.verticalBackground};
            border: none;
            border-bottom: ${theme.verticalBorder};
            border-radius: 0;
            color: ${theme.text};
          `}
          menuClassName={css`
            background: ${theme.verticalBackground};
            border: none;
            border-bottom: ${theme.verticalBorder};
            border-radius: 0;
            color: ${theme.text};
          `}
          options={navItems}
          placeholder='Select an option'
          value={navItems[activeList]}
        />
        {lists.length === 0 ? (
          <div className='vertical__watchlist__empty'>
            {' '}
            <img
              alt='Empty Watchlist'
              style={{ maxWidth: '100px', marginBottom: '3rem' }}
              src={theme.logo}
            />
            <p className='vertical__watchlist__empty-header'>
              You don't have any watchlists
            </p>
          </div>
        ) : (
          <Row style={{ margin: 0 }}>
            {items && items.length > 0 ? (
              items
            ) : (
              <div
                style={{
                  height: '200px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  width: '100%',
                  fontSize: '1.6rem',
                  fontWeight: 900,
                }}
              >
                You haven't added companies yet!
              </div>
            )}
          </Row>
        )}
      </div>
    </div>
  );
};

export default VerticalWatchlist;
