import 'moment-timezone';
import moment from 'moment';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import RainData from '../rainfall-data';

// ----------------------------------------------------------------------

export default function RainfallView() {

  const currentDate = moment().format('dddd, MMMM DD, YYYY');  

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
                  data: [3.4, 1.2, 2.5, 3.2, 4.9, 2.5, 3.5, 4.4, 4.9, 4.3, 3.9, 3.4, 3.1],
                }
              ],
              colors: ['#06CDF4'],
            }}
          />
        </Grid>
    </Container>
  );
}
