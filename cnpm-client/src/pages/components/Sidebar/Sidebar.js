import React, { useState } from "react";
import BKPrinter from "../../images/BKPblack.png";
import dashboard from "../../images/dashboard.png";
import dashboardActive from "../../images/dashboardActive.png";
import printer from "../../images/printer.png";
import printerActive from "../../images/printerActive.png";
import market from "../../images/market.png";
import marketActive from "../../images/marketActive.png";
import history from "../../images/history.png";
import historyActive from "../../images/historyActive.png";
import settings from "../../images/settings.png";
import settingsActive from "../../images/settingsActive.png";
import blueBar from "../../images/blueBar.png";

function Sidebar({ setActiveComponent }) {
  const [activeIcon, setActiveIcon] = useState("dashboard");

  const handleDashboard = () => {
    setActiveComponent("dashboard");
    setActiveIcon("dashboard");
  };

  const handlePrinter = () => {
    setActiveComponent("printer");
    setActiveIcon("printer");
  };

  const handleMarket = () => {
    setActiveComponent("market");
    setActiveIcon("market");
  };

  const handleHistory = () => {
    setActiveComponent("history");
    setActiveIcon("history");
  };

  const handleSettings = () => {
    setActiveComponent("settings");
    setActiveIcon("settings");
  };

  return (
    <aside className="sidebar">
      <img src={BKPrinter} alt="BKPrinter" className="BKP"></img>
      <nav className="navBar">
        <ul className="routes">
          <li>
            <button onClick={handleDashboard} className="sidebarButton">
              {activeIcon === "dashboard" ? (
                <div className="iconActive">
                  <img src={blueBar} alt="blueBar" className="blueBar"></img>
                  <img
                    src={dashboardActive}
                    alt="dashboardActive"
                    className="sidebarImg"
                  ></img>
                </div>
              ) : (
                <img
                  src={dashboard}
                  alt="dashboard"
                  className="sidebarImg"
                ></img>
              )}
              Dashboard
            </button>
          </li>
          <li>
            <button onClick={handlePrinter} className="sidebarButton">
              {activeIcon === "printer" ? (
                <div className="iconActive">
                  <img src={blueBar} alt="blueBar" className="blueBar"></img>
                  <img
                    src={printerActive}
                    alt="printerActive"
                    className="sidebarImg"
                  ></img>
                </div>
              ) : (
                <img src={printer} alt="printer" className="sidebarImg"></img>
              )}
              Printer
            </button>
          </li>
          <li>
            <button onClick={handleMarket} className="sidebarButton">
              {activeIcon === "market" ? (
                <div className="iconActive">
                  <img src={blueBar} alt="blueBar" className="blueBar"></img>
                  <img
                    src={marketActive}
                    alt="marketActive"
                    className="sidebarImg"
                  ></img>
                </div>
              ) : (
                <img src={market} alt="market" className="sidebarImg"></img>
              )}
              Market
            </button>
          </li>
          <li>
            <button onClick={handleHistory} className="sidebarButton">
              {activeIcon === "history" ? (
                <div className="iconActive">
                  <img src={blueBar} alt="blueBar" className="blueBar"></img>
                  <img
                    src={historyActive}
                    alt="historyActive"
                    className="sidebarImg"
                  ></img>
                </div>
              ) : (
                <img src={history} alt="history" className="sidebarImg"></img>
              )}
              History
            </button>
          </li>
          <li>
            <button onClick={handleSettings} className="sidebarButton">
              {activeIcon === "settings" ? (
                <div className="iconActive">
                  <img src={blueBar} alt="blueBar" className="blueBar"></img>
                  <img
                    src={settingsActive}
                    alt="settingsActive"
                    className="sidebarImg"
                  ></img>
                </div>
              ) : (
                <img src={settings} alt="settings" className="sidebarImg"></img>
              )}
              Settings
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
