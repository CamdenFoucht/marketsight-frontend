import React from 'react';
import {
  ScatterChart,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from 'recharts';

const EarningsChart = (props: any) => {
  let scatter1 = props.earnings.map((el: any, index: number) => {
    return {
      date: el.date,
      price: el.actual.raw,
    };
  });

  let scatter2 = props.earnings.map((el: any, index: number) => {
    return {
      date: el.date,
      price: el.estimate.raw,
    };
  });

  scatter2.push(props.currentQuarter);

  const color1 = props.isGreen ? '#0f9755' : '#cd4419';
  const color2 = props.isGreen ? '#0f97554d' : '#cd44194d';

  return (
    <ResponsiveContainer width={'100%'} height={250}>
      <ScatterChart margin={{ top: 0, left: -20, right: 0, bottom: 0 }}>
        <XAxis
          tickLine={false}
          dataKey='date'
          name='date'
          allowDuplicatedCategory={false}
          axisLine={false}
        />
        <YAxis
          width={40}
          dataKey='price'
          name='price'
          axisLine={false}
          tickLine={false}
        />
        <ZAxis dataKey='z' range={[200, 200]} name='price' />
        />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend wrapperStyle={{ bottom: 0 }} />
        <Scatter name='Actual' data={scatter1} fill={color1} />
        <Scatter name='Estimated' data={scatter2} fill={color2} />
      </ScatterChart>
    </ResponsiveContainer>
  );
};
export default EarningsChart;
