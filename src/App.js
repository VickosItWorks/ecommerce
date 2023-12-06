import React from 'react';
import BannerCarousel from './components/BannerCarousel/BannerCarousel';
import './App.css';
import Navbar from './components/NavBar/Navbar';
import Home from './components/Home/Home';
import Category from './components/Category/Category';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Product from './components/Product/Product';
import RegisterUser from './components/User/RegisterUser';
import LoginUser from './components/User/LoginUser';

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <BannerCarousel />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/category" element={<Category />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/login" element={<LoginUser />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
