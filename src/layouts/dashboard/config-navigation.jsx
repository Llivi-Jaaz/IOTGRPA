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
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Sunlight',
    path: '/sunlight',
    icon: icon('ic_sun'),
  },
  {
    title: 'Forecast',
    path: '/forecast',
    icon: icon('ic_forecast'),
  },
  {
    title: 'Location Information',
    path: '/blog',
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
