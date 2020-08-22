import React from 'react';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';
import {
  MdViewAgenda,
  MdViewModule,
  MdMoreVert,
  MdClose,
} from 'react-icons/md';

import WLDropdown from '../Dropdowns/WLDropdown';
import ListSelectDropdown from '../Dropdowns/ListSelectDropdown';

const Nav = (props: any) => {
  const theme: any = useTheme();

  const navItems = props.lists.map((el: any, index: number) => {
    let active = index === props.activeList;
    if (props.editMode) {
      return (
        <div style={{ display: 'flex', alignItems: 'center' }} key={index}>
          <MdClose
            onClick={() => props.deleteList(index)}
            style={{ marginRight: '0.25rem', cursor: 'pointer' }}
            color='red'
          />
          <li
            className={
              'tab__item ' +
              css`
                color: ${active
                  ? theme.watchlistNavActive
                  : theme.watchlistNav};
              `
            }
            onClick={() => props.tabHandler(index)}
          >
            {el.title}
          </li>
        </div>
      );
    }
    return (
      <li
        className={
          'tab__item ' +
          css`
            color: ${active ? theme.watchlistNavActive : theme.watchlistNav};
          `
        }
        onClick={() => props.tabHandler(index)}
      >
        {el.title}
      </li>
    );
  });

  return (
    <div
      className='flex-between-row align-center mb-3'
      style={{ position: 'relative', zIndex: 100 }}
    >
      <div className='listDropdownWrapper'>
        <ListSelectDropdown width='225px' />
      </div>
      <ul className='tab__list'>
        {navItems}
        <li className='tab__item'>
          <span onClick={() => props.openCreateListModal(true)}>
            {' '}
            + Add Tab
          </span>
        </li>
      </ul>

      {!props.isEmpty ? (
        <div className='watchlist__icon-row'>
          <span
            className='watchlist__icon'
            onClick={() => props.setIsGrid(false)}
          >
            <MdViewAgenda
              size='2rem'
              color={
                props.isGrid ? theme.watchlistNav : theme.watchlistNavActive
              }
            />
          </span>
          <span
            className='watchlist__icon'
            onClick={() => props.setIsGrid(true)}
          >
            <MdViewModule
              size='2.25rem'
              color={
                props.isGrid ? theme.watchlistNavActive : theme.watchlistNav
              }
            />
          </span>
          <span
            style={{
              paddingRight: '1.5rem',
              cursor: 'pointer',
            }}
          >
            {!props.dropdownOpen ? (
              <MdMoreVert
                size='2rem'
                color={theme.watchlistNav}
                onClick={() => props.setDropdownOpen(!props.dropdownOpen)}
              />
            ) : (
              <MdClose
                size='2rem'
                color={theme.watchlistNav}
                onClick={() => props.setDropdownOpen(!props.dropdownOpen)}
              />
            )}
            {props.dropdownOpen ? (
              <WLDropdown
                setEditMode={props.setEditMode}
                editMode={props.editMode}
                setDropdownOpen={props.setDropdownOpen}
                deleteHandler={props.deleteHandler}
              />
            ) : null}
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default Nav;
