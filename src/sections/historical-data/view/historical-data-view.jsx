import moment from 'moment';
import { ref, onValue } from 'firebase/database';
import React, { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { database } from 'src/sections/firebase/firebaseConfig';

import HistDataInfo from '../historical-data-info';

export default function HistDataView() {
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [rainfallData, setRainData] = useState([]);
  const [windspeedData, setWindSpeedData] = useState([]);
  const [carbonmonoData, setCarbonMonoData] = useState([]);
  const [solarIrradianceData, setSolarIrradianceData] = useState([]);

  const [temperatureTimestamp, setTemperatureTimestamp] = useState([]);
  const [humidityTimestamp, setHumidityTimestamp] = useState([]);
  const [rainfallTimestamp, setRainfallTimestamp] = useState([]);
  const [windspeedTimestamp, setWindspeedTimestamp] = useState([]);
  const [carbonmonoTimestamp, setCarbonmonoTimestamp] = useState([]);
  const [solarIrradianceTimestamp, setSolarIrradianceTimestamp] = useState([]);

  useEffect(() => {
    const fetchDataForParameter = (paramPath, setData, setTimestamp, limit = 12) => {
      const paramRef = ref(database, paramPath);

      onValue(paramRef, (snapshot) => {
        try {
          const data = snapshot.val();
          if (data) {
            const dataArray = Object.entries(data);

            dataArray.sort((a, b) => {
              const timestampA = moment(a[0], 'MMDDYYYY_HHmmss').valueOf();
              const timestampB = moment(b[0], 'MMDDYYYY_HHmmss').valueOf();
              return timestampA - timestampB;
            });

            const limitedData = dataArray.slice(-limit);

            const formattedData = limitedData.map(([key, value]) => value);
            const timestamps = limitedData.map(([key, value]) => moment(key, 'MMDDYYYY_HHmmss').format('HH:mm:ss'));

            setData(formattedData);
            setTimestamp(timestamps);
          }
        } catch (error) {
          console.error(`Error fetching data for ${paramPath}:`, error);
        }
      });
    };

    fetchDataForParameter('/dataValues/temperature', setTemperatureData, setTemperatureTimestamp);
    fetchDataForParameter('/dataValues/humidity', setHumidityData, setHumidityTimestamp);
    fetchDataForParameter('/dataValues/raingauge', setRainData, setRainfallTimestamp);
    fetchDataForParameter('/dataValues/windspeed', setWindSpeedData, setWindspeedTimestamp);
    fetchDataForParameter('/dataValues/mq7', setCarbonMonoData, setCarbonmonoTimestamp);
    fetchDataForParameter('/dataValues/solarirradiance', setSolarIrradianceData, setSolarIrradianceTimestamp);

    return () => {
    };
  }, []);

  return (
    <Container>
      <Typography variant="h3" sx={{ mb: 0 }}>
        Historical Data
      </Typography>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>
        Today is {moment().format('dddd, MMMM DD, YYYY')}
      </Typography>

      <Grid sx={{ mt: 4 }}>
        <Grid xs={12} md={8} lg={8}>
          <HistDataInfo
            title="Temperature"
            subheader="Historical Data"
            chart={{
              type: 'temperature',
              labels: temperatureTimestamp,
              series: [
                {
                  type: 'area',
                  fill: 'gradient',
                  data: temperatureData,
                },
              ],
              colors: ['#189AB4'],
              xaxisLabel: 'Time',
              yaxisLabel: 'Temperature',
            }}
          />
        </Grid>
      </Grid>

      <Grid sx={{ mt: 6 }}>
        <Grid xs={12} md={8} lg={8}>
          <HistDataInfo
            title="Humidity"
            subheader="Historical Data"
            chart={{
              type: 'humidity',
              labels: humidityTimestamp,
              series: [
                {
                  type: 'area',
                  fill: 'gradient',
                  data: humidityData,
                },
              ],
              colors: ['#3F704D'],
              xaxisLabel: 'Time',
              yaxisLabel: 'Relative Humidity',
            }}
          />
        </Grid>
      </Grid>

      <Grid sx={{ mt: 6 }}>
        <Grid xs={12} md={8} lg={8}>
            <HistDataInfo
              title="Rainfall"
              subheader="Historical Data"
              chart={{
                type: 'rain',
                labels: rainfallTimestamp,
                series: [
                  {
                    type: 'area',
                    fill: 'gradient',
                    data: rainfallData,
                  },
                ],
              colors: ['#06CDF4'],
              xaxisLabel: 'Time',
              yaxisLabel: 'Precipitation',
              }}
            />
        </Grid>
      </Grid>

      <Grid sx={{ mt: 6 }}>
        <Grid xs={12} md={8} lg={8}>
            <HistDataInfo
              title="Wind Speed"
              subheader="Historical Data"
              chart={{
                type: 'wspeed',
                labels: windspeedTimestamp,
                series: [
                  {
                    type: 'area',
                    fill: 'gradient',
                    data: windspeedData,
                  },
                ],
              colors: ['#A689E1'],
              xaxisLabel: 'Time',
              yaxisLabel: 'Solar Irradiance',
              }}
            />
        </Grid>
      </Grid>

      <Grid sx={{ mt: 6 }}>
        <Grid xs={12} md={8} lg={8}>
            <HistDataInfo
              title="Carbon Monoxide"
              subheader="Historical Data"
              chart={{
                type: 'carbon',
                labels: carbonmonoTimestamp,
                series: [
                  {
                    type: 'area',
                    fill: 'gradient',
                    data: carbonmonoData,
                  },
                ],
              colors: ['#ADD8E6'],
              xaxisLabel: 'Time',
              yaxisLabel: 'Carbon Monoxide',
              }}
            />
        </Grid>
      </Grid>
       
      <Grid sx={{ mt: 6 }}>
        <Grid xs={12} md={8} lg={8}>
            <HistDataInfo
              title="Solar Radiation"
              subheader="Historical Data"
              chart={{
                type: 'solar',
                labels: solarIrradianceTimestamp,
                series: [
                  {
                    type: 'area',
                    fill: 'gradient',
                    data: solarIrradianceData,
                  },
                ],
              colors: ['#F9E076'],
              xaxisLabel: 'Time',
              yaxisLabel: 'Solar Irradiance',
              }}
            />
        </Grid>
      </Grid>

    </Container>
  );
}
