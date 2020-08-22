import React from 'react';
import { css } from 'emotion';

const DangerBtn = (props: any) => {
  let fontSize = props.fontSize || '1.4rem';
  let padding = props.padding || '0.75rem 2rem';

  return (
    <button
      onClick={props.onClick}
      className={css`
        margin: ${props.margin};
        color: ${props.outline ? 'red' : '#fff'};
        cursor: pointer;
        font-size: ${fontSize};
        font-weight: bold;
        padding: ${padding};
        border-width: 1px;
        border-style: solid;
        border-color: red;
        border-image: initial;
        background: ${props.outline ? 'transparent' : 'red'};
        border-radius: 0px;
        text-transform: uppercase;
}
        `}
    >
      {props.children}
    </button>
  );
};

export default DangerBtn;
