import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import BannerCarousel from "./components/BannerCarousel/BannerCarousel";
import Navbar from "./components/NavBar/Navbar";
import Home from "./components/Home/Home";
import Category from "./components/Category/Category";
import Product from "./components/Product/Product";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import RegisterUser from "./components/User/RegisterUser";


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <BannerCarousel />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/category" element={<Category />} />
          <Route path="/register" element={<RegisterUser />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
