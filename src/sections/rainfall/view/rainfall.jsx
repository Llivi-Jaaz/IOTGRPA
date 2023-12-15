import moment from 'moment';
import { ref, onValue } from 'firebase/database';
import React, { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { database } from 'src/sections/firebase/firebaseConfig';

import RainData from '../rainfall-data';

export default function RainfallView() {
  const currentDate = moment().format('dddd, MMMM DD, YYYY');
  const [rainfallData, setRainfallData] = useState([]);
  const [rainfallTimestamp, setRainfallTimestamp] = useState([]);

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

    fetchDataForParameter('/dataValues/raingauge', setRainfallData, setRainfallTimestamp);

    return () => {
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
            labels: rainfallTimestamp,
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
