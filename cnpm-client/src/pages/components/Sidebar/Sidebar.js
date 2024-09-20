import React from "react";
import BKPrinter from "../../images/BKPblack.png";
import home from "../../images/home.png";
import history from "../../images/history.png";
import accounts from "../../images/accounts.png";
import settings from "../../images/settings.png";

function Sidebar({ setActiveComponent }) {
  return (
    <aside className="sidebar">
      <img src={BKPrinter} alt="BKPrinter" className="BKP"></img>
      <nav className="navBar">
        <ul className="routes">
          <li>
            <button
              onClick={() => setActiveComponent("dashboard")}
              className="sidebarButton"
            >
              <img src={home} alt="home" className="sidebarImg"></img>
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveComponent("history")}
              className="sidebarButton"
            >
              <img src={history} alt="history" className="sidebarImg"></img>
              History
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveComponent("accounts")}
              className="sidebarButton"
            >
              <img src={accounts} alt="accounts" className="sidebarImg"></img>
              Accounts
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveComponent("settings")}
              className="sidebarButton"
            >
              <img src={settings} alt="settings" className="sidebarImg"></img>
              Settings
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
