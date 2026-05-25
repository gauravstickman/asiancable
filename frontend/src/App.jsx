import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout & Auth
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './pages/auth/Login';

// Website Pages
import Home from './pages/website/Homepage/Homepage';
import About from './pages/website/About';
import Contact from './pages/website/Contact';
import Dashboard from './pages/dashboard/Dashboard';
import CategoryList from './pages/category/CategoryList';
import ProductList from './pages/product/ProductList';
import Product from './pages/website/Products/Product';
import Industy from './pages/website/Industries/IndustryPage';
import RevealProvider from "./hooks/RevealProvider";
function App() {

  return (
    <>
  
    <Router>
        <RevealProvider/>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        {/* Protected Admin Routes */}
        <Route path="/products" element={<Product />} />
        <Route path="/industry" element={<Industy />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="categories" element={<CategoryList />} />
          <Route path="products" element={<ProductList />} />
        </Route>
      </Routes>
      
      <ToastContainer 
        position="bottom-right"
        theme="dark"
        autoClose={3000}
      />
    </Router>
    </>
  );
}

export default App;
