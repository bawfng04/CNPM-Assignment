import React, { useState, useEffect } from "react";
import BKPrinter from "../../images/BKPblack.png";
import blueBar from "../../images/blueBar.png";

//admin pages
import general from "../../images/general.png";
import generalActive from "../../images/generalActive.png";
import config from "../../images/config.png";
import configActive from "../../images/configActive.png";
import manageUser from "../../images/manageUser.png";
import manageUserActive from "../../images/manageUserActive.png";
import managePrinter from "../../images/managePrinters.png";
import managePrinterActive from "../../images/managePrintersActive.png";

function AdminSidebar({ activeComponent, setActiveComponent }) {
  const [activeIcon, setActiveIcon] = useState("general");

  useEffect(() => {
    setActiveIcon(activeComponent);
  }, [activeComponent]);


  const handleGeneral = () => {
    setActiveComponent("general");
    setActiveIcon("general");
  };

  const handleConfig = () => {
    setActiveComponent("config");
    setActiveIcon("config");
  };

  const handleManageUser = () => {
    setActiveComponent("manageUser");
    setActiveIcon("manageUser");
  };

  const handleManagePrinter = () => {
    setActiveComponent("managePrinter");
    setActiveIcon("managePrinter");
  };

  return (
    <aside className="sidebar">
      <button onClick={handleGeneral} className="iconButton">
        <img src={BKPrinter} alt="BKPrinter" className="BKP"></img>
      </button>

      <nav className="navBar">
        <ul className="routes">
          <li>
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
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
