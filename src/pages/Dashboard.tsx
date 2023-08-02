import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
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
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { ArrowBack } from '@mui/icons-material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Recapitulatif graphique',
    },
  },
};

const labels = [
  'Janvier',
  'Fevrier',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Aout',
  'Septembre',
  'Octobre',
  'Novembre',
  'Decembre',
];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Prices',
//       data: [14, 15, 7, 3, 85, 12, 45, 85, 7, 9, 11, 4],
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Index',
//       data: [64, 85, 31, 24, 101, 24, 62, 167, 19, 21, 17, 24],
//       borderColor: 'rgb(53, 162, 235)',
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };

const Dashboard = () => {
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

  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: 'Prices',
        data: [14, 15, 7, 3, 85, 12, 45, 85, 7, 9, 11, 4],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Index',
        data: [64, 85, 31, 24, 101, 24, 62, 167, 19, 21, 17, 24],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  });

  useEffect(() => {
    axios
      .post(
        apiURL + '/stats/',
        { userId: user.id },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(res => {
        console.log('res.data', res.data)
        setData(prev => {
          let temp = {...prev}
          temp = {
            labels,
            datasets: [
              {
                label: 'Prices',
                data: res.data.stats.map((el:any) => el.price),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
              {
                label: 'Index',
                data: res.data.stats.map((el:any) => el.index),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
              },
            ],
          }
          return temp
        })
      })
      .catch(err => {
        console.log('err.response.data.msg', err.response.data.msg);
        toast.error(err.response?.data?.msg);
      });
  }, []);

  return (
    <div>
      <Toaster />
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
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
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
        DASHBOARD
      </Typography>
      <Line options={options} data={data} />
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Button
          variant="contained"
          sx={{
            marginTop: 5,
            marginBottom: 5,
          }}
          onClick={()=>{
            axios.post(apiURL+'/user/statsFile',{userId : user.id} , {
              headers : {
                Authorization : token
              }
            }).then(res => {
              console.log('res', res)
              window.open(res.data.url)
            }).catch(err => {
              toast.error(err.response?.data?.msg)
              console.log('err', err)
            })
          }}
        >
          Telechargez le fichier recapitulatif
        </Button>
      </Box>
    </div>
  );
};

export default Dashboard;
