import moment from 'moment';
import { ref, off, onValue } from 'firebase/database';
import React, { useState, useEffect, useCallback } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { database } from 'src/sections/firebase/firebaseConfig';

import AppWidgetSummary from '../app-widget-summary';

// ----------------------------------------------------------------------

export default function AppView() {
  const currentDate = moment().format('dddd, MMMM DD, YYYY');
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [mq7, setCO] = useState('');
  const [halleffect, setRainfall] = useState('');
  const [solarirradiance, setSolarIrradiance] = useState('');
  const [windspeed, setWindSpeed] = useState('');

  const findLatestEntry = useCallback((dataObject) => {
    let latestEntry = null;
    Object.keys(dataObject).forEach((key) => {
      const entryTimestamp = moment(key, 'MMDDYYYY_HHmmss').valueOf();
      if (
        (!latestEntry || entryTimestamp > latestEntry.timestamp) &&
        dataObject[key].value !== null
      ) {
        latestEntry = {
          timestamp: entryTimestamp,
          value: dataObject[key].value,
        };
      }
    });
    return latestEntry;
  }, []);

  useEffect(() => {
    const fetchData = (path, setStateFunction) => {
      const dataRef = ref(database, path);
      const fetchDataHandler = onValue(dataRef, (snapshot) => {
        try {
          const data = snapshot.val();
          console.log(`Data for ${path}:`, data);

          if (data) {
            const latestEntry = findLatestEntry(data);
            if (latestEntry !== null && latestEntry.value !== undefined) {
              setStateFunction(latestEntry.value);
            } else {
              setStateFunction(null);
            }
          } else {
            setStateFunction(null);
          }
        } catch (error) {
          console.error(`Error fetching ${path} data:`, error);
        }
      });

      return () => {
        off(dataRef, fetchDataHandler);
      };
    };

    const cleanupFunctions = [
      fetchData('dataValues/temperature', setTemperature),
      fetchData('dataValues/humidity', setHumidity),
      fetchData('dataValues/mq7', setCO),
      fetchData('dataValues/halleffect', setRainfall),
      fetchData('dataValues/solarirradiance', setSolarIrradiance),
      fetchData('dataValues/windspeed', setWindSpeed),
    ];

    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  }, [findLatestEntry]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h3" sx={{ mb: 0 }}>
        Dashboard
      </Typography>

      <Typography variant="subtitle2" sx={{ mt: 0, mb: 3 }}>
        Today is {currentDate}
      </Typography>

      <Grid container spacing={2}>
        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Temperature (°C)"
            subheader="Today"
            data={`${temperature !== null ? temperature : 'null'} °C`}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Rainfall (mm)"
            subheader="Today"
            data={`${halleffect !== null ? halleffect : 'null'} mm`}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Humidity (%)"
            subheader="Today"
            data={`${humidity !== null ? humidity : 'null'} %`}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Wind Speed & Direction (km/h)"
            subheader="Today"
            data={`${windspeed !== null ? windspeed : 'null'} km/h`}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Solar irradiance (W/m2)"
            subheader="Today"
            data={`${solarirradiance !== null ? solarirradiance : 'null'} W/m2`}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Carbon Monoxide (ppm)"
            subheader="Today"
            data={`${mq7 !== null ? mq7 : 'null'} ppm`}
          />
        </Grid>
      </Grid>
    </Container>
  );
}