import "./App.css";
import React, { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Login from "./Components/login/Login";
import Register from "./Components/register/Register";
import Dashboard from "./Components/dashboard/Dashboard";
import Profile from "./Components/profile/Profile";

function App() {
  return (
    <BrowserRouter basename="/formassignment/">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
