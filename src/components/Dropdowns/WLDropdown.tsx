import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';

const WLDropdown = (props: any) => {
  const theme: any = useTheme();

  return (
    <OutsideClickHandler onOutsideClick={() => props.setDropdownOpen(false)}>
      <div
        onClick={() => props.setDropdownOpen(false)}
        className={
          'watchlist__dropdown ' +
          css`
            background: ${theme.dropdownBackground};
            box-shadow: ${theme.dropdownShadow};
          `
        }
      >
        <ul className='watchlist__dropdown-list'>
          <li
            onClick={() => props.setEditMode((prev: boolean) => !prev)}
            className={
              'watchlist__dropdown-item ' +
              css`
                      border-bottom: border-bottom: 1px solid ${theme.dropdownBorderBottom};
                    `
            }
          >
            {props.editMode ? 'Stop Editing' : 'Edit Mode'}
          </li>
          <li
            className='watchlist__dropdown-item'
            onClick={props.deleteHandler}
          >
            Delete Current Tab
          </li>
        </ul>
      </div>
    </OutsideClickHandler>
  );
};

export default WLDropdown;
