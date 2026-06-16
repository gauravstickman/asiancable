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
import EventList from './pages/event/EventList';

// Homepage Settings Pages
import HomepageSettingsMaster from './pages/homepage-settings/HomepageSettingsMaster';
import IndustryPageList from './pages/homepage-settings/IndustryPageList';
import IndustryPageSettings from './pages/homepage-settings/IndustryPageSettings';
import ManufacturingSettings from './pages/homepage-settings/ManufacturingSettings';
import AboutSettings from './pages/homepage-settings/AboutSettings';
import LeadershipSettings from './pages/homepage-settings/LeadershipSettings';
import SustainabilitySettings from './pages/homepage-settings/SustainabilitySettings';
import ResourcesSettings from './pages/homepage-settings/ResourcesSettings';
import InvestorSettings from './pages/homepage-settings/InvestorSettings';
import ContactSettings from './pages/homepage-settings/ContactSettings';
import ClienteleSettings from './pages/homepage-settings/ClienteleSettings';
import RpgGroupSettings from './pages/homepage-settings/RpgGroupSettings';
import LifeAtAsianCablesSettings from './pages/homepage-settings/LifeAtAsianCablesSettings';
import CaseStudyList from './pages/case-studies/CaseStudyList';
import CaseStudyForm from './pages/case-studies/CaseStudyForm';
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
            <Route path="events" element={<EventList />} />

            {/* Content Sections */}
            <Route path="homepage-settings" element={<HomepageSettingsMaster />} />
            <Route path="industry-page" element={<IndustryPageList />} />
            <Route path="industry-page/:id" element={<IndustryPageSettings />} />
            <Route path="manufacturing-page" element={<ManufacturingSettings />} />
            <Route path="about-page" element={<AboutSettings />} />
            <Route path="leadership-page" element={<LeadershipSettings />} />
            <Route path="sustainability-page" element={<SustainabilitySettings />} />
            <Route path="resources-page" element={<ResourcesSettings />} />
            <Route path="investor-page" element={<InvestorSettings />} />
            <Route path="contact-page" element={<ContactSettings />} />
            <Route path="clientele-page" element={<ClienteleSettings />} />
            <Route path="rpg-group" element={<RpgGroupSettings />} />
            <Route path="life-at-asian-cables" element={<LifeAtAsianCablesSettings />} />
            <Route path="case-studies" element={<CaseStudyList />} />
            <Route path="case-studies/new" element={<CaseStudyForm />} />
            <Route path="case-studies/edit/:id" element={<CaseStudyForm />} />
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
