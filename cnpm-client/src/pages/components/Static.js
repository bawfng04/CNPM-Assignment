import React, { useState, useEffect } from "react";
import "./Static.css";
//sidebar and header
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Sidebar/Header";
//components in content div
import Dashboard from "./Cards/DashboardComponent/Dashboard";
import Printer from "./Cards/PrinterComponent/Printer";
import Market from "./Cards/MarketComponent/Market";
import History from "./Cards/HistoryComponent/History";
import Settings from "./Cards/SettingsComponent/Settings";

const Static = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard");

  const renderContent = () => {
    switch (activeComponent) {
      case "dashboard":
        return <Dashboard />;
      case "printer":
        return <Printer />;
      case "market":
        return <Market />;
      case "history":
        return <History />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  // Re-animation when changing component
  useEffect(() => {
    const contentDiv = document.querySelector(".content");
    contentDiv.classList.add("replaceCard");
    const handleAnimationEnd = () => {
      contentDiv.classList.remove("replaceCard");
    };
    contentDiv.addEventListener("animationend", handleAnimationEnd);
    return () => {
      contentDiv.removeEventListener("animationend", handleAnimationEnd);
    };
  }, [activeComponent]);

  // Update URL
  useEffect(() => {
    const url = `/${activeComponent}`;
    window.history.pushState({ path: url }, "", url);
  }, [activeComponent]);

  return (
    <div className="static">
      <Sidebar setActiveComponent={setActiveComponent} />
      <div className="main-content">
        <Header />
        <div className="content" key={activeComponent}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Static;
