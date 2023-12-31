import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Temperature',
    path: '/temperature',
    icon: icon('ic_temperature'),
  },
  {
    title: 'Humidity',
    path: '/humidity',
    icon: icon('ic_humidity'),
  },
  {
    title: 'Rainfall',
    path: '/rainfall',
    icon: icon('ic_rain'),
  },
  {
    title: 'Wind Speed',
    path: '/wind-speed',
    icon: icon('ic_wind'),
  },
  {
    title: 'Sunlight',
    path: '/sunlight',
    icon: icon('ic_sun'),
  },
  {
    title: 'Carbon Monoxide',
    path: '/carbon-mono',
    icon: icon('ic_carbon'),
  },
  {
    title: 'Location Information',
    path: '/location-information',
    icon: icon('ic_location'),
  },
  {
    title: 'Device Configuration',
    path: '/device-configuration',
    icon: icon('ic_devconfig'),
  },
];

export default navConfig;
