import React, { useState, useEffect } from "react";

import PrinterIcon from "../../../images/printerIcon.png";
import nextIcon from "../../../images/nextIcon.png";
import prevIcon from "../../../images/prevIcon.png";

const PrinterListAPI = "http://localhost:4000/print/all";

const PrintersList = ({ onSelectPrinter }) => {
  const [printers, setPrinters] = useState([]);

  const handleClickPrinter = (id, name, model) => {
    onSelectPrinter(id, name, model);
  };

  const fetchPrinters = async () => {
    try {
      const response = await fetch(PrinterListAPI, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      let data2 = await response.json();
      let data = data2.data;
      console.log("data: ", data);

      setPrinters(data);
    } catch (error) {
      console.error("Error fetching printers: ", error);
    }
  };

  useEffect(() => {
    fetchPrinters();
  }, []);

  const [currentPage, setCurrentPage] = useState(0);
  const printersPerPage = 6;

  const loadNextPrinters = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const loadPreviousPrinters = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const start = currentPage * printersPerPage;
  const end = start + printersPerPage;
  const currentPrinters = printers.slice(start, end);

  return (
    <div>
      <h2 className="listText">Printers</h2>
      <div className="pc">
        <div className="mainPrinter">
          <div className="printer-list-container">
            {currentPage > 0 && (
              <button
                className="load-more prev-button"
                onClick={loadPreviousPrinters}
              >
                <img
                  src={prevIcon}
                  alt="Previous Icon"
                  className="loadMoreImage"
                />
              </button>
            )}
            <div className="printer-list">
              {currentPrinters.map((printer, index) => (
                <div
                  key={`${printer.id}-${index}`}
                  className="printer-item"
                  onClick={() =>
                    handleClickPrinter(
                      printer.id,
                      printer.brand_name,
                      printer.model
                    )
                  }
                >
                  <img
                    className="printer-icon"
                    src={PrinterIcon}
                    alt="Printer Icon"
                  />
                  <div className="printer-name">
                    {printer.brand_name + " " + printer.model}{" "}
                  </div>
                  <div className="printer-id">#{printer.id}</div>
                  <div className={`printer-status ${printer.status}`}>
                    {printer.status}
                  </div>
                </div>
              ))}
            </div>
            {end < printers.length && (
              <button
                className="load-more next-button"
                onClick={loadNextPrinters}
              >
                <img src={nextIcon} alt="Next Icon" className="loadMoreImage" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintersList;
