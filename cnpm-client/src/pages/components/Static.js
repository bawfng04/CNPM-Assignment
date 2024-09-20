import React, { useState, useEffect } from "react";
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
