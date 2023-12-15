import moment from 'moment';
import { ref, onValue } from 'firebase/database';
import React, { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { database } from 'src/sections/firebase/firebaseConfig';

import TemperatureInfo from '../temperature-data';

export default function TemperatureView() {
  const [temperatureData, setTemperatureData] = useState([]);
  const [temperatureTimestamp, setTemperatureTimestamp] = useState([]);

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

    return () => {
    };
  }, []);

  return (
    <Container>
      <Typography variant="h3" sx={{ mb: 0 }}>
        Temperature
      </Typography>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>
        Today is {moment().format('dddd, MMMM DD, YYYY')}
      </Typography>

      <Grid sx={{ mt: 4 }}>
        <Grid xs={12} md={8} lg={8}>
          <TemperatureInfo
            title="Temperature"
            subheader="Today"
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
    </Container>
  );
}
