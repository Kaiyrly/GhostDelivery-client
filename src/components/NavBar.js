import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const NavBar = ({ token, setToken }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken({ token: undefined });
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', gap: '2rem' }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
            <Link to="/delivery" style={{ color: 'inherit', textDecoration: 'none' }}>Delivery</Link>
            <Link to="/order" style={{ color: 'inherit', textDecoration: 'none' }}>Order</Link>
            {token ? (
                <Button variant="outline-primary" onClick={handleLogout}>
                    Log Out
                </Button>
                ) : (
                <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>Logout</Link>
            )}
          </Box>
        </Typography>
        {token ? (
          <Button variant="outlined" onClick={handleLogout}>
            Log Out
          </Button>
        ) : (
          <Button variant="outlined" onClick={() => navigate('/login')}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
