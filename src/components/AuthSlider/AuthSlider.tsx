import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './index.css';

class AuthSlider extends Component {
  render() {
    return (
      <Carousel
        showArrows={false}
        renderThumbs={undefined}
        showThumbs={false}
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
      >
        <div>
          <img
            src={require('../../assets/img/watchlist.PNG')}
            alt='Stock watchlists'
          />
          <h3 className='slider__h3'>Stock Watchlists</h3>
          <p className='slider__p'>
            Stay up to date with the latest quotes on your favorite companies.
          </p>
        </div>
        <div>
          <img src={require('../../assets/img/news.PNG')} alt='Stock news' />
          <h3 className='slider__h3'>Stock News</h3>
          <p className='slider__p'>
            Stay informed about the latest news to make sure you can keep up
            with the market.
          </p>
        </div>

        <div>
          <img
            src={require('../../assets/img/profile.PNG')}
            alt='Historical stock data'
          />
          <h3 className='slider__h3'>Stock Data</h3>
          <p className='slider__p'>
            View a companies historical chart, earnings, analyst ratings and
            more.
          </p>
        </div>
      </Carousel>
    );
  }
}

export default AuthSlider;
