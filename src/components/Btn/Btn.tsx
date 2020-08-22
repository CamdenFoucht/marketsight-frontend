import React from 'react';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';

const Btn = (props: any) => {
  const theme: any = useTheme();

  let fontSize = props.fontSize || '1.4rem';
  let padding = props.padding || '0.75rem 2rem';

  return (
    <button
      onClick={props.onClick}
      className={css`
            margin-right: 1rem;
        color: ${props.outline ? theme.btnBackground : theme.btnText};
        cursor: pointer;
        font-size: ${fontSize};
        font-weight: bold;
        padding: ${padding};
        border-width: 1px;
        border-style: solid;
        border-color: ${theme.btnBackground};
        border-image: initial;
        background: ${props.outline ? 'transparent' : theme.btnBackground};
        border-radius: 0px;
}
        `}
    >
      {props.children}
    </button>
  );
};

export default Btn;
