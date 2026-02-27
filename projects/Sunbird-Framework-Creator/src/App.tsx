import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FrameworkProvider } from './contexts/FrameworkContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import CreateFramework from './pages/CreateFramework';
import EditFramework from './pages/EditFramework';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <NotificationProvider>
        <FrameworkProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/create" element={<CreateFramework />} />
              <Route path="/edit/:id" element={<EditFramework />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </FrameworkProvider>
      </NotificationProvider>
    </Router>
  );
}

export default App;