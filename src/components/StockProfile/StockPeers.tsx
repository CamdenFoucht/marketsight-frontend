import React from 'react';
import { Col } from 'react-flexbox-grid';
import { useTheme } from 'emotion-theming';
import { css } from 'emotion';

const StockPeers = (props: any) => {
  const theme: any = useTheme();

  let peers = props.peers.map((el: any, index: number) => (
    <Col xs={2}>
      <div
        className={
          'stock__peer ' +
          css`
            background: ${theme.peerBackground};
            color: ${theme.text};
          `
        }
      >
        <div>{el.longName}</div>
        <div>{el.symbol}</div>
        <div>{el.regularMarketPrice}</div>
      </div>
    </Col>
  ));

  return peers;
};

export default StockPeers;
