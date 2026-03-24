import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./context/ProtectedRoute"; 
import Login from "./features/auth/Login";
import Dashboard from "./features/analytics/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      />
      <Route index element={<Navigate to="/dashboard" />} />
      <Route path="dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
