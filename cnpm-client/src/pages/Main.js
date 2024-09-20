import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Cards/Dashboard";
import Static from "./components/Static";

function Main() {
  return (
    <div className="mainDiv">
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
      <Static />
    </div>
  );
}

export default Main;
