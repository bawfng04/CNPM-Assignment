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
import { useNavigate } from "react-router-dom";

const Static = () => {
  const [activeComponent, setActiveComponent] = useState(() => {
    const savedComponent = localStorage.getItem("activeComponent");
    return savedComponent || "dashboard";
  });
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeComponent) {
      case "dashboard":
        localStorage.setItem("activeComponent", "dashboard");
        return <Dashboard />;
      case "printer":
        localStorage.setItem("activeComponent", "printer");
        return <Printer />;
      case "market":
        localStorage.setItem("activeComponent", "market");
        return <Market />;
      case "history":
        localStorage.setItem("activeComponent", "history");
        return <History />;
      case "settings":
        localStorage.setItem("activeComponent", "settings");
        return <Settings />;
      default:
        localStorage.setItem("activeComponent", "dashboard");
        return <Dashboard />;
    }
  };

  //check user role
  useEffect(() => {
    const role = JSON.parse(localStorage.getItem("role"));
    if (role !== "user") {
      window.location.href = "/main/unauthorized";
    }
  }, [navigate]);

  useEffect(() => {
    const activeComponent = localStorage.getItem("activeComponent");
    if (activeComponent) {
      setActiveComponent(activeComponent);
    } else {
      setActiveComponent("dashboard");
    }
  }, []);

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

  // // Update URL
  // useEffect(() => {
  //   const url = `/${activeComponent}`;
  //   window.history.pushState({ path: url }, "", url);
  // }, [activeComponent]);

  return (
    <div className="static">
      <Sidebar
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
      />
      <div className="main-content">
        <Header
          activeComponent={activeComponent}
          setActiveComponent={setActiveComponent}
        />
        <div className="content" key={activeComponent}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Static;
