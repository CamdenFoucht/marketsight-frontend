import React, { useState } from 'react';
import axios from 'axios';
import OutsideClickHandler from 'react-outside-click-handler';
import reactStringReplace from 'react-string-replace';
import { useHistory } from 'react-router-dom';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import { MdSearch } from 'react-icons/md';

const Search = (props: any) => {
  const theme: any = useTheme();
  const history = useHistory();
  const [tickers, setTickers] = useState<any>([]);
  const [text, setText] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  async function searchCompanies(e: any) {
    let val = e.target.value;

    if (val.length === 0) {
      setTickers([]);
      setText('');
      setDropdownOpen(false);
      return;
    }

    setDropdownOpen(true);

    setText(e.target.value);

    let res = await axios.get(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${val}&apikey=${process.env.REACT_APP_ALPHA_API_KEY}`
    );

    if (res.data.bestMatches) {
      setTickers(res.data.bestMatches);
    }
  }

  const handleSearchSelect = (symbol: string) => {
    history.push(`/stocks/${symbol}`);

    setText('');
    setTickers([]);
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
          onClick={() => handleSearchSelect(el['1. symbol'])}
          className={
            'search__item ' +
            css`
              &:hover {
                background: ${theme.dropdownItemHover};
              }
            `
          }
          key={index}
        >
          <span className='search__symbol'>{symbol}</span>
          <span className='search__name'>{company}</span>
        </li>
      );
    });

    companies = (
      <OutsideClickHandler onOutsideClick={() => setDropdownOpen(false)}>
        <div className='search-dropdown'>
          <ul
            className={
              'search__list ' +
              css`
                background: ${theme.chartBackground};
              `
            }
          >
            {items}
          </ul>
        </div>
      </OutsideClickHandler>
    );
  }

  return (
    <div className='searchWrapper'>
      <div
        className={'searchContainer ' + css``}
        style={{ position: 'absolute', background: theme.chartBackground }}
      >
        <form>
          <div className='input-container'>
            <MdSearch className='search-icon' color={theme.searchIcon} />
            <input
              value={text}
              onChange={searchCompanies}
              className='searchInput'
              style={{ color: theme.searchIcon }}
              placeholder='Search companies, tickers, and index funds'
            />
          </div>
        </form>
        {dropdownOpen ? companies : null}
      </div>
    </div>
  );
};

export default Search;
