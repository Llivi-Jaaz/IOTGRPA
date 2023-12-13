import moment from 'moment';
import { initializeApp } from 'firebase/app';
import React, { useState, useEffect } from 'react';
import { ref, off, onValue, getDatabase } from 'firebase/database';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import HistDataInfo from '../historical-data-info';

// ----------------------------------------------------------------------

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

  useEffect(() => {
    const temperatureRef = ref(database, '/DHT/temperature');
    const humidityRef = ref(database, '/DHT/humidity');
    const rainfallRef = ref(database, '/DHT/halleffect');
    const windspeedRef = ref(database, '/DHT/windspeed');
    const cardbonmonoRef = ref(database, '/DHT/mq7');
  
    const fetchTemperatureData = () => {
      onValue(temperatureRef, (snapshot) => {
        try {
          const data = snapshot.val();
          if (data) {
            const formattedData = Object.values(data).slice(0, 13);
            setTemperatureData(formattedData);
          }
        } catch (error) {
          console.error('Error fetching temperature data:', error);
        }
      });
    };
  
    const fetchHumidityData = () => {
      onValue(humidityRef, (snapshot) => {
        try {
          const data = snapshot.val();
          if (data) {
            const formattedData = Object.values(data).slice(0, 13);
            setHumidityData(formattedData);
          }
        } catch (error) {
          console.error('Error fetching humidity data:', error);
        }
      });
    };
  
    const fetchRainData = () => {
      onValue(rainfallRef, (snapshot) => {
        try {
          const data = snapshot.val();
          if (data) {
            const formattedData = Object.values(data).slice(0, 13);
            setRainData(formattedData);
          }
        } catch (error) {
          console.error('Error fetching rainfall data:', error);
        }
      });
    };

    const fetchWindSpeedData = () => {
      onValue(windspeedRef, (snapshot) => {
        try {
          const data = snapshot.val();
          if (data) {
            const formattedData = Object.values(data).slice(0, 13);
            setWindSpeedData(formattedData);
          }
        } catch (error) {
          console.error('Error fetching rainfall data:', error);
        }
      });
    };
  
    const fetchCarbonMonoData = () => {
      onValue(cardbonmonoRef, (snapshot) => {
        try {
          const data = snapshot.val();
          if (data) {
            const formattedData = Object.values(data).slice(0, 13);
            setCarbonMonoData(formattedData);
          }
        } catch (error) {
          console.error('Error fetching rainfall data:', error);
        }
      });
    };

    // Fetch data initially
    fetchTemperatureData();
    fetchHumidityData();
    fetchRainData();
    fetchWindSpeedData();
    fetchCarbonMonoData();
  
    // Set up listeners for real-time updates
    const temperatureListener = onValue(temperatureRef, () => fetchTemperatureData());
    const humidityListener = onValue(humidityRef, () => fetchHumidityData());
    const rainListener = onValue(rainfallRef, () => fetchRainData());
    const windspeedListener = onValue(windspeedRef, () => fetchWindSpeedData());
    const carbonmonoListener = onValue(cardbonmonoRef, () => fetchCarbonMonoData());
  
    // Cleanup listeners on component unmount
    return () => {
      off(temperatureListener);
      off(humidityListener);
      off(rainListener);
      off(windspeedListener);
      off(carbonmonoListener);
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
              colors: ['#145DA0'],
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
                    data: [140, 158, 189, 153, 200, 164, 194, 175, 184, 200, 156, 149, 128],
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
