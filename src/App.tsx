// src/App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
// import DashboardLayout from './layouts/DashboardLayout';
import LandingPage from "./Pages/Home/LandingPage";
import HomePage from "./Pages/Home/HomePage";
import LoginForm from "./Pages/Auth/LoginForm";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import BackgroundManager from "./Pages/Home/BackgroundManager";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./Pages/Home";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken ? <>{children}</> : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  return (
    <Router>
      <BackgroundManager>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          {/* Auth Routes */}
          <Route
            path="/login"
            element={
              <AuthLayout>
                <LoginForm defaultTab="login" />
              </AuthLayout>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthLayout>
                <LoginForm defaultTab="signup" />
              </AuthLayout>
            }
          />
          <Route
            path="/forgotpassword"
            element={
              <AuthLayout>
                <ForgotPassword />
              </AuthLayout>
            }
          />

          {/* Fallback redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BackgroundManager>
    </Router>
  );
};

export default App;
