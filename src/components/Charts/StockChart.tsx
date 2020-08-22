import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import './index.css';

const StockChart = (props: any) => {
  return (
    <ResponsiveContainer width='100%' height={props.height || '100%'}>
      <AreaChart
        data={props.data}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        {props.isGreen ? (
          <defs>
            <linearGradient id='colorGreen' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#0f9d58' stopOpacity={0.8} />
              <stop offset='100%' stopColor='#0f9d58' stopOpacity={0} />
            </linearGradient>
          </defs>
        ) : (
          <defs>
            <linearGradient id='colorRed' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#e64a19' stopOpacity={0.9} />
              <stop offset='95%' stopColor='#e64a19' stopOpacity={0.2} />
            </linearGradient>
          </defs>
        )}

        <XAxis dataKey='time' hide />
        <YAxis dataKey='price' domain={['dataMin - 1', 'dataMax + 1']} hide />
        <Tooltip
          wrapperStyle={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
          }}
          contentStyle={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
          }}
          cursor={false}
        />
        <Area
          connectNulls={true}
          isAnimationActive={!props.hideAnimation}
          animationDuration={500}
          type='monotone'
          dataKey='price'
          stroke={props.isGreen ? '#0f9d58' : '#e64a19'}
          // fill={props.isGreen ? '#0f9d58' : '#e64a19'}
          // fillOpacity={0.1}
          strokeWidth={props.stroke || 2}
          fill={
            props.hideGradient
              ? '#fff0'
              : props.isGreen
              ? 'url(#colorGreen)'
              : 'url(#colorRed)'
          }
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default StockChart;
