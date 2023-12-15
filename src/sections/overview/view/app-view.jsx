import moment from 'moment';
import { useState, useEffect } from 'react';
import { ref, off, onValue } from 'firebase/database';
import {
  UilWind,
  UilBrightness,
  UilCloudCheck,
  UilRaindropsAlt,
  UilTemperaturePlus,
  UilCloudShowersHeavy,
} from '@iconscout/react-unicons';

import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { database } from 'src/sections/firebase/firebaseConfig';

import AppWidgetSummary from '../app-widget-summary';

// ----------------------------------------------------------------------
export default function AppView() {
    const currentDate = moment().format('dddd, MMMM DD, YYYY');
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [mq7, setCO] = useState(null);
    const [raingauge, setRainGauge] = useState(null);
    const [solarirradiance, setSolarIrradiance] = useState(null);
    const [windspeed, setWindSpeed] = useState(null);

  useEffect(() => {
    const fetchData = (path, setStateFunction) => {
      const dataRef = ref(database, path);
      const fetchDataHandler = onValue(dataRef, (snapshot) => {
        try {
          const data = snapshot.val();
          console.log(`Data for ${path}:`, data); // dito nagrread

          if (data) {
            const dataArray = Object.entries(data);

            dataArray.sort((a, b) => a[1].timestamp - b[1].timestamp);
            console.log('Sorted Data Array:', dataArray); // nagrread

            if (dataArray.length > 0) {
              const latestEntry = dataArray[dataArray.length - 1];
              console.log('Latest Entry:', latestEntry); // okay

              const latestTemperature = latestEntry[1];
             console.log('Latest Temperature:', latestTemperature);
              setStateFunction(latestTemperature);

            } else {
              console.log('Data Array is empty or has no valid entries.');
            }
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
      fetchData('dataValues/raingauge', setRainGauge),
      fetchData('dataValues/solarirradiance', setSolarIrradiance),
      fetchData('dataValues/windspeed', setWindSpeed),
    ];

    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h2" sx={{ mb: 0 }}>
        Dashboard
      </Typography>

      <Typography variant="subtitle2" sx={{ mt: 0, mb: 4 }}>
        Today is {currentDate}
      </Typography>

      <Grid container spacing={4}>
        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            icon={ <img src="/assets/icons/dash/temp.png" alt="Temp Icon"/>}
            title="Temperature (°C)"
            subheader="Today"
            data={`${temperature !== null ? temperature : 'null'} °C`}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            icon={ <img src="/assets/icons/dash/rain.png" alt="Rain Icon"/>}
            title="Rainfall (mm)"
            subheader="Today"
            data={`${raingauge !== null ? raingauge : 'null'} mm`}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            icon={ <img src="/assets/icons/dash/humidity.png" alt="Humidity Icon"/>}
            title="Humidity (%)"
            subheader="Today"
            data={`${humidity !== null ? humidity : 'null'} %`}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            icon={ <img src="/assets/icons/dash/wind.png" alt="Wind Icon"/>}
            title="Wind Speed (km/h)"
            subheader="Today"
            data={`${windspeed !== null ? windspeed : 'null'} km/h`}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            icon={ <img src="/assets/icons/dash/sun.png" alt="Sun Icon"/>}
            title="Solar Irradiance (W/m2)"
            subheader="Today"
            data={`${solarirradiance !== null ? solarirradiance : 'null'} W/m2`}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            icon={ <img src="/assets/icons/dash/co2.png" alt="CO2 Icon"/>}
            title="Carbon Monoxide (ppm)"
            subheader="Today"
            data={`${mq7 !== null ? mq7 : 'null'} ppm`}
          />
        </Grid>
      </Grid>
    </Container>
  );
}