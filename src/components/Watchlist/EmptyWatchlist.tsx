import React from 'react';
import { useTheme } from 'emotion-theming';

const EmptyWatchlist = (props: any) => {
  const theme: any = useTheme();
  return (
    <div className='watchlist__empty'>
      {' '}
      <img
        alt='Empty Watchlist'
        style={{ maxWidth: '200px', marginBottom: '3rem' }}
        src={theme.logo}
      />
      <p className='watchlist__empty-header'>You don't have any watchlists</p>
      <p className='watchlist__empty-text' style={{ color: theme.textLight }}>
        This is where you'll create lists and managed your followed stocks
      </p>
      <p className='watchlist__empty-create' onClick={props.onClick}>
        Create watchlist
      </p>
    </div>
  );
};

export default EmptyWatchlist;
