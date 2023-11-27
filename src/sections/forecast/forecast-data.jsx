import PropTypes from 'prop-types';

import { Box, Card, CardHeader } from '@mui/material';

import Chart, { useChart } from 'src/components/chart';

export default function ForecastData({ title, subheader, chart, ...other }) {
  const { labels, colors, series, options, xaxisLabel, yaxisLabel} = chart;

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
        text: yaxisLabel,
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value) => {
          if (typeof value !== 'undefined') {
            if (chart.type === 'temperature') {
              return `${value.toFixed(0)} &deg;C`;
            }
            if (chart.type === 'humidity') {
              return `${value.toFixed(0)}%`;
            }
            if (chart.type === 'solar') {
              return `${value.toFixed(0)} W/m<sup>2</sup>`;
            }
            if (chart.type === 'rain') {
              return `${value.toFixed(0)} mm`;
            }
            return value;
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
        <Chart dir="ltr" type="line" series={series} options={chartOptions} width="100%" height={364} />
      </Box>
    </Card>
  );
}

ForecastData.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
  onChartTypeChange: PropTypes.func,
  activeButton: PropTypes.string,
};