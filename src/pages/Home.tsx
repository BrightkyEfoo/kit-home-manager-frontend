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
  Switch,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import './styles.css';
import { FaHome, FaBroom, FaDribbbleSquare } from 'react-icons/fa';
import axios from 'axios';
import { apiURL } from '../backendRoutes';
import { Type } from 'typescript';
import { Toaster, toast } from 'react-hot-toast';

const Rooms: {
  name:
    | 'room1'
    | 'room2'
    | 'room3'
    | 'room4'
    | 'room5'
    | 'room6'
    | 'room7'
    | 'room8'
    | 'room9'
    | 'room10';
  color: string;
  icon: JSX.Element;
}[] = [
  { name: 'room1', color: 'purple', icon: <FaHome color="white" /> },
  { name: 'room2', color: 'blue', icon: <FaBroom color="white" /> },
  { name: 'room3', color: 'green', icon: <FaDribbbleSquare color="white" /> },
  { name: 'room4', color: 'orange', icon: <FaHome color="white" /> },
  { name: 'room5', color: 'red', icon: <FaBroom color="white" /> },
  {
    name: 'room6',
    color: 'lightgreen',
    icon: <FaDribbbleSquare color="white" />,
  },
  { name: 'room7', color: 'blue', icon: <FaBroom color="white" /> },
  { name: 'room8', color: 'green', icon: <FaDribbbleSquare color="white" /> },
  { name: 'room9', color: 'blue', icon: <FaBroom color="white" /> },
  { name: 'room10', color: 'green', icon: <FaDribbbleSquare color="white" /> },
];

const Home = () => {
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
  const [DrawerState, setDrawerState] = useState({
    anchor: 'left',
    toggled: false,
  });
  const [state, setState] = useState({
    index: 0.0,
    price: 0.0,
    room1: false,
    room2: false,
    room3: false,
    room4: false,
    room5: false,
    room6: false,
    room7: false,
    room8: false,
    room9: false,
    room10: false,
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
      }else if(settings === 'Home'){
        navigate('/');
      }else if(settings === 'Dashboard'){
        navigate('/dashboard')
      }else if(settings === 'Account'){
        navigate('/account')
      }
      setAnchorElUser(null);
    };
  };
  useEffect(() => {
    const interval = setInterval(() => {
        axios.post(apiURL+'/raspberry/stateget?id='+user.id,{},{
            headers : {
                Authorization : token
            }
        }).then(res => {
            // console.log('res.data', res.data)
            setState(res.data.state)
        }).catch(err => {
            toast.error(err.response?.data?.msg)
            console.log('err', err)
        })
    },1000)
  
    return () => {
      clearInterval(interval)
    }
  }, [])
  
  return (
    <div>
        <Toaster />
      <Drawer
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
              <Typography textAlign="center" color={'blue'} onClick={e => {
                if(page === "Home"){
                  navigate('/')
                }else if(page === "Contact"){
                  navigate('/Contact')
                }
              }}>
                {page}
              </Typography>
            </Box>
          ))}
        </Box>
      </Drawer>
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
                onClick={toggleDrawer(true)}
                color="inherit"
              >
                <MenuIcon />
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

      {/* main part */}
      <Typography align="center" margin={3}>
        Here you can Manage Your home
      </Typography>
      <div className="room-box-container">
        {Rooms.map((el, i) => {
          return (
            <div key={el.name} className="room-box">
              <div style={{ backgroundColor: el.color }}>
                {el.name} {el.icon}
              </div>
              <div>
                <Switch
                  checked={state[el.name]}
                  onChange={(e, checked) => {
                    setState(prev => {
                      let temp = { ...prev };
                      temp[el.name] = checked;
                        console.log('data', { rbpid: user.Raspberry.id, userId: user.id, temp })
                      axios
                        .post(
                          apiURL + '/raspberry/state',
                          { rbpid: user.Raspberry.id, userId: user.id, state : temp },
                          {
                            headers: {
                              Authorization: token,
                            },
                          }
                        )
                        .then(res => {
                          temp = res.data.state;
                          toast.success(res.data?.msg)

                          console.log('state', res.data.state);
                        })
                        .catch(err => {
                          temp = { ...prev };
                          toast.error(err.response?.data?.msg)
                          console.log('err', err);
                        });
                      return temp;
                    });
                    // axios.
                    console.log('state', state);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <Typography align="center" margin={3}>
          Here you can see your consumption
        </Typography>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2,1fr)',
            placeItems: 'center',
          }}
        >
          <div>
            <span style={{ fontSize: '2rem' }}>{state.index}</span> kWh
          </div>
          <div>
            <span style={{ fontSize: '2rem' }}>{state.price}</span> FCFA
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
