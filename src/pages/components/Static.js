import React from "react";
import "./Static.css";

const Static = () => {
  return (
    <div className="static">
      <aside className="sidebar">
        <h1>BK PRINTER.</h1>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>History</li>
            <li>Accounts</li>
            <li>Setting</li>
          </ul>
        </nav>
      </aside>
      <div className="main-content">
        <header className="header">
          <h2>Overview</h2>
          <input type="text" placeholder="Search for something" />
          <div className="header-icons">
            <span>🔧</span>
            <span>👤</span>
          </div>
        </header>
        <div className="content">{/* Add your main content here */}</div>
      </div>
    </div>
  );
};

export default Static;
