import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function SunlightWidget({ title, subheader, total, icon, color = 'primary', sx, ...other }) {
  return (
    <Card
      component={Stack}
      spacing={3}
      direction="row"
      sx={{
        px: 3,
        py: 5,
        borderRadius: 2,
        ...sx,
      }}
      {...other}
    >
      {icon && <Box sx={{ width: 85, height: 85 }}>{icon}</Box>}

      <Stack spacing={0.5}>
        <Typography variant="h7">
          {title}
        </Typography>
        <Typography variant="h2">
          {subheader}
        </Typography>

      </Stack>
    </Card>
  );
}

SunlightWidget.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  subheader: PropTypes.string.isRequired,
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
};
