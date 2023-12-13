import moment from 'moment';
import { initializeApp } from 'firebase/app';
import React, { useState, useEffect } from 'react';
import { ref, onValue, getDatabase } from 'firebase/database';

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

  useEffect(() => {
    // Fetch temperature data from Firebase
    const temperatureRef = ref(database, '/DHT/temperature');

    onValue(temperatureRef, (snapshot) => {
      try {
        const data = snapshot.val();
        if (data) {
          // Convert the Firebase data to an array of numbers
          const formattedData = Object.values(data).slice(0, 13); // Take only the first 13 data points
          setTemperatureData(formattedData); // Assuming you have a state variable like setTemperatureData to store the fetched data
        }
      } catch (error) {
        console.error('Error fetching temperature data:', error);
      }
    });
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
                  type: 'line',
                  fill: 'solid',
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
                    type: 'line',
                    fill: 'solid',
                    data: [66, 74, 82, 65, 80, 75, 69, 82, 80, 76, 74, 72, 70],
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
                    type: 'line',
                    fill: 'solid',
                    data: [3.4, 2.3, 2.5, 3.6, 4.5, 3.2, 3.8, 4.7, 4.9, 4.3, 3.9, 3.4, 3.1],
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
              title="Solar Radiation"
              subheader="Historical Data"
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
                    type: 'line',
                    fill: 'solid',
                    data: [11, 10, 14, 9, 12, 17, 14, 15, 8, 10, 12, 16, 15],
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
                    type: 'line',
                    fill: 'solid',
                    data: [16, 25, 28, 19, 25, 28, 16, 25, 28, 17, 20, 24, 23],
                  },
                ],
              colors: ['#ADD8E6'],
              xaxisLabel: 'Hours',
              yaxisLabel: 'Carbon Monoxide',
              }}
            />
        </Grid>
      </Grid>
       
    </Container>
  );
}
