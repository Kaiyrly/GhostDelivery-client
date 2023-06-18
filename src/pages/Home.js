import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import { getUserRating } from '../services/api'; 
import useToken from '../hooks/useToken';
import { getUserIdFromToken } from '../helpers';

const Title = styled(Typography)({
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center',
});

const HomePage = () => {
  const [rating, setRating] = useState(null);
  const { token } = useToken();

  useEffect(() => {
    const fetchUserRating = async () => {
      const userId = getUserIdFromToken(token);  // Replace this with the actual userId
      const userRating = await getUserRating(userId, token);
      setRating(userRating);
    };

    fetchUserRating();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Title>Welcome to Ghost Rider!</Title>
      <Typography variant="h6" textAlign="center">We're glad to have you here. Enjoy your meal!</Typography>
      {rating && (
        <>
          <Typography variant="h6" textAlign="center">Your current rating: {rating}</Typography>
          {rating >= 3 ? (
            <Typography variant="h6" textAlign="center" color="green">
              Your rating is greater than 3. You are allowed to place an order and deliver.
            </Typography>
          ) : (
            <Typography variant="h6" textAlign="center" color="red">
              Unfortunately, your rating is less than 3. You are not allowed to place an order and deliver.
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default HomePage;
