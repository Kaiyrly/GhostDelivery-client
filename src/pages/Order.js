import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Container, TextField, Box, Tab, Tabs, Button, Card, CardContent, Typography, } from '@mui/material';
import { styled } from '@mui/system';
import RestaurantList from '../components/RestaurantList';
import { getOrdersByUser, completeOrder, updateUserRating } from '../services/api';
import useToken from '../hooks/useToken';
import { getUserIdFromToken } from '../helpers';

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

const OrderCard = styled(Card)({
  marginBottom: '10px',
});

const OrderList = ({ orders, orderComplete }) => {
  return (
    <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>My Orders</h2>
      {orders.map((order, index) => (
        <OrderCard key={index}>
          <CardContent>
            <Typography variant="h6">Restaurant: {order.restaurant}</Typography>
            <Typography variant="body2">Delivery Fee: ₩{order.fee}</Typography>
            <Typography variant="body2">Delivery Address: {order.adress}</Typography>
            <Typography variant="body2">Order Time: {order.orderTime}</Typography>
            <Typography variant="body2">Status: {order.status}</Typography>
            {order.status === 'IN_PROGRESS' && <Button variant="contained" color="primary" onClick={() => orderComplete(order)}>
              Order Completed!
            </Button>}
          </CardContent>
        </OrderCard>
      ))}
    </Box>
  );
};


const Order = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [userOrders, setUserOrders] = useState([]);
  const { token } = useToken();
  const userId = getUserIdFromToken(token);
  const [open, setOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState(5); // default rating
  const [completedOrder, setCompletedOrder] = useState({});

  const handleOpen = (order) => {
    setCompletedOrder(order)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
  };

  const handleSubmitRating = async (order) => {
    console.log(order.delivererId)
    try {
      const data = await updateUserRating(order.delivererId, selectedRating, token);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      handleClose();
    }
  }


  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const orders = await getOrdersByUser(token, userId);
        setUserOrders(orders);
      } catch (error) {
        console.error('Error fetching user orders:', error);
      }
    };
  
    fetchUserOrders();
  }, [token]);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const orderComplete = async (order) => {
    console.log(order)
    try {
      const data = await completeOrder(token, order.id);
      console.log(data);
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <Box sx={{ padding: '20px' }}>
      <Box sx={{ textAlign: 'center' }}>
        <Title>Order</Title>
      </Box>
      <SearchContainer maxWidth="md">
        <SearchField type="search" id="search" label="Search" />
      </SearchContainer>
      <Box sx={{ marginTop: '20px' }}>
        <Tabs value={currentTab} onChange={handleTabChange} centered>
          <Tab label="Restaurants" />
          <Tab label="My Orders" />
        </Tabs>
        {currentTab === 0 && <RestaurantList />}
        {currentTab === 1 && <OrderList orders={userOrders} orderComplete={(order) => { orderComplete(order); handleOpen(order); }}/>}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Rate the deliverer</DialogTitle>
          <DialogContent>
            <RadioGroup
              aria-label="deliverer-rating"
              name="deliverer-rating"
              value={selectedRating}
              onChange={handleRatingChange}
            >
              <FormControlLabel value="1" control={<Radio />} label="1" />
              <FormControlLabel value="2" control={<Radio />} label="2" />
              <FormControlLabel value="3" control={<Radio />} label="3" />
              <FormControlLabel value="4" control={<Radio />} label="4" />
              <FormControlLabel value="5" control={<Radio />} label="5" />
            </RadioGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleSubmitRating(completedOrder)} color="primary">
              Submit Rating
            </Button>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Order;
