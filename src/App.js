import React, { createContext, useState } from "react";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/NavBar/Navbar";
import BannerCarousel from "./components/BannerCarousel/BannerCarousel";
import Home from "./components/Home/Home";
import Category from "./components/Category/Category";
import Product from "./components/Product/Product";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import RegisterUser from "./components/User/RegisterUser";
import LoginUser from "./components/User/LoginUser";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import CartCheckout from "./components/CartCheckout/CartCheckout";

export const ProductContext = createContext();
export const CartContext = createContext();
export const UserContext = createContext();

const queryClient = new QueryClient({defaultOptions: {
  queries: {staleTime: 1000*60*5}
}});

function App() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState('');
  const [cart, setCart] = useState({});

  return (
    <QueryClientProvider client={queryClient}>
      <ProductContext.Provider value={{ products, setProducts }}>
        <UserContext.Provider value={{ user, setUser }}>
          <CartContext.Provider value={{ cart, setCart }}>
            <Router>
              <Navbar />
              {/* <BannerCarousel /> */}
              <Routes>
                <Route path="/" element={<Home />} >
                  <Route path="/product" element={<Product />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/category" element={<Category />} />
                  <Route path="/register" element={<RegisterUser />} />
                  <Route path="/cart" element={<ShoppingCart />} />
                  <Route path="/checkout" element={<CartCheckout />} />
                </Route>
                <Route path="/login" element={<LoginUser />} />
              </Routes>
            </Router>
            <ToastContainer />
          </CartContext.Provider>
        </UserContext.Provider>
      </ProductContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
