import React from 'react';
import { Col } from 'react-flexbox-grid';

const AboutItem = (props: any) => (
  <Col xs={3}>
    <div className='stock__about-item-container'>
      <span className='stock__about-item bold'>{props.title}</span>
      <span className='stock__about-item'>{props.desc}</span>
    </div>
  </Col>
);

export default AboutItem;
