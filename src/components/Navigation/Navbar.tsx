import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import Switch from 'react-switch';
import { IoMdMoon } from 'react-icons/io';

import { useAuth } from '../../Provider/Auth';
import Search from './Search';

import './index.css';

const Navbar = (props: any) => {
  const theme: any = useTheme();
  const { logout, username } = useAuth();

  const handleChange = () => {
    props.setIsDark(!props.isDark);
  };

  return (
    <nav
      className={
        'navbar ' +
        css`
          background-color: ${theme.background};
          color: ${theme.text};
        `
      }
    >
      <div className='container flex-between-row'>
        <div className='flex-row'>
          <Link to='/watchlist'>
            <img src={theme.logo} className='logo' alt='stock watcher' />
          </Link>
        </div>
        <Search />
        <ul className='flex-row'>
          <li className='navbar__item'>
            <NavLink
              className={
                'navbar__link ' +
                css`
                  color: ${theme.text};
                  &:hover {
                    color: ${theme.primaryColor};
                  }
                `
              }
              to='/watchlist'
              activeStyle={{ color: theme.primaryColor }}
            >
              Watchlist
            </NavLink>
          </li>
          <li className='navbar__item'>
            <NavLink
              activeStyle={{ color: theme.primaryColor }}
              className={
                'navbar__link ' +
                css`
                  color: ${theme.text};
                  &:active {
                    transform: scaleX(1);
                  }
                  &:hover {
                    color: ${theme.primaryColor};
                  }
                `
              }
              to='/movers'
            >
              Movers
            </NavLink>
          </li>
          <li className='navbar__item'>
            <NavLink
              activeStyle={{ color: theme.primaryColor }}
              to='/news'
              className={
                'navbar__link ' +
                css`
                  color: ${theme.text};
                  &:hover {
                    color: ${theme.primaryColor};
                  }
                `
              }
            >
              News
            </NavLink>
          </li>
          <li className='navbar__item navbar__dropdown-wrapper'>
            <span
              className={
                'nav-circle ' +
                css`
                  background: ${theme.primaryColor};
                  color: ${theme.primaryText};
                `
              }
            >
              {username[0]}
            </span>
            <div
              className={
                'navbar__dropdown ' +
                css`
                  background: ${theme.navbarDropdownBackground};
                  box-shadow: 0 2px 4px -8px ${theme.navbarDropdownShadow};
                  box-shadow: ${theme.dropdownShadow};
                `
              }
            >
              <ul>
                <li>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '1rem' }}>
                      <IoMdMoon size='2rem' color={theme.text} />
                    </span>
                    <Switch
                      onColor={'#0f9d58'}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      checked={props.isDark}
                      onChange={handleChange}
                      height={15}
                      width={30}
                    />
                  </div>
                </li>

                <li>
                  <Link
                    className={
                      'dropdown__link ' +
                      css`
                        color: ${theme.text};
                        text-decoration: none;
                      `
                    }
                    to='/account'
                  >
                    Account
                  </Link>
                </li>

                <li onClick={logout}>Logout</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
