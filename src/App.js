import './App.css';
import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './views/Dashboard';
import Categories from './views/Categories';
import Cars from './views/Cars';
import PrivateRoutes from './routes/PrivateRoutes';


function App() {
  return (

    <Routes>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cars" element={<Cars />} />
      </Route>


    </Routes>

  );
}

export default App;
