import PropTypes from 'prop-types';

import { Box, Card, Button, CardHeader } from '@mui/material';

import Chart, { useChart } from 'src/components/chart';

export default function HumiData({ title, subheader, chart, onChartTypeChange, activeButton, ...other }) {
  const { labels, colors, series, options, xaxisLabel } = chart;

  const chartOptions = useChart({
    colors,
    plotOptions: {
      bar: {
        columnWidth: '16%',
      },
    },
    fill: {
      type: series.map((i) => i.fill),
    },
    labels,
    xaxis: {
      type: 'time',
      title: {
        text: xaxisLabel,
      },
    },
    yaxis: {
      title: {
        text: 'Temperature',
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value) => {
          if (typeof value !== 'undefined') {
            return `${value.toFixed(0)} &deg;C`;
          }
          return value;
        },
      },
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }}>
        <Button
          onClick={() => onChartTypeChange('1week')}
          sx={{
            ml: 120,
            display: 'inline',
            backgroundColor: activeButton === '1week' ? '#4caf50' : 'inherit',
            color: activeButton === '1week' ? '#fff' : 'inherit',
          }}
        >
          1 Week
        </Button>
        <Button
          onClick={() => onChartTypeChange('24hrs')}
          sx={{
            ml: 'auto',
            display: 'inline',
            backgroundColor: activeButton === '24hrs' ? '#4caf50' : 'inherit',
            color: activeButton === '24hrs' ? '#fff' : 'inherit',
          }}
        >
          24 Hrs
        </Button>
        <Chart dir="ltr" type="line" series={series} options={chartOptions} width="100%" height={364} />
      </Box>
    </Card>
  );
}

TempData.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
  onChartTypeChange: PropTypes.func,
  activeButton: PropTypes.func,
};