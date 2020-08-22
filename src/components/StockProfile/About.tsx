import React from 'react';
import { Row } from 'react-flexbox-grid';
import AboutItem from './AboutItem';

const About = (props: any) => (
  <div className='mb-3'>
    <h3 className='stock__profile-header'>About</h3>
    <p className='stock__description'>{props.company.description}</p>
    <Row>
      <AboutItem title='CEO' desc={props.company.CEO} />
      <AboutItem title='Employees' desc={props.company.employees} />
      <AboutItem
        title='Headquarters'
        desc={`${props.company.city}, ${props.company.state}`}
      />
      <AboutItem title='Industry' desc={props.company.industry} />
      <AboutItem title='Sector' desc={props.company.sector} />
      <AboutItem
        title='Dividend Rate'
        desc={props.financial.summaryDetail.dividendYield.fmt || ''}
      />
      <AboutItem
        title='Market Cap'
        desc={props.financial.summaryDetail.marketCap.fmt}
      />
      <AboutItem
        title='Average'
        desc={props.financial.summaryDetail.averageVolume.fmt}
      />
    </Row>
  </div>
);

export default About;
