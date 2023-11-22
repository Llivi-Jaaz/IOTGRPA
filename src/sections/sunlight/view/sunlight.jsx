import moment from 'moment';
import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { sunlight } from 'src/_mock/sunlight';

import SunlightCard from '../sunlight-card';
import SunlightSort from '../sunlight-sort';
import SunlightWidget from '../sunlight-widget';
import SunlightFilters from '../sunlight-filters';

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

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <SunlightFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />

          <SunlightSort />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {sunlight.map((solar) => (
          <Grid key={solar.id} xs={12} sm={6} md={3}>
            <SunlightCard sunlight={solar} />
          </Grid>
        ))}
      </Grid>

      <SunlightWidget />
    </Container>
  );
}
