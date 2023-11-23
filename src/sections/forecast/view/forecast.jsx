import moment from 'moment';
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import ForecastData from '../forecast-data';

// ----------------------------------------------------------------------

export default function ForecastView() {
  const currentDate = moment().format('dddd, MMMM DD, YYYY');
  const [chartType, setChartType] = useState('1week');
 
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

      <Box sx={{ mt: 3 }}>
      <Button
          onClick={() => handleChartTypeChange('1week')}
          sx={{
            ml: 'auto',
            width: 575,
            display: 'inline',
            backgroundColor: chartType === '1week' ? '#4caf50' : 'inherit',
            color: chartType === '1week' ? '#fff' : 'inherit',
          }}
        >
          1 Week
        </Button>
        <Button
          onClick={() => handleChartTypeChange('24hrs')}
          sx={{
            ml: 'auto',
            width: 575,
            display: 'inline',
            backgroundColor: chartType === '24hrs' ? '#4caf50' : 'inherit',
            color: chartType === '24hrs' ? '#fff' : 'inherit',
          }}
        >
          24 Hrs
        </Button>
      </Box>

      <Grid sx={{ mt: 4 }}>
        <Grid xs={12} md={8} lg={8}>
          {chartType === '24hrs' && (
            <ForecastData
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
              colors: ['#189AB4'],
              xaxisLabel: 'Hours',
              yaxisLabel: 'Temperature',
              }}
              onChartTypeChange={handleChartTypeChange}
              activeButton={chartType}
            />
          )}
        </Grid>
        <Grid xs={12} md={8} lg={8}>
          {chartType === '1week' && (
            <ForecastData
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
                colors: ['#189AB4'],
                xaxisLabel: 'Days',
                yaxisLabel: 'Temperature',
              }}
              onChartTypeChange={handleChartTypeChange}
              activeButton={chartType}
            />
          )}
        </Grid>
      </Grid>

      <Grid sx={{ mt: 6 }}>
        <Grid xs={12} md={8} lg={8}>
          {chartType === '24hrs' && (
            <ForecastData
              title="Humidity"
              subheader="Short-term Forecast"
              chart={{
                labels: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24'],
                series: [
                  {
                    type: 'line',
                    fill: 'solid',
                    data: [66, 74, 82, 65, 80, 75, 69, 82, 80, 76, 74, 72, 70],
                  },
                ],
              colors: ['#145DA0'],
              xaxisLabel: 'Hours',
              yaxisLabel: 'Relative Humidity',
              }}
              onChartTypeChange={handleChartTypeChange}
              activeButton={chartType}
            />
          )}
        </Grid>
        <Grid xs={12} md={8} lg={8}>
          {chartType === '1week' && (
            <ForecastData
              title="Humidity"
              subheader="Long-term Forecast"
              chart={{
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                series: [
                  {
                    type: 'line',
                    fill: 'solid',
                    data: [76, 75, 79, 74, 78, 75, 74],
                  },
                ],
                colors: ['#145DA0'],
                xaxisLabel: 'Days',
                yaxisLabel: 'Relative Humidity',
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
