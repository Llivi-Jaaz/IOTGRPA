import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { RouterLink } from 'src/routes/components';

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const logoContent = (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box
        component="img"
        src="/favicon/aws_logo.svg"
        sx={{ width: 30, height: 30, cursor: 'pointer', ...sx }}
      />
      <Typography variant="h3" sx={{ marginLeft: 1, marginTop: 3,  color: '#1EA480'}}>
        Weather
      </Typography>
    </Box>
  );

  if (disabledLink) {
    return logoContent;
  }

  return (
    <Link component={RouterLink} sx={{ display: 'contents' }}>
      {logoContent}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
