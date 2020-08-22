import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import { Col, Row } from 'react-flexbox-grid';
import TextTruncate from 'react-text-truncate';

import VerticalWatchlist from '../../components/VerticalWatchlist/VerticalWatchlist';
import { useWatchList } from '../../Provider/Watchlists/Watchlist';

import './index.css';

// `https://newsapi.org/v2/top-headlines?country=us&apiKey=d4831ba1de34465da1528055fada5304${query}`;

const News = () => {
  const theme: any = useTheme();
  const [articles, setArticles] = useState<any>([]);
  const { getTickers } = useWatchList();
  let tickers = getTickers();

  if (tickers.length === 0) {
    tickers = [
      'AAPL',
      'MSFT',
      'AMZN',
      'GOOG',
      'TSLA',
      'NFLX',
      'JPM',
      'WFC',
      'BOA',
      'SPY',
      'VOO',
    ];
  }

  const [category, setCategory] = useState(tickers[0]);

  useEffect(() => {
    fetchArticles(category);
  }, [category]);

  const categoryHandler = (category: string) => {
    setCategory(category);
  };

  const fetchArticles = async (category: any) => {
    try {
      if (category) {
        let res = await axios.get(
          `https://cloud.iexapis.com/stable/stock/${category}/news/last/10?token=pk_165dd99b870f42d4836f5794fa6a1917`
        );
        setArticles(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const categories = tickers.map((el: any) => {
    const active = category === el;
    return (
      <span
        className={
          'newslist__category ' +
          css`
            background: ${active ? theme.btnBackground : theme.category};
            color: ${active ? theme.btnText : theme.text};
          `
        }
        onClick={() => categoryHandler(el)}
      >
        {el}
      </span>
    );
  });

  const items = articles.map((el: any) => {
    return (
      <a
        href={el.url}
        className={
          'newspost ' +
          css`
            border-bottom: 1px solid ${theme.newsBorder};
            &:hover {
              background-color: ${theme.newsBackgroundHover};
            }
          `
        }
      >
        <div style={{ width: '100%', maxWidth: '300px', marginRight: '2rem' }}>
          <img
            alt={el.headline}
            style={{ marginRight: '2rem' }}
            className='newspost__img'
            src={el.image}
          />
        </div>
        <div
          className={
            'newspost__content ' +
            css`
              color: ${theme.text};
            `
          }
        >
          <span className='newspost__source'>{el.source}</span>
          <h4 className='newspost__headline'>{el.headline}</h4>
          <p
            className={
              'newspost__summary ' +
              css`
                color: ${theme.textLight};
              `
            }
          >
            <TextTruncate
              element='p'
              text={el.summary}
              truncateText='…'
              line={3}
            ></TextTruncate>
          </p>
        </div>
      </a>
    );
  });

  return (
    <div className='container'>
      <Row>
        <Col md={8}>
          <div>
            <div className='title-container'>
              <h3 className='title'>Latest News</h3>
            </div>
            <div className='flex-wrap mb-3'>{categories}</div>

            {items}
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

export default News;
