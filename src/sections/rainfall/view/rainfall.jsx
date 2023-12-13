import moment from 'moment';
import { initializeApp } from 'firebase/app';
import React, { useMemo, useState, useEffect } from 'react';
import { ref, off, onValue, getDatabase } from 'firebase/database';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import RainData from '../rainfall-data';

const firebaseConfig = {
  apiKey: 'AIzaSyAyQ63_JkLt9_yPBMwtFG9rTATelf5k7bE',
  databaseURL: 'https://iot-aws-firebase-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

export default function RainfallView() {
  const currentDate = moment().format('dddd, MMMM DD, YYYY');
  const [rainfall, setRainfall] = useState([]);

  const database = useMemo(() => {
    const app = initializeApp(firebaseConfig);
    return getDatabase(app);
  }, []);

  useEffect(() => {
    const rainfallRef = ref(database, '/rainfall');

    const fetchRainfallData = onValue(rainfallRef, (snapshot) => {
      try {
        const data = snapshot.val();
        if (data) {
          const formattedData = Object.values(data);
          setRainfall(formattedData);
        }
      } catch (error) {
        console.error('Error fetching rainfall data:', error);
      }
    });

    return () => {
      off(rainfallRef, fetchRainfallData);
    };
  }, [database]);

  return (
    <Container>
      <Typography variant="h3" sx={{ mb: 0 }}>
        Rainfall
      </Typography>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>
        Today is {currentDate}
      </Typography>

      <Grid xs={12} md={8} lg={8} sx={{ mt: 4 }}>
        <RainData
          title="Rainfall"
          subheader="Today"
          chart={{
            labels: [
              '0',
              '2',
              '4',
              '6',
              '8',
              '10',
              '12',
              '14',
              '16',
              '18',
              '20',
              '22',
              '24',
            ],
            series: [
              {
                type: 'area',
                fill: 'gradient',
                data: rainfall,
              },
            ],
            colors: ['#06CDF4'],
          }}
        />
      </Grid>
    </Container>
  );
}