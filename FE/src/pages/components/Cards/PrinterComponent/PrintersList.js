import React, { useState } from "react";

import PrinterIcon from "../../../images/printerIcon.png";
import nextIcon from "../../../images/nextIcon.png";
import prevIcon from "../../../images/prevIcon.png";

const printers = [
  { id: "CN102101", status: "available" },
  { id: "CN019201", status: "available" },
  { id: "CN102101", status: "processing" },
  { id: "CN102101", status: "fixing" },
  { id: "CN102101", status: "available" },
  { id: "CN102101", status: "processing" },
  { id: "CN102102", status: "available" },
  { id: "CN019202", status: "available" },
  { id: "CN102103", status: "processing" },
  { id: "CN102104", status: "fixing" },
  { id: "CN102101", status: "available" },
  { id: "CN019201", status: "available" },
  { id: "CN102101", status: "processing" },
  { id: "CN102101", status: "fixing" },
  { id: "CN102101", status: "available" },
  { id: "CN102101", status: "processing" },
  { id: "CN102102", status: "available" },
  { id: "CN019202", status: "available" },
  { id: "CN102103", status: "processing" },
  { id: "CN102104", status: "fixing" },
];

const PrintersList = () => {
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
                <div key={`${printer.id}-${index}`} className="printer-item">
                  <img
                    className="printer-icon"
                    src={PrinterIcon}
                    alt="Printer Icon"
                  />
                  <div className="printer-name">Canon 3000</div>
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
