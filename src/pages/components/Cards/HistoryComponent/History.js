import React, { useState, useEffect } from "react";
import "./History.css";

const fetchHistoryAPI = "http://localhost:4000/order/all";

const History = () => {
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [visibleItems, setVisibleItems] = useState(10); // New state variable

  const fetchHistory = async () => {
    try {
      let email = localStorage.getItem("email");
      email = email.replace(/['"]+/g, "");
      const response = await fetch(fetchHistoryAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setHistory(data.data);
      setFilteredHistory(data.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    filterHistory();
  }, [startTime, endTime, history]);

  const filterHistory = () => {
    const filtered = history.filter((item) => {
      const itemStartTime = new Date(item.start_time);
      const itemEndTime = new Date(item.end_time);
      const start = startTime ? new Date(startTime) : null;
      const end = endTime ? new Date(endTime) : null;
      return (!start || itemStartTime >= start) && (!end || itemEndTime <= end);
    });
    setFilteredHistory(filtered);
    setVisibleItems(10); // Reset visible items when filter changes
  };

  const showMoreItems = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 10);
  };

  return (
    <div className="history-container">
      <div className="summary-section">
        {/* Summary cards can be added here */}
      </div>
      <div className="printNfilter">
        <h2 className="printText">Print History</h2>
        <div className="filters">
          <input
            type="date"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            placeholder="Start time"
          />
          <input
            type="date"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            placeholder="End time"
          />
        </div>
      </div>
      <div className="table-container">
        <table className="history-table">
          <thead>
            <tr>
              <th className="table-header">No.</th>
              <th className="table-header">Printer ID</th>
              <th className="table-header">File Name</th>
              <th className="table-header">Start Time</th>
              <th className="table-header">End Time</th>
              <th className="table-header">Pages Printed</th>
              <th className="table-header">Number of Copies</th>
            </tr>
          </thead>
          <tbody className="rounded-tbody">
            {Array.isArray(filteredHistory) && filteredHistory.length > 0 ? (
              filteredHistory.slice(0, visibleItems).map((item, index) => (
                <tr key={index}>
                  <td className="table-data">{index + 1}</td>
                  <td className="table-data">{item.printer_id}</td>
                  <td className="table-data">{item.file_name}</td>
                  <td className="table-data">{item.start_time}</td>
                  <td className="table-data">{item.end_time}</td>
                  <td className="table-data">{item.pages_printed}</td>
                  <td className="table-data">{item.num_copies}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="table-data">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {visibleItems < filteredHistory.length && (
          <div className="smContainer">
            <button onClick={showMoreItems} className="show-more-button">
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
