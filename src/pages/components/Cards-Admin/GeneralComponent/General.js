import React from "react";
import "./General.css";

const General = () => {
  return (
    <div className="container">
      <div className="chart-section">
        <h2>Transaction Chart</h2>
        <div className="chart">
          {/* chart component */}
          <div className="chart-placeholder">Chart</div>
        </div>
      </div>
      <div className="information-section">
        <div className="info-box">
          <h3>General Information Printer</h3>
          <ul>
            <li>
              Total Printer<span>150 machine</span>
            </li>
            <li>
              Number Active Printer<span>100 printer</span>
            </li>
            <li>
              Number of Paper Printed<span>1050 paper</span>
            </li>
            <li>
              Number of Paper Printed current Week<span>412 paper</span>
            </li>
            <li>
              Number of Paper Printed per User<span>43 paper</span>
            </li>
            <li>
              Default Paper<span>20 paper</span>
            </li>
          </ul>
        </div>
        <div className="info-box">
          <h3>General Information User</h3>
          <ul>
            <li>
              Total User<span>20,000 user</span>
            </li>
            <li>
              Number of New User per Week<span>20 user</span>
            </li>
            <li>
              Total Transaction<span>40,000 transaction</span>
            </li>
            <li>
              Number of Transaction per User<span>2 transaction</span>
            </li>
            <li>
              Number of Transaction current Week<span>2011 transaction</span>
            </li>
            <li>
              Top up per Transaction<span>50,000 ₫</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default General;
