import React, { useState, useEffect } from "react";
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


function Sidebar({ activeComponent, setActiveComponent }) {
  const [activeIcon, setActiveIcon] = useState("dashboard");

  useEffect(() => {
    setActiveIcon(activeComponent);
  }, [activeComponent]);

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
      <button onClick={handleDashboard} className="iconButton">
        <img src={BKPrinter} alt="BKPrinter" className="BKP"></img>
      </button>

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
              <span className={activeIcon === "dashboard" ? "boldText" : ""}>
                Dashboard
              </span>
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
              <span className={activeIcon === "printer" ? "boldText" : ""}>
                Printer
              </span>
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
              <span className={activeIcon === "market" ? "boldText" : ""}>
                Market
              </span>
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
              <span className={activeIcon === "history" ? "boldText" : ""}>
                History
              </span>
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
              <span className={activeIcon === "settings" ? "boldText" : ""}>
                Settings
              </span>
            </button>
          </li>

          {/* <li>
            <button onClick={handleGeneral} className="sidebarButton">
              {activeIcon === "general" ? (
                <div className="iconActive">
                  <img src={blueBar} alt="blueBar" className="blueBar"></img>
                  <img
                    src={generalActive}
                    alt="generalActive"
                    className="sidebarImg"
                  ></img>
                </div>
              ) : (
                <img src={general} alt="general" className="sidebarImg"></img>
              )}
              <span className={activeIcon === "general" ? "boldText" : ""}>
                General
              </span>
            </button>
          </li>

          <li>
            <button onClick={handleConfig} className="sidebarButton">
              {activeIcon === "config" ? (
                <div className="iconActive">
                  <img src={blueBar} alt="blueBar" className="blueBar"></img>
                  <img
                    src={configActive}
                    alt="configActive"
                    className="sidebarImg"
                  ></img>
                </div>
              ) : (
                <img src={config} alt="config" className="sidebarImg"></img>
              )}
              <span className={activeIcon === "config" ? "boldText" : ""}>
                Config
              </span>
            </button>
          </li>

          <li>
            <button onClick={handleManageUser} className="sidebarButton">
              {activeIcon === "manageUser" ? (
                <div className="iconActive">
                  <img src={blueBar} alt="blueBar" className="blueBar"></img>
                  <img
                    src={manageUserActive}
                    alt="manageUserActive"
                    className="sidebarImg"
                  ></img>
                </div>
              ) : (
                <img
                  src={manageUser}
                  alt="manageUser"
                  className="sidebarImg"
                ></img>
              )}
              <span className={activeIcon === "manageUser" ? "boldText" : ""}>
                Manage User
              </span>
            </button>
          </li>
          <li>
            <button onClick={handleManagePrinter} className="sidebarButton">
              {activeIcon === "managePrinter" ? (
                <div className="iconActive">
                  <img src={blueBar} alt="blueBar" className="blueBar"></img>
                  <img
                    src={managePrinterActive}
                    alt="managePrinterActive"
                    className="sidebarImg"
                  ></img>
                </div>
              ) : (
                <img
                  src={managePrinter}
                  alt="managePrinter"
                  className="sidebarImg"
                ></img>
              )}
              <span
                className={activeIcon === "managePrinter" ? "boldText" : ""}
              >
                Manage Printers
              </span>
            </button>
          </li> */}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
