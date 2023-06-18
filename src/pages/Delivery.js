import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, Typography, Tabs, Tab } from '@mui/material';
import { styled } from '@mui/system';
import { getAllOrders, takeOrder, getUserRating } from '../services/api';
import useToken from '../hooks/useToken';
import { getUserIdFromToken } from '../helpers';

const Title = styled(Typography)({
  fontSize: '24px',
  fontWeight: 'bold',
});

const OrderCard = styled(Card)({
  marginBottom: '10px',
});

const availableOrders = [];
const myOrders = [];


const DeliveryPage = () => {
  const [userRating, setUserRating] = useState(0);
  const [tab, setTab] = useState(0);
  const [orders, setOrders] = useState([]);
  const [availableOrders, setAvailableOrders] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
  const {token, setToken} = useToken();

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleTakeOrder = (order) => {
    const userId = getUserIdFromToken(token);
    try {
      const data = takeOrder(token, order.id, userId)
      console.log(data);
    } catch(error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchOrdersAndRating = async () => {
      const userId = getUserIdFromToken(token);
      try {
        const allOrders = await getAllOrders(token);
        const rating = await getUserRating(userId, token); 
  
        setAvailableOrders(allOrders.filter(order => order.delivererId !== userId).filter(order => order.status === 'PLACED'));
        setMyOrders(allOrders.filter(order => order.delivererId === userId));
        setUserRating(rating);
        console.log(allOrders)
        setOrders(allOrders);
      } catch(error) {
        console.log(error);
      }
    };
  
    fetchOrdersAndRating();
  }, []);

  return (
    <Box sx={{ padding: '20px' }}>
      <Title>Orders</Title>
      <Tabs value={tab} onChange={handleTabChange}>
        <Tab label="Available Orders" />
        <Tab label="Taken Orders" />
      </Tabs>
      {tab === 0 && availableOrders.map((order, index) => (
        <OrderCard key={index}>
          <CardContent>
            <Typography variant="h6">Restaurant: {order.restaurant}</Typography>
            <Typography variant="body2">Delivery Fee: ${order.fee}</Typography>
            <Typography variant="body2">Delivery Address: {order.address}</Typography>
            <Typography variant="body2">Order Time: {order.orderTime}</Typography>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => handleTakeOrder(order)}
              disabled={userRating < 3}
            >
              Take Order
            </Button>
            {userRating < 3 && <Typography variant="body2" color="error">Your rating is too low, you cannot take orders</Typography>}
          </CardContent>
        </OrderCard>
      ))}
      {tab === 1 && myOrders.map((order, index) => (
        <OrderCard key={index}>
          <CardContent>
            <Typography variant="h6">Restaurant: {order.restaurant}</Typography>
            <Typography variant="body2">Delivery Fee: ₩{order.fee}</Typography>
            <Typography variant="body2">Delivery Address: {order.adress}</Typography>
            <Typography variant="body2">Order Time: {order.orderTime}</Typography>
            <Typography variant="body2">Status: {order.status}</Typography>
          </CardContent>
        </OrderCard>
      ))}
    </Box>
  );
};

export default DeliveryPage;
