import React from "react";
import BKPrinter from "../../images/BKPblack.png";
import home from "../../images/home.png";
import history from "../../images/history.png";
import accounts from "../../images/accounts.png";
import settings from "../../images/settings.png";

function Sidebar() {
  return (
    <aside className="sidebar">
      <img src={BKPrinter} alt="BKPrinter" className="BKP"></img>
      <nav className="navBar">
        <ul className="routes">
          <li>
            <img src={home} alt="home" className="sidebarImg"></img>
            Dashboard
          </li>
          <li>
            <img src={history} alt="history" className="sidebarImg"></img>
            History
          </li>
          <li>
            <img src={accounts} alt="accounts" className="sidebarImg"></img>
            Accounts
          </li>
          <li>
            <img src={settings} alt="settings" className="sidebarImg"></img>
            Setting
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
