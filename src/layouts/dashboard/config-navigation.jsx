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
    path: '/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'Location Information',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'Historical Data',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'Device Configuration',
    path: '/user',
    icon: icon('ic_devconfig'),
  },
];

export default navConfig;
