import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { ref, off, onValue } from 'firebase/database';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { database } from 'src/sections/firebase/firebaseConfig';

import RainData from '../rainfall-data';

export default function RainfallView() {
  const currentDate = moment().format('dddd, MMMM DD, YYYY');
  const [rainfallData, setRainfallData] = useState([]);

  useEffect(() => {
    const rainfallRef = ref(database, '/dataValues/raingauge');

    const fetchRainfallData = onValue(rainfallRef, (snapshot) => {
      try {
        const data = snapshot.val();
        if (data) {
          
          const formattedData = Object.values(data)
            .filter((entry) => moment(entry.timestamp).isAfter(moment().subtract(24, 'hours')));
          setRainfallData(formattedData);
        }
      } catch (error) {
        console.error('Error fetching rainfall data:', error);
      }
    });

    return () => {
      off(rainfallRef, fetchRainfallData);
    };
  }, []);

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
              '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
              '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
              '21', '22', '23', '24',
            ],
            series: [
              {
                type: 'area',
                fill: 'gradient',
                data: rainfallData,
              },
            ],
            colors: ['#06CDF4'],
          }}
        />
      </Grid>
    </Container>
  );
}
