import moment from 'moment';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

// import AppCurrentVisits from '../app-current-visits';
// import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';


// ----------------------------------------------------------------------
export default function AppView() {
  const currentDate = moment().format('dddd, MMMM DD, YYYY');

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
          />

        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Rainfall (mm)"
            subheader="Today"
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Humidity (%)"
            subheader="Today"
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Wind Speed & Direction (km/h)"
            subheader="Today"
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Solar irradiance (W/m2)"
            subheader="Today"
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Carbon Monoxide (ppm)"
            subheader="Today"
          />
        </Grid>
{/*
{/*
{/*
{/*

        <Grid xs={12} md={8} lg={8}>
          <AppWebsiteVisits
            title="Humidity (%)"
            subheader="Today"
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Carbon Monoxide (ppm)"
            subheader="Today"
            chart={{
              series: [
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ],
            }}
          />
        </Grid> */}

      </Grid>
    </Container>
  );
}
