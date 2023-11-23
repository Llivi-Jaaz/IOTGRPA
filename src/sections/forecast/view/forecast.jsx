import moment from 'moment';
import React, { useState } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import TempData from '../forecast-data';

// ----------------------------------------------------------------------

export default function ForecastView() {
  const currentDate = moment().format('dddd, MMMM DD, YYYY');
  const [chartType, setChartType] = useState('1week'); // Default chart type

  const handleChartTypeChange = (type) => {
    setChartType(type);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 0 }}>
        Forecast
      </Typography>
      <Typography variant="h7" sx={{ mb: 2 }}>
        Today is {currentDate}
      </Typography>

      <Grid sx={{ mt: 4 }}>
        <Grid xs={12} md={8} lg={8}>
          {chartType === '24hrs' && (
            <TempData
              title="Temperature"
              subheader="Short-term Forecast"
              chart={{
                labels: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24'],
                series: [
                  {
                    type: 'line',
                    fill: 'solid',
                    data: [27, 29, 28.5, 30, 31, 30, 31.4, 28.3, 29.8, 26, 27, 27.3, 26.5],
                  },
                ],
              xaxisLabel: 'Hours',
              }}
              onChartTypeChange={handleChartTypeChange}
              activeButton={chartType}
            />
          )}
        </Grid>
        <Grid xs={12} md={8} lg={8}>
          {chartType === '1week' && (
            <TempData
              title="Temperature"
              subheader="Long-term Forecast"
              chart={{
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                series: [
                  {
                    type: 'line',
                    fill: 'solid',
                    data: [28, 29.4, 28.5, 30, 29, 30, 28.4],
                  },
                ],
                xaxisLabel: 'Days',
              }}
              onChartTypeChange={handleChartTypeChange}
              activeButton={chartType}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
