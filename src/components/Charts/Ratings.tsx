import React from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';

const Ratings = (props: any) => {
  const theme: any = useTheme();
  const color1 = props.isGreen ? '#0f9755' : '#ff5000';
  const color2 = props.isGreen ? '#163f2b' : '#ff500033';

  let { strongBuy, buy, hold, sell, strongSell } = props.ratings;

  let totalRatings = buy + hold + sell + strongBuy + strongSell;

  let strongBuyPercent = (strongBuy / totalRatings) * 100;
  let strongSellPercent = (strongSell / totalRatings) * 100;
  let buyPercent = (buy / totalRatings) * 100;
  let holdPercent = (hold / totalRatings) * 100;
  let sellPercent = (sell / totalRatings) * 100;

  function createBar(title: string, percent: any, color?: string) {
    return (
      <div
        className={
          'flex-row rating-row ' +
          css`
            color: ${color || theme.text};
          `
        }
      >
        <span className='ratingType'>{title}</span>
        <div
          className={
            'ratingBar ' +
            css`
              background: ${theme.ratingBar};
            `
          }
        >
          <span
            className={
              'ratingFilled ' +
              css`
                background: ${color || theme.ratingFilled};
              `
            }
            style={{ width: percent + '%' }}
          ></span>
          <span
            className={
              'ratingPercent ' +
              css`
                background: ${theme.ratingPercentBackground};
                color: ${theme.text};
                &:after {
                  background: ${theme.ratingGradient};
                }
              `
            }
            style={{ left: percent + '%' }}
          >
            {percent.toFixed(0)}%
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className='flex-row'>
      <div className='ratingCircle' style={{ background: color2 }}>
        <h6 className='ratingCircle-percentage' style={{ color: color1 }}>
          {(buyPercent + strongBuyPercent).toFixed(0)}%
        </h6>{' '}
        <span className='ratingCircle-text' style={{ color: color1 }}>
          of {totalRatings} ratings
        </span>
      </div>
      <div className='ratingContainer'>
        {createBar('Strong Buy', strongBuyPercent, color1)}

        {createBar('Buy', buyPercent, color1)}

        {createBar('Hold', holdPercent)}

        {createBar('Sell', sellPercent)}

        {createBar('Strong Sell', strongSellPercent)}
      </div>
    </div>
  );
};

export default Ratings;
