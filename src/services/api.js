import axios from 'axios';


const API_URL = 'http://localhost:5000';
const API = axios.create({
  baseURL: API_URL,
});


export const signIn = async (email, password) => {
    try {
      const { data } = await API.post(`${API_URL}/api/auth/signin`, { email, password });
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };
  
  export const signUp = async(email, username, password) => {
    try {
      const { data } = await API.post(`${API_URL}/api/auth/signup`, { email, password, username });
      return data;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  }