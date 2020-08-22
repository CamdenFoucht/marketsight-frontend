import React from 'react';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';
import { RiDeleteBin2Line } from 'react-icons/ri';

const Delete = (props: any) => {
  const theme: any = useTheme();
  return (
    <RiDeleteBin2Line
      onClick={props.onClick}
      className={
        'edit__mode-delete-icon ' +
        css`
          &:hover {
            background: ${theme.dropdownMoreHover};
          }
        `
      }
    />
  );
};

export default Delete;
