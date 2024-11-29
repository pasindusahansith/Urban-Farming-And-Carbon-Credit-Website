import * as React from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts';

const GaugeLeave = ({ settings }) => {
  return (
    <Gauge
      {...settings}
      cornerRadius="50%"
      sx={(theme) => ({
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 100,color: '#52b202',
        },
        [`& .${gaugeClasses.valueArc}`]: {
          fill: '#52b202',
        },
        [`& .${gaugeClasses.referenceArc}`]: {
          fill: theme.palette.text.disabled,
        },
      })}
    />
  );
};

export default GaugeLeave;
