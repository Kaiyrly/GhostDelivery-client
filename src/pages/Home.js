import React from 'react';
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const Title = styled(Typography)({
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center',
});

const HomePage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Title>Welcome to Our Restaurant!</Title>
      <Typography variant="h6" textAlign="center">We're glad to have you here. Enjoy your meal!</Typography>
    </Box>
  );
};

export default HomePage;
