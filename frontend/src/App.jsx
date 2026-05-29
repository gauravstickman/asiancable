import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout & Auth
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './pages/auth/Login';
import FloatingActions from './components/layout/Floatingactions';

// Admin Pages
import Dashboard from './pages/dashboard/Dashboard';
import CategoryList from './pages/category/CategoryList';
import ProductList from './pages/product/ProductList';
import BlogCategoryList from './pages/blog/BlogCategoryList';
import BlogList from './pages/blog/BlogList';

// Homepage Settings Pages
import HomepageSettingsMaster from './pages/homepage-settings/HomepageSettingsMaster';
import IndustryPageSettings from './pages/homepage-settings/IndustryPageSettings';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/admin" replace />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Admin Routes */}
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
            <Route path="blog-categories" element={<BlogCategoryList />} />
            <Route path="blogs" element={<BlogList />} />

            {/* Content Sections */}
            <Route path="homepage-settings" element={<HomepageSettingsMaster />} />
            <Route path="industry-page" element={<IndustryPageSettings />} />
          </Route>
        </Routes>
        
        <FloatingActions />
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
