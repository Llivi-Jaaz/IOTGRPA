import moment from 'moment';
import { ref, onValue } from 'firebase/database';
import React, { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { database } from 'src/sections/firebase/firebaseConfig';

import HumidityInfo from '../humidity-data';

export default function HumidityView() {
  const [humidityData, setHumidityData] = useState([]);
  const [humidityTimestamp, setHumidityTimestamp] = useState([]);

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

    fetchDataForParameter('/dataValues/humidity', setHumidityData, setHumidityTimestamp);

    return () => {
    };
  }, []);

  return (
    <Container>
      <Typography variant="h3" sx={{ mb: 0 }}>
        Humidity
      </Typography>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>
        Today is {moment().format('dddd, MMMM DD, YYYY')}
      </Typography>

      <Grid sx={{ mt: 6 }}>
        <Grid xs={12} md={8} lg={8}>
          <HumidityInfo
            title="Humidity"
            subheader="Today"
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

    </Container>
  );
}
