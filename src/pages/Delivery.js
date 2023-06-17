import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Typography, Tabs, Tab } from '@mui/material';
import { styled } from '@mui/system';

const Title = styled(Typography)({
  fontSize: '24px',
  fontWeight: 'bold',
});

const OrderCard = styled(Card)({
  marginBottom: '10px',
});

const availableOrders = [
  {
    restaurant: "Test Restaurant 1",
    deliveryFee: 5.00,
    deliveryAddress: "123 Main St, Anytown, USA",
    orderTime: "2023-06-17T12:34:56Z",
  },
  {
    restaurant: "Test Restaurant 2",
    deliveryFee: 7.00,
    deliveryAddress: "456 Oak St, Anytown, USA",
    orderTime: "2023-06-17T13:45:00Z",
  },
  {
    restaurant: "Test Restaurant 3",
    deliveryFee: 6.50,
    deliveryAddress: "789 Pine St, Anytown, USA",
    orderTime: "2023-06-17T14:56:00Z",
  },
];

const myOrders = [
  {
    restaurant: "Test Restaurant 4",
    deliveryFee: 4.50,
    deliveryAddress: "321 Elm St, Anytown, USA",
    orderTime: "2023-06-17T15:30:00Z",
  },
  {
    restaurant: "Test Restaurant 5",
    deliveryFee: 6.00,
    deliveryAddress: "654 Maple St, Anytown, USA",
    orderTime: "2023-06-17T16:45:00Z",
  },
];


const DeliveryPage = () => {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleTakeOrder = (order) => {
    // Add functionality to take order
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Title>Orders</Title>
      <Tabs value={tab} onChange={handleTabChange}>
        <Tab label="Available Orders" />
        <Tab label="Completed Orders" />
      </Tabs>
      {tab === 0 && availableOrders.map((order, index) => (
        <OrderCard key={index}>
          <CardContent>
            <Typography variant="h6">Restaurant: {order.restaurant}</Typography>
            <Typography variant="body2">Delivery Fee: ${order.deliveryFee}</Typography>
            <Typography variant="body2">Delivery Address: {order.deliveryAddress}</Typography>
            <Typography variant="body2">Order Time: {order.orderTime}</Typography>
            <Button variant="contained" color="primary" onClick={() => handleTakeOrder(order)}>
              Take Order
            </Button>
          </CardContent>
        </OrderCard>
      ))}
      {tab === 1 && myOrders.map((order, index) => (
        <OrderCard key={index}>
          <CardContent>
            <Typography variant="h6">Restaurant: {order.restaurant}</Typography>
            <Typography variant="body2">Delivery Fee: ${order.deliveryFee}</Typography>
            <Typography variant="body2">Delivery Address: {order.deliveryAddress}</Typography>
            <Typography variant="body2">Order Time: {order.orderTime}</Typography>
          </CardContent>
        </OrderCard>
      ))}
    </Box>
  );
};

export default DeliveryPage;
