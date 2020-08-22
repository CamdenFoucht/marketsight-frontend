import React from 'react';
import EarningsChart from '../Charts/EarningsChart';

const Earnings = (props: any) => (
  <div className='mb-3'>
    <h3 className='stock__profile-header'>Earnings</h3>
    <EarningsChart
      isGreen={props.isGreen}
      earnings={props.financial.earnings.earningsChart.quarterly}
      currentQuarter={{
        price:
          props.financial.earnings.earningsChart.currentQuarterEstimate.raw,
        date:
          props.financial.earnings.earningsChart.currentQuarterEstimateDate +
          props.financial.earnings.earningsChart.currentQuarterEstimateYear,
      }}
    />
  </div>
);

export default Earnings;
