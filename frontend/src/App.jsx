import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout & Auth
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import FloatingActions from './components/layout/Floatingactions';

// Admin Pages
import Dashboard from './pages/dashboard/Dashboard';
import CategoryList from './pages/category/CategoryList';
import ProductList from './pages/product/ProductList';
import BlogCategoryList from './pages/blog/BlogCategoryList';
import BlogList from './pages/blog/BlogList';

// Homepage Settings Pages
import HomepageSettingsMaster from './pages/homepage-settings/HomepageSettingsMaster';
import IndustryPageList from './pages/homepage-settings/IndustryPageList';
import IndustryPageSettings from './pages/homepage-settings/IndustryPageSettings';
import ManufacturingSettings from './pages/homepage-settings/ManufacturingSettings';
import AboutSettings from './pages/homepage-settings/AboutSettings';
import LeadershipSettings from './pages/homepage-settings/LeadershipSettings';
import SustainabilitySettings from './pages/homepage-settings/SustainabilitySettings';
import ResourcesSettings from './pages/homepage-settings/ResourcesSettings';
import Settings from './pages/settings/Settings';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/admin" replace />} />
          <Route path="/login" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin/reset-password/:token" element={<ResetPassword />} />
          
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
            <Route path="industry-page" element={<IndustryPageList />} />
            <Route path="industry-page/:id" element={<IndustryPageSettings />} />
            <Route path="manufacturing-page" element={<ManufacturingSettings />} />
            <Route path="about-page" element={<AboutSettings />} />
            <Route path="leadership-page" element={<LeadershipSettings />} />
            <Route path="sustainability-page" element={<SustainabilitySettings />} />
            <Route path="resources-page" element={<ResourcesSettings />} />
            
            
            <Route path="settings" element={<Settings />} />
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
