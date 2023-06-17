import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Delivery from './pages/Delivery';
import Order from './pages/Order';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { NavBar } from './components/NavBar'
import { Layout } from './components/Layout'
import Restaurant from './pages/Restaurant'
import useToken from './hooks/useToken';
import PrivateRoute from './PrivateRoute';

 
function App() {
    const { token, setToken } = useToken();
    return (
      <>
        
        <Router>
          {token && <NavBar token={token} setToken={setToken} />}
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<PrivateRoute> <Home /> </PrivateRoute>} />
                <Route path='/delivery' element={<PrivateRoute> <Delivery /> </PrivateRoute>} />
                <Route path='/order' element={<PrivateRoute><Order /> </PrivateRoute>} />
                <Route path='/restaurant/:id' element={<PrivateRoute><Restaurant /> </PrivateRoute>} />
                <Route path='/login' element={<Login token={token} setToken={setToken} />} />
                <Route path='/signup' element={<SignUp />} />
              </Route>
            </Routes>
        </Router>
      </>
    );
}
 
export default App;