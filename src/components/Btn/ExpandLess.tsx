import React from 'react';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';
import { MdExpandLess } from 'react-icons/md';

const ExpandLess = (props: any) => {
  const theme: any = useTheme();
  return (
    <MdExpandLess
      onClick={props.onClick}
      className={
        'dropdown-more ' +
        css`
          &:hover {
            background: ${theme.dropdownMoreHover};
          }
        `
      }
    />
  );
};

export default ExpandLess;
