import React from 'react';
import { Container, TextField, Box } from "@mui/material";
import { styled } from '@mui/system';
import RestaurantList from '../components/RestaurantList';

const Title = styled('h1')({
  color: '#333',
  textAlign: 'center',
});

const SearchContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px',
});

const SearchField = styled(TextField)({
  width: '600px',
});

const Order = () => {
  return (
    <Box sx={{ padding: '20px' }}>
      <Box sx={{ textAlign: 'center' }}>
        <Title>Order</Title>
      </Box>
      <SearchContainer maxWidth="md">
        <SearchField type="search" id="search" label="Search" />
      </SearchContainer>
      <RestaurantList />
    </Box>
  );
};

export default Order;
