import moment from 'moment';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

import ForecastData from '../forecast-data';

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
          <ForecastData
            title="Solar Radiation"
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
                  data: [140, 158, 189, 153, 200, 164, 194, 175, 184, 200, 156, 128],
                }
              ],
            }}
          />
        </Grid>

    </Container>
  );
}
