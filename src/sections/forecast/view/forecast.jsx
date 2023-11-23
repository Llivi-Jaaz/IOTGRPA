import moment from 'moment';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import TempData from '../forecast-data';

// ----------------------------------------------------------------------

export default function ForecastView() {

  const currentDate = moment().format('dddd, MMMM DD, YYYY');  

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 0 }}>
        Forecast
      </Typography>
      <Typography variant="h7" sx={{ mb: 2 }}>
        Today is {currentDate}
      </Typography>

      <Grid xs={12} md={8} lg={8} sx={{ mt: 4 }}>
          <TempData
            title="Temperature"
            subheader="Short-term Forecast"
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
                  type: 'line',
                  fill: 'solid',
                  data: [27, 29, 28.5, 30, 31, 30, 31.4, 28.3, 29.8, 26, 27, 27.3, 26.5],
                }
              ],
            }}
          />
        </Grid>
    </Container>
  );
}
