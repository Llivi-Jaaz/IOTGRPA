import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


// ----------------------------------------------------------------------
export default function AppWidgetSummary({ title, subheader, data, total, icon, color = 'primary', sx, ...other }) {
  return (
    <Card
      component={Stack}
      spacing={3}
      direction="row"
      sx={{
        px: 3,
        py: 20,
        borderRadius: 2,
        position: 'relative',
        ...sx,
      }}
      {...other}
    >
      <Stack spacing={0.1} sx={{ position: 'absolute', top: 20, left: 20 }}>
        <Typography variant="h6">
          {title}
        </Typography>

        <Typography variant="subtitle1">
          {subheader}
        </Typography>
      </Stack>

      <Stack spacing={0.1} sx={{ position: 'absolute', textAlign: 'center' }}>
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
