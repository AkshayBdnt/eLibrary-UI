import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const chartSetting = {
  yAxis: [
    {
      label: 'Revenue (in ₹)',
    },
  ],
  width: 900,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};

const valueFormatter = (value) => `₹${value}`;

export default function Chart({ data }) {
  // Ensure that data exists and has items
  if (!data || data.length === 0) {
    return <p>No Data Available</p>;
  }

  return (
    <BarChart
      dataset={data}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        {
          dataKey: '2023',
          label: '2023',
          valueFormatter,
          color: '#c39bd3',  
        },
        {
          dataKey: '2024',
          label: '2024',
          valueFormatter,
          color: '#f4d03f',  
        },
      ]}
      {...chartSetting}
    />
  );
}
