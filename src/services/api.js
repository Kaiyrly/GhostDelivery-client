import axios from 'axios';

const API_URL = 'http://localhost:8080';
const API = axios.create({
  baseURL: API_URL,
});

export const signIn = async (username, password) => {
  try {
    const { data } = await API.post(`${API_URL}/auth/login`, { username, password });
    return data;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const signUp = async(email, username, password) => {
  try {
    const { data } = await API.post(`${API_URL}/register`, { email, password, username });
    return data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
}

export const placeOrder = async (token, order) => {
    console.log(order)
  try {
    const { data } = await API.post(`${API_URL}/orders`, order, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return data;
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
};

export const takeOrder = async (token, orderId, userId) => {
    console.log(userId)
  try {
    const { data } = await API.post(`${API_URL}/orders/${orderId}/take/${userId}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return data;
  } catch (error) {
    console.error('Error taking order:', error);
    throw error;
  }
};

export const completeOrder = async (token, orderId) => {
  try {
    const { data } = await API.post(`${API_URL}/orders/${orderId}/complete`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return data;
  } catch (error) {
    console.error('Error completing order:', error);
    throw error;
  }
};

export const getAllOrders = async (token) => {
  try {
    const { data } = await API.get(`${API_URL}/orders`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return data;
  } catch (error) {
    console.error('Error getting all orders:', error);
    throw error;
  }
};

export const getMenu = async (token, restaurant) => {
  try {
    const { data } = await API.get(`${API_URL}/orders/menu/${restaurant}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return data;
  } catch (error) {
    console.error('Error getting menu:', error);
    throw error;
  }
};

export const getOrdersByUser = async (token, userId) => {
  try {
    const { data } = await API.get(`${API_URL}/orders/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return data;
  } catch (error) {
    console.error('Error getting orders by user:', error);
    throw error;
  }
};

export const getOrdersByRestaurant = async (token, restaurant) => {
  try {
    const { data } = await API.get(`${API_URL}/orders/restaurant/${restaurant}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return data;
  } catch (error) {
    console.error('Error getting orders by restaurant:', error);
    throw error;
  }
};

export const getUserRating = async (userId, token) => {
    try {
      const { data } = await API.get(`/ratings/${userId}/rating`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return data;
    } catch (error) {
      console.error('Error getting user rating:', error);
      throw error;
    }
  };
  
  export const updateUserRating = async (userId, rating, token) => {
    try {
      const { data } = await API.post(`/ratings/${userId}/${rating}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return data;
    } catch (error) {
      console.error('Error updating user rating:', error);
      throw error;
    }
  };
