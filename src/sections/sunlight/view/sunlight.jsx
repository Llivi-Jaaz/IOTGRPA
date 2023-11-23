import moment from 'moment';
import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { sunlight } from 'src/_mock/sunlight';

import SolarData from '../sunlight-data';

// ----------------------------------------------------------------------

export default function SunlightView() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const currentDate = moment().format('dddd, MMMM DD, YYYY');  

  return (
    <Container>
      <Typography variant="h2" sx={{ mb: 0 }}>
        Sunlight
      </Typography>
      <Typography variant="h7" sx={{ mb: 2 }}>
        Today is {currentDate}
      </Typography>

      <Grid xs={12} md={8} lg={8} sx={{ mt: 4 }}>
          <SolarData
            title="Solar Radiation"
            subheader="Today"
            chart={{
              labels: [
                '0',
                '4',
                '8',
                '12',
                '16',
                '20',
                '24',
              ],
              series: [
                {
                  type: 'area',
                  fill: 'gradient',
                  data: [140, 203, 189, 198, 200, 156, 128],
                }
              ],
            }}
          />
        </Grid>
    </Container>
  );
}
