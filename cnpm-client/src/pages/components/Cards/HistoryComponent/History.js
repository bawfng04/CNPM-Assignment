import React from "react";
import "./History.css";
import A4 from "../../../images/A4.png";
import A3 from "../../../images/A3.png";
import A1 from "../../../images/A1.png";

const History = () => {
  return (
    <div className="history-container">
      <div className="summary-section">
        <div className="card">
          <img src={A4} alt="A4" className="paperIcon" />
          <div className="info">
            <h3>A4 paper</h3>
            <p>200</p>
          </div>
        </div>
        <div className="card">
          <img src={A3} alt="A3" className="paperIcon" />
          <div className="info">
            <h3>A3 paper</h3>
            <p>49</p>
          </div>
        </div>
        <div className="card">
          <div className="icon purple"></div>
          <div className="info">
            <h3>A2 paper</h3>
            <p>31</p>
          </div>
        </div>
        <div className="card">
          <img src={A1} alt="A1" className="paperIcon" />
          <div className="info">
            <h3>Others</h3>
            <p>89</p>
          </div>
        </div>
      </div>
      <div className="printNfilter">
        <h2>Print History</h2>
        <div className="filters">
          <input type="date" placeholder="Start time" />
          <input type="date" placeholder="End time" />
          <button>Search</button>
        </div>
      </div>

      <table className="history-table">
        <thead>
          <tr>
            <th>SL No</th>
            <th>Printer ID</th>
            <th>File Name</th>
            <th>Start Print</th>
            <th>End Print</th>
            <th>Paper Type</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody className="rounded-tbody">
          {[...Array(10)].map((_, index) => (
            <tr key={index}>
              <td>01.</td>
              <td>#UT01212</td>
              <td>HCMUT_CORE_01.pdf</td>
              <td>10:00,19/09/2024</td>
              <td>10:05,19/09/2024</td>
              <td>A4</td>
              <td>100</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
