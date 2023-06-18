import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { styled } from '@mui/system';
import useToken from '../hooks/useToken';
import { restaurants } from '../constants';
import { placeOrder, getUserRating } from '../services/api';
import { getUserIdFromToken } from '../helpers';


const Title = styled(Typography)({
  fontSize: '24px',
  fontWeight: 'bold',
});

const FoodCard = styled(Card)({
  display: 'flex',
  marginBottom: '10px',
});

const FoodDetails = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const OrderButton = styled(Button)({
  alignSelf: 'flex-end',
});

const Restaurant = () => {
    const { token, setToken } = useToken();
    const params = useParams();
    const id = params.id;
    const [order, setOrder] = useState({});
    const [fee, setFee] = useState(2000);
    const [comments, setComments] = useState("");
    const [address, setAddress] = useState("");
    const [userRating, setUserRating] = useState(0);

    useEffect(() => {
    const fetchRating = async () => {
        const userId = getUserIdFromToken(token);
        try {
        const rating = await getUserRating(userId, token); // Replace getUserRating with your actual function
        setUserRating(rating);
        } catch(error) {
        console.log(error);
        }
    };
    fetchRating();
    }, [token]);

    const restaurant = restaurants[id];

    const handleOrderChange = (item, change) => {
        setOrder(prevOrder => ({
        ...prevOrder,
        [item.title]: Math.max((prevOrder[item.title] || 0) + change, 0),
        }));
    };

    const handleOrder = async () => {
        const userId = getUserIdFromToken(token);
        const orderr = {restaurant: restaurant.title, itemQuantities: order, fee: fee, comments: comments, userId: userId, address: address};
        try {
            const data = await placeOrder(token, orderr);
            console.log(data);
        } catch(error) {
            console.log(error);
        }

    }

    return (
        <Box sx={{ padding: '20px' }}>
        <Title>{restaurant.title}</Title>
        {restaurant.menu.map((item) => (
            <FoodCard key={item.title}>
            {/* {item.image && <CardMedia component="img" image={item.image} />} */}
            <FoodDetails>
                <Typography variant="h5">{item.title}</Typography>
                <Typography variant="body2">₩{item.price}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Button onClick={() => handleOrderChange(item, -1)}>-</Button>
                    <Typography>{order[item.title] || 0}</Typography>
                    <Button onClick={() => handleOrderChange(item, 1)}>+</Button>
                </Box>
                </Box>
            </FoodDetails>
            </FoodCard>
        ))}
        <TextField
            margin="normal"
            required
            fullWidth
            id="fee"
            label="Enter the fee"
            name="fee"
            autoComplete="fee"
            autoFocus
            onChange = {event => setFee(event.target.value)}
        />
        <TextField
            margin="normal"
            required
            fullWidth
            id="comments"
            label="Add comments"
            name="comments"
            autoComplete="comments"
            autoFocus
            onChange = {event => setComments(event.target.value)}
        />
        <TextField
            margin="normal"
            required
            fullWidth
            id="address"
            label="Add address"
            name="address"
            autoComplete="address"
            autoFocus
            onChange = {event => setAddress(event.target.value)}
        />
            <OrderButton 
                variant="contained" 
                color="primary" 
                onClick={handleOrder} 
                disabled={userRating < 3}  // Disable button if rating is less than 3
            >
                Order
            </OrderButton>
            {userRating < 3 && <Typography variant="body2" color="error">Your rating is too low, you cannot place orders</Typography>}
        </Box>
    );
};

export default Restaurant;
