import 'moment-timezone';
import moment from 'moment';
import { ref, onValue } from 'firebase/database';
import React, { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { database } from 'src/sections/firebase/firebaseConfig';

import SolarData from '../sunlight-data';
import SunlightWidget from '../sunlight-widget';

// ---------------------------------------------------------------------

export default function SunlightView() {
    const [sunrise, setSunrise] = useState('');
    const [sunset, setSunset] = useState('');
    const [solarIrradianceData, setSolarIrradianceData] = useState([]);
    const [solarIrradianceTimestamp, setSolarIrradianceTimestamp] = useState([]);
  
    useEffect(() => {
      const fetchSunriseSunset = async () => {
        try {
          const response = await fetch('https://api.sunrise-sunset.org/json?lat=14.5896&lng=120.9810');
          const data = await response.json();
  
          if (data.results && data.results.sunrise && data.results.sunset) {
            const sunriseGMT = moment.utc(data.results.sunrise, 'hh:mm A');
            const sunsetGMT = moment.utc(data.results.sunset, 'hh:mm A');
            
            const sunrisePH = sunriseGMT.clone().add(8, 'hours').format('hh:mm A');
            const sunsetPH = sunsetGMT.clone().add(8, 'hours').format('hh:mm A');
  
            setSunrise(sunrisePH);
            setSunset(sunsetPH);
          } else {
            console.error('Invalid sunrise-sunset data:', data);
          }
        } catch (error) {
          console.error('Error fetching sunrise-sunset data:', error);
        }
        
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

        fetchDataForParameter('/dataValues/solarirradiance', setSolarIrradianceData, setSolarIrradianceTimestamp);

      };
  
      fetchSunriseSunset();
  
      const intervalId = setInterval(fetchSunriseSunset, 60000);
  
      return () => clearInterval(intervalId);
    }, []);

  const currentDate = moment().format('dddd, MMMM DD, YYYY');  

  return (
    <Container>
      <Typography variant="h3" sx={{ mb: 0 }}>
        Sunlight
      </Typography>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>
        Today is {currentDate}
      </Typography>

      <Grid xs={12} md={8} lg={8} sx={{ mt: 4 }}>
        <SolarData
          title="Solar Irradiance"
          subheader="Today"
          chart={{
          labels: solarIrradianceTimestamp,
            series: [
              {
                type: 'area',
                fill: 'gradient',
                data: solarIrradianceData,
              },
            ],
            colors: ['#F9E076'],
          }}
        />
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={6}>
          <SunlightWidget
            title="Sunrise"
            subheader={sunrise}
            icon={<img alt="icon" src="/assets/icons/glass/ic_sunrise.png" />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <SunlightWidget
            title="Sunset"
            subheader={sunset}
            icon={<img alt="icon" src="/assets/icons/glass/ic_sunset.png" />}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
