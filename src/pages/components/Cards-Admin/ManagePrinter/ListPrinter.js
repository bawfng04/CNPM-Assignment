import React, { useState, useEffect } from "react";

const PrinterListAPI = "http://localhost:4000/admin/getPrinters";

const ListPrinter = () => {
  const [printers, setPrinters] = useState([]);

  function isChecked(abc) {
    if (abc && abc.status) {
      return true;
    }
    return false;
  }

  useEffect(() => {
    const fetchPrinters = async () => {
      const response = await fetch(PrinterListAPI, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      let data = await response.json();
      data = data.data;
      setPrinters(data);
    };
    fetchPrinters();
  }, []);

  return (
    <div className="history-container">
      <div className="printNfilter">
        <h2 className="printTextz">Printers list</h2>
      </div>
      <div className="table-container">
        <table className="history-table">
          <thead>
            <tr>
              <th className="table-header">SL No</th>
              <th className="table-header">Printer ID</th>
              <th className="table-header">Printer Name</th>
              <th className="table-header">Status</th>
              <th className="table-header">Delete</th>
              <th className="table-header">Detail</th>
            </tr>
          </thead>
          <tbody className="rounded-tbody">
            {Array.isArray(printers) && printers.length > 0 ? (
              printers.map((printer, index) => (
                <tr key={printer.id}>
                  <td className="table-data">{printer.id}</td>
                  <td className="table-data">{printer.brand_name}</td>
                  <td className="table-data">{printer.model}</td>
                  {/* <td className="table-data">{printer.status}</td> */}
                  <td className="table-data checkbox-cell">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={isChecked(printer)}
                        readOnly
                      />
                      <span className="slider round"></span>
                    </label>
                  </td>
                  <td className="table-data">
                    <button className="delete-btn">Delete</button>
                  </td>
                  <td className="table-data">
                    <button className="delete-btn2">Detail</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="table-data">
                  No printers available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListPrinter;
