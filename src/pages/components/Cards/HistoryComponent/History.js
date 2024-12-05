import React from "react";
import "./History.css";
import A4 from "../../../images/A4.png";
import A3 from "../../../images/A3.png";
// import A1 from "../../../images/A1.png";


const History = () => {
  const a3num = localStorage.getItem("A3plus") || 0;
  const a4num = localStorage.getItem("A4plus") || 0;

  return (
    <div className="history-container">
      <div className="summary-section">
        <div className="card">
          <img src={A4} alt="A4" className="paperIcon" />
          <div className="info">
            <h3>A4 paper</h3>
            <p>{a4num }</p>
          </div>
        </div>
        <div className="card">
          <img src={A3} alt="A3" className="paperIcon" />
          <div className="info">
            <h3>A3 paper</h3>
            <p>{a3num }</p>
          </div>
        </div>

      </div>
      <div className="printNfilter">
        <h2 className="printText">Print History</h2>
        <div className="filters">
          <input type="date" placeholder="Start time" />
          <input type="date" placeholder="End time" />
          <button>Search</button>
        </div>
      </div>
      <div className="table-container">
        <table className="history-table">
          <thead>
            <tr>
              <th className="table-header">SL No</th>
              <th className="table-header">Printer ID</th>
              <th className="table-header">File Name</th>
              <th className="table-header">Start Print</th>
              <th className="table-header">End Print</th>
              <th className="table-header">Paper Type</th>
              <th className="table-header">Quantity</th>
            </tr>
          </thead>
          <tbody className="rounded-tbody">
            {[...Array(10)].map((_, index) => (
              <tr key={index}>
                <td className="table-content">01.</td>
                <td className="table-content">#UT01212</td>
                <td className="table-content">HCMUT_CORE_01.pdf</td>
                <td className="table-content">10:00,19/09/2024</td>
                <td className="table-content">10:05,19/09/2024</td>
                <td className="table-content">A4</td>
                <td className="table-content">100</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
