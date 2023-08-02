import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { apiURL } from '../backendRoutes';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { ArrowBack, Image } from '@mui/icons-material';

const Account = () => {
  const navigate = useNavigate();
  let tempU = localStorage.getItem('user');
  if (tempU !== null) {
    tempU = JSON.parse(tempU);
  } else {
    tempU = null;
  }
  const user = tempU as any;
  const token = 'Baerer ' + localStorage.getItem('token');
  useEffect(() => {
    // const tempUser =
    if (!localStorage.getItem('user')) {
      navigate('/login');
    }
  }, []);
  useEffect(() => {
    // const tempUser =
    if (!localStorage.getItem('user')) {
      navigate('/login');
    }
  }, []);
  const [DrawerState, setDrawerState] = useState({
    anchor: 'left',
    toggled: false,
  });
  const toggleDrawer = (open: boolean) => (event: any) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerState({ ...DrawerState, toggled: open });
  };

  const pages = ['Home', 'Contact'];

  const settings = ['Home', 'Account', 'Dashboard', 'Logout'];

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    console.log('yo');
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(null);
    const a = toggleDrawer(false);
    a(event);
  };

  const handleCloseUserMenu = (settings: string) => {
    return () => {
      if (settings === 'Logout') {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
      } else if (settings === 'Home') {
        navigate('/');
      } else if (settings === 'Dashboard') {
        navigate('/dashboard');
      } else if (settings === 'Account') {
        navigate('/account');
      }
      setAnchorElUser(null);
    };
  };

  return (
    <div>
      <Toaster />
      {/* <Drawer
        anchor={'left'}
        open={DrawerState.toggled}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{
            display: { xs: 'block', md: 'none', padding: 15 },
          }}
        >
          {pages.map(page => (
            <Box key={page} marginBottom={2} paddingRight={5} paddingLeft={3}>
              <Typography textAlign="center" color={'blue'}>
                {page}
              </Typography>
            </Box>
          ))}
        </Box>
      </Drawer> */}
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => {
                  navigate(-1);
                }}
                color="inherit"
              >
                <ArrowBack />
              </IconButton>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map(page => (
                <Button
                  key={page}
                  onClick={toggleDrawer(false)}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map(setting => (
                  <MenuItem
                    key={setting}
                    onClick={handleCloseUserMenu(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* main app */}
      <Typography textAlign={'center'} margin={3}>
        ACCOUNT
      </Typography>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Avatar
          sx={{
            height: 150,
            width: 150,
          }}
          alt="Remy Sharp"
          src="/static/images/avatar/2.jpg"
        />
        <Box
          width={'100vw'}
          display={'grid'}
          gridTemplateColumns={'repeat(2,1fr)'}
        >
          <Box margin={2}>
            <Typography bgcolor={'black'} color='white' textAlign={'center'} fontWeight={'bold'}>Nom</Typography>
            <Typography textAlign={'center'} fontSize={14}>{'gilres'}</Typography>
          </Box>
          <Box margin={2}>
            <Typography bgcolor={'black'} color='white' textAlign={'center'} fontWeight={'bold'} >Email</Typography>
            <Typography textAlign={'center'} fontSize={14}>{'test@test.com'}</Typography>
          </Box>
          <Box margin={2} gridColumn={'1/3'} >
            <Typography bgcolor={'black'} color='white' textAlign={'center'} fontWeight={'bold'}>Number</Typography>
            <Typography textAlign={'center'} fontSize={14}>{'+237685911324'}</Typography>
          </Box>
        </Box>
        <Box>
          {/* <TextField type='password' var /> */}
        </Box>
      </Box>
    </div>
  );
};

export default Account;
