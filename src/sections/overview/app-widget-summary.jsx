import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';



// ----------------------------------------------------------------------
export default function AppWidgetSummary({ title, subheader, data, total, icon, color = 'primary', sx, ...other }) {
  return (
    <Card
      component={Stack}
      spacing={4}
      direction="row"
      sx={{
        px: 2,
        py: 15,
        borderRadius: 3,
        position: 'relative',
        backgroundColor: '#E5F3F0', // Change the color here
        ...sx,
      }}
      {...other}
    >
      <Stack spacing={0.1} sx={{ position: 'absolute', top: 20, left: 20 }}>
        <Typography variant="h6" color='#52796F'>
          {title}
        </Typography>

        <Typography variant="subtitle1" color='#52796F'>
          {subheader}
        </Typography>
      </Stack>

      {icon}
      <Stack spacing={0.1} sx={{ position: 'absolute', textAlign: 'right', left: '80px' }}>
        <Typography variant="data" sx={{ fontSize: '3rem', fontWeight: 'bold' }}>
            {data}
          </Typography>
      </Stack>

      {/* Additional content or components within the Card */}
    </Card>
  );
};

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  subheader: PropTypes.string.isRequired,
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
  data: PropTypes.string
};
