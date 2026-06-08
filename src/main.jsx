import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import LoginPage from './admin/pages/LoginPage'
import AdminApp from './admin/AdminApp'
import ProtectedRoute from './admin/components/ProtectedRoute'
import DashboardPage from './admin/pages/DashboardPage'
import LeadsPage from './admin/pages/LeadsPage'
import LeadDetailPage from './admin/pages/LeadDetailPage'
import AdmissionsPage from './admin/pages/AdmissionsPage'
import AnalyticsPage from './admin/pages/AnalyticsPage'
import ContactsPage from './admin/pages/ContactsPage'
import SettingsPage from './admin/pages/SettingsPage'
import BannersPage from './admin/pages/BannersPage'
import { AuthProvider } from './admin/context/AuthContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<App />} />

          {/* Admin Login */}
          <Route path="/admin/login" element={<LoginPage />} />

          {/* Admin Dashboard Section */}
          <Route path="/admin" element={<ProtectedRoute><AdminApp /></ProtectedRoute>}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="leads" element={<LeadsPage />} />
            <Route path="leads/:id" element={<LeadDetailPage />} />
            <Route path="admissions" element={<AdmissionsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="contacts" element={<ContactsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="banners" element={<BannersPage />} />
          </Route>

          {/* Fallback route redirection */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)

