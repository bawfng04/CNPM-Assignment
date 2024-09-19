import React from "react";
import "./Static.css";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Sidebar/Header";

const Static = () => {
  return (
    <div className="static">
      <Sidebar />
      <div className="main-content">
        <Header />

        <div className="content"></div>
      </div>
    </div>
  );
};

export default Static;
