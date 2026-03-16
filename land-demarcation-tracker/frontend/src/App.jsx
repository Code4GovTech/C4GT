// src/App.jsx
import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bars3Icon } from "@heroicons/react/24/outline";

import Sidebar from "./components/Sidebar";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import { login, logout, setCirclesAndOfficers } from "./store/slices/authSlice";
import { getCircles, getOfficers, getUserUrl } from "./api/url";
import api from "./api/api";
import Dashboard from "./pages/Dashboard";
import PlotManagement from "./pages/PlotManagement";
import DemarcationLogs from "./pages/DemarcationLogs";
import DuplicationUnresolved from "./pages/DuplicationUnresolved";

function AuthLoader({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Fire once on mount
    api
      .get(getUserUrl())
      .then((res) => {
        // On success: interceptor will not have thrown,
        // so we can update our store:
        console.log(`User: ${JSON.stringify(res.data)}`);

        (async function () {
          try {
            const circles = await api.get(getCircles());
            const officers = await api.get(getOfficers());
            console.log(`Officers: ${(officers.data)}`);
            console.log(`Circles: ${circles.data}`);
            dispatch(setCirclesAndOfficers({ circles: circles.data.data, officers: officers.data.data }));
          } catch (error) {
            console.log(`Error fetching circles and officers: ${error}`);
          }
        })();   
        
        dispatch(login({
          user: res.data.data,
          isAuthenticated: true,
        }));
        navigate("/dashboard", { replace: true });
        // Now we know the session is valid—let the app render.
      })
      .catch((err) => {
        // On 401/403, your interceptor already did:
        //   - toast.error(...)
        //   - window.location.href = '/login'
        // But just in case, clear Redux:
        dispatch(logout());
      })
      .finally(() => setChecking(false));
  }, []);

  if (checking) return null;

  return children;
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />

      <AuthLoader>
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar off‑canvas on mobile, fixed on desktop */}
          {isAuthenticated && (
            <Sidebar
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
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
                ${isAuthenticated ? "pt-16 md:pt-0" : ""}
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
              <Route
                path="/dashboard"
                element={
                  isAuthenticated
                    ? <Dashboard />
                    : <Navigate to="/login" replace />
                }
              />

              <Route
                path="/plots"
                element={
                  isAuthenticated
                    ? <PlotManagement />
                    : <Navigate to="/login" replace />
                }
              />  

              <Route
                path="/logs"
                element={
                  isAuthenticated
                    ? <DemarcationLogs />
                    : <Navigate to="/login" replace />
                }
              />  

              <Route
                path="/disputes"
                element={
                  isAuthenticated
                    ? <DuplicationUnresolved />
                    : <Navigate to="/login" replace />
                }
              />  

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
      </AuthLoader>
    </div>
  );
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
  );
}
