import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h1>BK PRINTER</h1>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>History</li>
            <li>Accounts</li>
            <li>Setting</li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <header>
          <h2>Overview</h2>
          <input type="text" placeholder="Search for something" />
          <div className="header-icons">
            <span>🔧</span>
            <span>👤</span>
          </div>
        </header>
        <section className="identity">
          <h3>My Identify</h3>
          <button>See All</button>
          <div className="identity-details">
            <div className="identity-text">
              <p>Name: </p>
              <p>Student ID: </p>
              <p>Faculty: </p>
              <p>Address: </p>
            </div>
            <img src="profile.jpg" alt="Profile" />
          </div>
        </section>
        <section className="transactions">
          <h3>Recent Transaction</h3>
          <ul>
            <li>
              Deposit <span>+100,000đ</span>
            </li>
            <li>
              Print A4 paper <span>-25,000đ</span>
            </li>
            <li>
              Print A3 paper <span>-30,000đ</span>
            </li>
          </ul>
        </section>
        <section className="charts">
          <div className="weekly-activity">
            <h3>Weekly Activity</h3>
            <div className="chart">[Bar Chart]</div>
          </div>
          <div className="expense-statistics">
            <h3>Expense Statistics</h3>
            <div className="chart">[Pie Chart]</div>
          </div>
        </section>
        <section className="paper-balance">
          <div className="paper-remaining">
            <h3>Paper Remaining</h3>
            <div className="paper-types">
              <div>
                A4 paper <span>51</span>
              </div>
              <div>
                A3 paper <span>12</span>
              </div>
              <div>
                A2 paper <span>19</span>
              </div>
            </div>
          </div>
          <div className="balance-history">
            <h3>Balance History</h3>
            <div className="chart">[Line Chart]</div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
