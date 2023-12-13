import moment from 'moment';
import { initializeApp } from 'firebase/app';
import React, { useState, useEffect } from 'react';
import { ref, off, onValue, getDatabase } from 'firebase/database';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import HistDataInfo from '../historical-data-info';

const firebaseConfig = {
  apiKey: 'AIzaSyD6O0IWDRkEPngo6pfoakPRfaXUEuh8tcI',
  databaseURL: 'https://weathering-station-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function HistDataView() {
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [rainfallData, setRainData] = useState([]);
  const [windspeedData, setWindSpeedData] = useState([]);
  const [carbonmonoData, setCarbonMonoData] = useState([]);
  const [solarIrradianceData, setSolarIrradianceData] = useState([]);

  useEffect(() => {
    const temperatureRef = ref(database, '/DHT/temperature');
    const humidityRef = ref(database, '/DHT/humidity');
    const rainfallRef = ref(database, '/DHT/halleffect');
    const windspeedRef = ref(database, '/DHT/windspeed');
    const cardbonmonoRef = ref(database, '/DHT/mq7');
    const solarIrradianceRef = ref(database, '/DHT/irradiance');

    const fetchDataForParameter = (paramRef, setData, limit = 13) => {
      onValue(paramRef, (snapshot) => {
        try {
          const data = snapshot.val();
          if (data) {
            const dataArray = Object.entries(data);
            
            dataArray.sort((a, b) => a[1].timestamp - b[1].timestamp);
            
            const limitedData = dataArray.slice(-limit);
    
            const formattedData = limitedData.map(([key, value]) => value);
    
            setData(formattedData);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      });
    };

    fetchDataForParameter(temperatureRef, setTemperatureData);
    fetchDataForParameter(humidityRef, setHumidityData);
    fetchDataForParameter(rainfallRef, setRainData);
    fetchDataForParameter(windspeedRef, setWindSpeedData);
    fetchDataForParameter(cardbonmonoRef, setCarbonMonoData);
    fetchDataForParameter(solarIrradianceRef, setSolarIrradianceData);    

    const temperatureListener = onValue(
      temperatureRef,
      () => fetchDataForParameter(temperatureRef, setTemperatureData)
    );
    const humidityListener = onValue(
      humidityRef,
      () => fetchDataForParameter(humidityRef, setHumidityData)
    );
    const rainListener = onValue(rainfallRef, () => fetchDataForParameter(rainfallRef, setRainData));
    const windspeedListener = onValue(
      windspeedRef,
      () => fetchDataForParameter(windspeedRef, setWindSpeedData)
    );
    const carbonmonoListener = onValue(
      cardbonmonoRef,
      () => fetchDataForParameter(cardbonmonoRef, setCarbonMonoData)
    );
    const solarIrradianceListener = onValue(
      cardbonmonoRef,
      () => fetchDataForParameter(solarIrradianceRef, setSolarIrradianceData)
    );

    return () => {
      off(temperatureListener);
      off(humidityListener);
      off(rainListener);
      off(windspeedListener);
      off(carbonmonoListener);
      off(solarIrradianceListener);
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
              labels: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24'],
              series: [
                {
                  type: 'area',
                  fill: 'gradient',
                  data: temperatureData,
                },
              ],
              colors: ['#189AB4'],
              xaxisLabel: 'Hours',
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
                labels: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24'],
                series: [
                  {
                    type: 'area',
                    fill: 'gradient',
                    data: humidityData,
                  },
                ],
              colors: ['#3F704D'],
              xaxisLabel: 'Hours',
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
                labels: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24'],
                series: [
                  {
                    type: 'area',
                    fill: 'gradient',
                    data: rainfallData,
                  },
                ],
              colors: ['#06CDF4'],
              xaxisLabel: 'Hours',
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
                labels: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24'],
                series: [
                  {
                    type: 'area',
                    fill: 'gradient',
                    data: windspeedData,
                  },
                ],
              colors: ['#A689E1'],
              xaxisLabel: 'Hours',
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
                labels: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24'],
                series: [
                  {
                    type: 'area',
                    fill: 'gradient',
                    data: carbonmonoData,
                  },
                ],
              colors: ['#ADD8E6'],
              xaxisLabel: 'Hours',
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
                labels: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24'],
                series: [
                  {
                    type: 'area',
                    fill: 'gradient',
                    data: solarIrradianceData,
                  },
                ],
              colors: ['#F9E076'],
              xaxisLabel: 'Hours',
              yaxisLabel: 'Solar Irradiance',
              }}
            />
        </Grid>
      </Grid>

    </Container>
  );
}
