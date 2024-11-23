import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Cards/DashboardComponent/Dashboard";
import Static from "./components/Static";
import AdminStatic from "./components/AdminStatic";
function Main() {
  return (
    <div className="mainDiv">
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
      <Routes>
        <Route path="user" element={<Static />} />
      </Routes>
      <Routes>
        <Route path="admin" element={<AdminStatic />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Static />} />
      </Routes>

    </div>
  );
}

export default Main;
