import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import DashboardLayout from './components/layout/DashboardLayout';
import './i18n';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<div>Dashboard</div>} />
            <Route path="/search" element={<div>Search</div>} />
            <Route path="/analytics" element={<div>Analytics</div>} />
            <Route path="/settings" element={<div>Settings</div>} />
            <Route path="/help" element={<div>Help</div>} />
          </Routes>
        </DashboardLayout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
