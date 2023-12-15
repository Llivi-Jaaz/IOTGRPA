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
    title: 'Rainfall',
    path: '/rainfall',
    icon: icon('ic_rain'),
  },
  {
    title: 'Sunlight',
    path: '/sunlight',
    icon: icon('ic_sun'),
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
    title: 'Wind Speed',
    path: '/wind-speed',
    icon: icon('ic_wind'),
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
    title: 'Historical Data',
    path: '/historical-data',
    icon: icon('ic_data'),
  },
  {
    title: 'Device Configuration',
    path: '/device-configuration',
    icon: icon('ic_devconfig'),
  },
];

export default navConfig;
