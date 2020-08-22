import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-flexbox-grid';

import './index.css';

const Landing = () => {
  return (
    <div>
      <header className='landing__header'>
        <nav className='landing__nav'>
          <div className='landing__container flex-between-row'>
            <Link className='landing__brand' to='#'>
              <img
                alt='Market Sight'
                src={require('../../assets/img/landing-logo.png')}
                className='landing__logo'
              />
            </Link>
            <ul className='landing__list'>
              <li className='landing__item'>
                <Link className='landing__link' to='/login'>
                  Login
                </Link>
              </li>
              <li className='landing__item'>
                <Link className='landing__link-btn' to='/signup'>
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className='header__container'>
          <Row center='xs' start='sm' style={{ margin: '0 auto' }}>
            <Col xs={12} sm={6} className='mb-3 landing__img-col'>
              <div className='flex-column-center height-100 align-start'>
                <h1 className='landing__header-title'>
                  Stay up to date with your favorite companies
                </h1>
                <p className='landing__header-text'>
                  MarketSight, gives you a clean user interface with an easy way
                  to track your favorite stocks.
                </p>
                <Link to='/signup' className='landing__btn'>
                  Sign Up
                </Link>
              </div>
            </Col>
            <Col xs={12} sm={6} className='landing__header-img-col mb-3'>
              <div className='flex-center'>
                <img
                  alt='Market Data'
                  className='landing__header-img'
                  src={require('../../assets/img/list-2.PNG')}
                />
              </div>
            </Col>
          </Row>
        </div>
      </header>

      <section className='landing__section'>
        <div className='landing__container'>
          <Row center='xs' start='sm'>
            <Col smOffset={1} sm={5} xs={12} className='landing__img-col mb-3'>
              <div className='flex-center'>
                <img
                  alt='Stock watchlists'
                  className='landing__img'
                  src={require('../../assets/img/vertical-list-2.PNG')}
                />
              </div>
            </Col>
            <Col sm={5} smOffset={1} xs={12} className='mb-3'>
              <div className='flex-column-center height-100 landing__mini'>
                <h1 className='landing__heading'>Stock Watchlists</h1>
                <p className='landing__text'>
                  Create a varierty of watchlists, and customize your lists the
                  way you want. Stay up to date with your favorite stocks by
                  monitoring their prices. You'll always be able to view your
                  watchlists anywhere you navigate.
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </section>
      <section className='landing__section dark'>
        <div className='landing__container'>
          <Row center='xs' start='sm'>
            <Col smOffset={1} sm={5} xs={12} className='mb-3'>
              <div className='flex-column-center height-100 landing__mini'>
                <h1 className='landing__heading'>Trending News</h1>
                <p className='landing__text'>
                  View the latest market news to stay one step ahead of the
                  market movements. Filter your news out by category or view
                  news related to a specific stock.
                </p>
              </div>
            </Col>
            <Col sm={5} smOffset={1} xs={12} className='landing__img-col'>
              <div className='flex-center'>
                <img
                  alt='Stock News'
                  className='landing__img'
                  src={require('../../assets/img/news-light.PNG')}
                />
              </div>
            </Col>
          </Row>
        </div>
      </section>

      <section className='landing__section '>
        <div className='landing__container'>
          <Row center='xs' start='sm'>
            <Col smOffset={1} sm={5} xs={12} className='landing__img-col'>
              <div className='flex-center'>
                <img
                  id='market-data-img'
                  alt='Stock Historical Data'
                  className='landing__img'
                  src={require('../../assets/img/profile.PNG')}
                />
              </div>
            </Col>
            <Col sm={5} smOffset={1} xs={12} className='mb-3'>
              <div className='flex-column-center height-100 landing__mini'>
                <h1 className='landing__heading'>Market Data</h1>
                <p className='landing__text'>
                  Learn more about your favorite company with our beautiful and
                  informative user interface. View historical quotes, earnings,
                  analyst ratings, and more.
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </section>
      <footer className='landing__footer'>
        <img
          alt='Market Sight'
          src={require('../../assets/img/logo-light.png')}
          className='landing__footer-logo'
        />
        <p className='landing__footer-text'>
          MarketSight is a student made web experience to allow users to create
          beautiful trading lists so they can keep up with their stocks.
        </p>
        <p className='landing__footer-text'>
          Designed and developed by by Camden Foucht &copy; 2020
        </p>
        <p className='landing__footer-text'>
          Made with love <span className='green-heart'>❤</span>
        </p>
      </footer>
    </div>
  );
};

export default Landing;
