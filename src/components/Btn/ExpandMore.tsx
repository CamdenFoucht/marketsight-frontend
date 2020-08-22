import React from 'react';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';
import { MdExpandMore } from 'react-icons/md';

const ExpandMore = (props: any) => {
  const theme: any = useTheme();
  return (
    <MdExpandMore
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

export default ExpandMore;
