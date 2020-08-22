import React from 'react';

import Btn from '../Btn/Btn';

const ProfileHeader = (props: any) => (
  <>
    <div className='flex-start-row'>
      <h1 className='stock__name'>{props.company.companyName}</h1>
      <Btn onClick={props.addHandler} className='stock__save-btn'>
        Save Stock
      </Btn>
    </div>
    <h1 className='stock__price'>${props.lastPrice}</h1>
    <span
      className='stock__change'
      style={{ color: props.isGreen ? '#0f9d58' : '#e64a19' }}
    >
      ${props.changeInPrice} ({props.changePercentage}%)
    </span>
  </>
);

export default ProfileHeader;
