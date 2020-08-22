import React, { useState } from 'react';
import reactStringReplace from 'react-string-replace';
import axios from 'axios';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';
import { MdSearch } from 'react-icons/md';

const Search = (props: any) => {
  const theme: any = useTheme();
  const [tickers, setTickers] = useState<any>([]);
  const [text, setText] = useState('');

  async function searchCompanies(e: any) {
    let val = e.target.value;

    if (val.length === 0) {
      setText('');
      setTickers([]);
      return;
    }
    setText(e.target.value);

    let res = await axios.get(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${val}&apikey=${process.env.REACT_APP_ALPHA_API_KEY}`
    );

    if (res.data.bestMatches) {
      setTickers(res.data.bestMatches);
    }
  }

  const handleSearchSelect = (symbol: string, company: string) => {
    setText('');
    setTickers([]);
    props.handleSearch(symbol, company);
  };

  let companies = null;

  if (tickers.length > 0) {
    let items = tickers.map((el: any, index: number) => {
      const symbol = reactStringReplace(
        el['1. symbol'].toUpperCase(),
        text.toUpperCase(),
        (match, i) => <span style={{ color: '#0f9d58' }}>{match}</span>
      );

      const company = reactStringReplace(el['2. name'], text, (match, i) => (
        <span style={{ color: '#0f9d58' }}>{match}</span>
      ));

      return (
        <li
          onClick={() => handleSearchSelect(el['1. symbol'], el['2. name'])}
          className='search__item'
          key={index}
        >
          <span className='search__symbol'>{symbol}</span>
          <span className='search__name'>{company}</span>
        </li>
      );
    });

    companies = (
      <div className='search__modal-dropdown'>
        <ul
          className={
            'search__modal-list ' +
            css`
              background: ${theme.modalSearchContainer};
              color: ${theme.text};
            `
          }
        >
          {items}
        </ul>
      </div>
    );
  }

  return (
    <div
      className={
        'modal__searchContainer ' +
        css`
          background: ${theme.modalSearchContainer};
        `
      }
    >
      <form>
        <div className='modal__input-container'>
          <MdSearch className='modal__search-icon' />
          <input
            value={text}
            onChange={searchCompanies}
            className='modal__searchInput'
            placeholder='Search companies, tickers, and index funds'
            style={{ color: theme.text }}
          />
        </div>
      </form>
      {companies}
    </div>
  );
};

export default Search;
