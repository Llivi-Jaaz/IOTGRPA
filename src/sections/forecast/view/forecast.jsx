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
            width: 572,
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
            ml: 1,
            width: 572,
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
                type: 'temperature',
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
                type: 'temperature',
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
                type: 'humidity',
                labels: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24'],
                series: [
                  {
                    type: 'line',
                    fill: 'solid',
                    data: [66, 74, 82, 65, 80, 75, 69, 82, 80, 76, 74, 72, 70],
                  },
                ],
              colors: ['#3F704D'],
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
                type: 'humidity',
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                series: [
                  {
                    type: 'line',
                    fill: 'solid',
                    data: [76, 75, 79, 74, 78, 75, 74],
                  },
                ],
                colors: ['#3F704D'],
                xaxisLabel: 'Days',
                yaxisLabel: 'Relative Humidity',
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
              title="Rainfall"
              subheader="Short-term Forecast"
              chart={{
                type: 'rain',
                labels: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24'],
                series: [
                  {
                    type: 'line',
                    fill: 'solid',
                    data: [3.4, 2.3, 2.5, 3.6, 4.5, 3.2, 3.8, 4.7, 4.9, 4.3, 3.9, 3.4, 3.1],
                  },
                ],
              colors: ['#145DA0'],
              xaxisLabel: 'Hours',
              yaxisLabel: 'Precipitation',
              }}
              onChartTypeChange={handleChartTypeChange}
              activeButton={chartType}
            />
          )}
        </Grid>
        <Grid xs={12} md={8} lg={8}>
          {chartType === '1week' && (
            <ForecastData
              title="Rainfall"
              subheader="Long-term Forecast"
              chart={{
                type: 'rain',
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                series: [
                  {
                    type: 'line',
                    fill: 'solid',
                    data: [4, 7, 6 , 8, 10, 14, 16],
                  },
                ],
                colors: ['#145DA0'],
                xaxisLabel: 'Days',
                yaxisLabel: 'Precipitation',
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
              title="Solar Radiation"
              subheader="Short-term Forecast"
              chart={{
                type: 'solar',
                labels: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24'],
                series: [
                  {
                    type: 'line',
                    fill: 'solid',
                    data: [140, 158, 189, 153, 200, 164, 194, 175, 184, 200, 156, 149, 128],
                  },
                ],
              colors: ['#F9E076'],
              xaxisLabel: 'Hours',
              yaxisLabel: 'Solar Irradiance',
              }}
              onChartTypeChange={handleChartTypeChange}
              activeButton={chartType}
            />
          )}
        </Grid>
        <Grid xs={12} md={8} lg={8}>
          {chartType === '1week' && (
            <ForecastData
              title="Solar Radiation"
              subheader="Long-term Forecast"
              chart={{
                type: 'solar',
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                series: [
                  {
                    type: 'line',
                    fill: 'solid',
                    data: [156, 164, 159 , 172, 178, 169, 161],
                  },
                ],
                colors: ['#F9E076'],
                xaxisLabel: 'Days',
                yaxisLabel: 'Solar Irradiance',
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
              title="Wind Speed"
              subheader="Short-term Forecast"
              chart={{
                type: 'wspeed',
                labels: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24'],
                series: [
                  {
                    type: 'line',
                    fill: 'solid',
                    data: [11, 10, 14, 9, 12, 17, 14, 15, 8, 10, 12, 16, 15],
                  },
                ],
              colors: ['#A689E1'],
              xaxisLabel: 'Hours',
              yaxisLabel: 'Solar Irradiance',
              }}
              onChartTypeChange={handleChartTypeChange}
              activeButton={chartType}
            />
          )}
        </Grid>
        <Grid xs={12} md={8} lg={8}>
          {chartType === '1week' && (
            <ForecastData
              title="Wind Speed"
              subheader="Long-term Forecast"
              chart={{
                type: 'wspeed',
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                series: [
                  {
                    type: 'line',
                    fill: 'solid',
                    data: [14, 17, 18 , 12, 14, 11, 15],
                  },
                ],
                colors: ['#A689E1'],
                xaxisLabel: 'Days',
                yaxisLabel: 'Solar Irradiance',
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
