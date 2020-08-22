import React from 'react';
import Dropdown from 'react-dropdown';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';

import { useWatchList } from '../../Provider/Watchlists/Watchlist';

const ListSelectDropdown = (props: any) => {
  const theme: any = useTheme();

  const { lists, setActiveList, activeList } = useWatchList();

  let navItems = [];

  navItems = lists.map((el: any, index: number) => {
    return {
      label: el.title,
      value: index,
    };
  });

  const dropdownChangeHandler = (e: any) => {
    setActiveList(e.value);
  };

  return (
    <Dropdown
      onChange={(e) => dropdownChangeHandler(e)}
      controlClassName={css`
        background: ${theme.verticalBackground};
        border: none;
        border-bottom: ${theme.verticalBorder};
        border-radius: 0;
        color: ${theme.text};
        width: ${props.width};
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
  );
};

export default ListSelectDropdown;
