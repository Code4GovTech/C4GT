// src/App.jsx
import React, { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Bars3Icon } from '@heroicons/react/24/outline'

import Sidebar from './components/Sidebar'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
// import protected pages as needed
// import Dashboard from './pages/Dashboard'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar off‑canvas on mobile, fixed on desktop */}
        {isAuthenticated && (
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}

        {/* Main content area */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Mobile header with hamburger */}
          {isAuthenticated && (
            <header className="md:hidden fixed inset-x-0 top-0 z-20 flex items-center justify-between px-4 h-16 bg-white border-b">
              <button onClick={() => setSidebarOpen(true)}>
                <Bars3Icon className="w-6 h-6 text-gray-700" />
              </button>
              <span className="text-lg font-semibold">Land Tracker</span>
              <div /> {/* spacer */}
            </header>
          )}

          {/* Scrollable main */}
          <main
            className={`
              flex-1 overflow-auto bg-slate-50
              ${isAuthenticated ? 'pt-16 md:pt-0' : ''}
            `}
          >
            <Routes>
              {/* Public routes */}
              <Route
                path="/login"
                element={
                  <PageWrapper showTitle={!isAuthenticated}>
                    <LoginPage />
                  </PageWrapper>
                }
              />
              <Route
                path="/register"
                element={
                  <PageWrapper showTitle={!isAuthenticated}>
                    <RegisterPage />
                  </PageWrapper>
                }
              />

              {/* Protected routes */}
              {isAuthenticated && (
                <>
                  {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                  {/* ...other protected routes */}
                </>
              )}

              {/* Fallback */}
              <Route
                path="/"
                element={
                  isAuthenticated ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  )
}

/**
 * Optional wrapper to show a title above public pages
 */
function PageWrapper({ showTitle, children }) {
  return (
    <div className="min-h-full flex flex-col items-center justify-center px-4 py-8">
      {showTitle && (
        <h1 className="mb-8 text-4xl font-bold text-blue-900">
          Land Demarcation Tracker
        </h1>
      )}
      <div className="w-full max-w-md">{children}</div>
    </div>
  )
}
