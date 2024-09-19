import React, { useState } from "react";
import "./Static.css";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Sidebar/Header";
//components
import Dashboard from "./Dashboard";
import History from "./History";
import Accounts from "./Accounts";
import Settings from "./Settings";

const Static = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard");

  const renderContent = () => {
    switch (activeComponent) {
      case "dashboard":
        return <Dashboard />;
      case "history":
        return <History />;
      case "accounts":
        return <Accounts />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="static">
      <Sidebar setActiveComponent={setActiveComponent} />
      <div className="main-content">
        <Header />
        <div className="content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Static;
