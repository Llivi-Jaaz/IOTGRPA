  import PropTypes from 'prop-types';
  import { useState, useEffect } from 'react';

  import Box from '@mui/material/Box';
  import Stack from '@mui/material/Stack';
  import Avatar from '@mui/material/Avatar';
  import Drawer from '@mui/material/Drawer';
  import { alpha } from '@mui/material/styles';
  import Typography from '@mui/material/Typography';
  import ListItemButton from '@mui/material/ListItemButton';

  import { usePathname } from 'src/routes/hooks';
  import { RouterLink } from 'src/routes/components';

  import { useResponsive } from 'src/hooks/use-responsive';

  import { auth } from 'src/sections/firebase/firebaseConfig';  // Import Firebase auth

  import Logo from 'src/components/logo';
  import Scrollbar from 'src/components/scrollbar';

  import { NAV } from './config-layout';
  import navConfig from './config-navigation';

  // ----------------------------------------------------------------------

  export default function Nav({ openNav, onCloseNav }) {
    const pathname = usePathname();
    const [user, setUser] = useState(null);

    const upLg = useResponsive('up', 'lg');

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        setUser(authUser);
      });

      return () => {
        unsubscribe();
      };
    }, []);

    useEffect(() => {
      if (openNav) {
        onCloseNav();
      }
    }, [pathname, openNav, onCloseNav]);

    const renderAccount = user && (
      <Box
        sx={{
          my: 3,
          mx: 2.5,
          py: 2,
          px: 2.5,
          display: 'flex',
          borderRadius: 1.5,
          alignItems: 'center',
          bgcolor: '#D1EDE5',
        }}
      >
        <Avatar src={user.photoURL} alt="photoURL" />

        <Box sx={{ ml: 2 }}>
          <Typography variant="subtitle2">{user.email}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {user.role}
          </Typography>
        </Box>
      </Box>
    );

    const renderMenu = (
      <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
        {navConfig.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </Stack>
    );

    const renderContent = (
      <Scrollbar
        sx={{
          height: 1,
          '& .simplebar-content': {
            height: 1,
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <Logo sx={{ mt: 3, ml: 4 }} />
        {/* <Typography variant="h3" sx={{ marginLeft: 10, marginTop: 3, color: '#1EA480' }}>
        A.W.S
        </Typography> */}
        {renderAccount}
        {renderMenu}
        <Box sx={{ flexGrow: 1 }} />
      </Scrollbar>
    );

    return (
      <Box
        sx={{
          flexShrink: { lg: 0 },
          width: { lg: NAV.WIDTH },
          bgcolor: '#EEF6EF',
        }}
      >
        {upLg ? (
          <Box
            sx={{
              height: 1,
              position: 'fixed',
              width: NAV.WIDTH,
              borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
            }}
          >
            {renderContent}
          </Box>
        ) : (
          <Drawer
            open={openNav}
            onClose={onCloseNav}
            PaperProps={{
              sx: {
                width: NAV.WIDTH,
              },
            }}
          >
            {renderContent}
          </Drawer>
        )}
      </Box>
    );
  }

  Nav.propTypes = {
    openNav: PropTypes.bool,
    onCloseNav: PropTypes.func,
  };

  // ----------------------------------------------------------------------

  function NavItem({ item }) {
    const pathname = usePathname();
    const active = item.path === pathname;

    return (
      <ListItemButton
        component={RouterLink}
        href={item.path}
        sx={{
          minHeight: 44,
          borderRadius: 0.75,
          typography: 'body2',
          color: 'text.secondary',
          textTransform: 'capitalize',
          fontWeight: 'fontWeightMedium',
          ...(active && {
            color: 'success.main',
            fontWeight: 'fontWeightSemiBold',
            bgcolor: (theme) => alpha(theme.palette.success.main, 0.08),
            '&:hover': {
              bgcolor: (theme) => alpha(theme.palette.success.main, 0.16),
            },
          }),
        }}
      >
        <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
          {item.icon}
        </Box>

        <Box component="span">{item.title} </Box>
      </ListItemButton>
    );
  }

  NavItem.propTypes = {
    item: PropTypes.object,
  };