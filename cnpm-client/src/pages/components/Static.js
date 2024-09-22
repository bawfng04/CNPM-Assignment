import React, { useState, useEffect } from "react";
import "./Static.css";
//sidebar and header
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Sidebar/Header";
//components in content div
import Dashboard from "./Cards/Dashboard";
import History from "./Cards/History";
import Accounts from "./Cards/Accounts";
import Settings from "./Cards/Settings";
import Printer from "./Cards/PrinterComponent/Printer";

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
      case "printer":
        return <Printer />;
      default:
        return <Dashboard />;
    }
  };

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
