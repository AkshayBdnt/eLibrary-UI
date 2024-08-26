import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
// import { dataset } from '../dataset/weather';

const dataset = [
    {
      2022: 59,
      2023: 57,
    //   newYork: 86,
    //   seoul: 21,
      month: 'Jan',
    },
    {
      2022: 50,
      2023: 52,
    //   newYork: 78,
    //   seoul: 28,
      month: 'Feb',
    },
    {
      2022: 47,
      2023: 53,
    //   newYork: 106,
    //   seoul: 41,
      month: 'Mar',
    },
    {
      2022: 54,
      2023: 56,
    //   newYork: 92,
    //   seoul: 73,
      month: 'Apr',
    },
    {
      2022: 57,
      2023: 69,
    //   newYork: 92,
    //   seoul: 99,
      month: 'May',
    },
    {
      2022: 60,
      2023: 63,
    //   newYork: 103,
    //   seoul: 144,
      month: 'June',
    },
    {
      2022: 59,
      2023: 60,
    //   newYork: 105,
    //   seoul: 319,
      month: 'July',
    },
    {
      2022: 65,
      2023: 60,
    //   newYork: 106,
    //   seoul: 249,
      month: 'Aug',
    },
    {
      2022: 51,
      2023: 51,
    //   newYork: 95,
    //   seoul: 131,
      month: 'Sept',
    },
    {
      2022: 60,
      2023: 65,
    //   newYork: 97,
    //   seoul: 55,
      month: 'Oct',
    },
    {
      2022: 67,
      2023: 64,
    //   newYork: 76,
    //   seoul: 48,
      month: 'Nov',
    },
    {
      2022: 61,
      2023: 70,
    //   newYork: 103,
    //   seoul: 25,
      month: 'Dec',
    },
  ];
  

const chartSetting = {
  yAxis: [
    {
      label: 'rainfall (mm)',
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

const valueFormatter = (value) => `${value}$`;

export default function Chart() {
  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: '2022', label: '2022', valueFormatter, color: '#c39bd3'  },
        { dataKey: '2023', label: '2023', valueFormatter, color: '#f4d03f '  },
        // { dataKey: 'newYork', label: 'New York', valueFormatter },
        // { dataKey: 'seoul', label: 'Seoul', valueFormatter },
      ]}
      {...chartSetting}
    />
  );
}
