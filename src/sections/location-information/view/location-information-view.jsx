import React from 'react';
import moment from 'moment';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { GoogleMap } from '../post-card'; 



export default function LocInfoView() {
  const currentDate = moment().format('dddd, MMMM DD, YYYY');

  return (
    <Container>
      <Typography variant="h3" sx={{ mb: 0 }}>
        Location Information
      </Typography>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>
        Today is {currentDate}
      </Typography>

      {/* Google Map Component */}
      <GoogleMap />
    </Container>
  );
}
