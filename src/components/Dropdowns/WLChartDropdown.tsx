import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';
import { MdDelete, MdSave } from 'react-icons/md';

const WLChartDropdown = (props: any) => {
  const theme: any = useTheme();

  return (
    <OutsideClickHandler onOutsideClick={() => props.setDropdownOpen(false)}>
      <div
        className={
          `chart__dropdown ${props.dropdownOpen ? 'active ' : ''}` +
          css`
            background: ${theme.dropdownBackground};
            box-shadow: 2px 4px 6px ${theme.dropdownItemHover};
          `
        }
      >
        <ul>
          <li
            onClick={props.saveToLists}
            className={css`
              border-bottom: 1px solid ${theme.dropdownBorderBottom};
              &:hover {
                background: ${theme.dropdownItemHover};
              }
            `}
          >
            <MdSave className='chart__dropdown-icon' size='1.2rem' />
            Manage Save
          </li>
          <li
            className={css`
              &:hover {
                background: ${theme.dropdownItemHover};
              }
            `}
            onClick={props.deleteTicker}
          >
            <MdDelete className='chart__dropdown-icon' size='1.2rem' />
            Delete
          </li>
        </ul>
      </div>
    </OutsideClickHandler>
  );
};

export default WLChartDropdown;
