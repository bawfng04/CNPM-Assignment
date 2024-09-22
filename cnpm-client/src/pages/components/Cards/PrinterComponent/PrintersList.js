import React, { useState } from "react";

import PrinterIcon from "../../../images/printerIcon.png";
import nextIcon from "../../../images/nextIcon.png";

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
];

const PrintersList = () => {
  const [visiblePrinters, setVisiblePrinters] = useState(4);
  const loadMorePrinters = () => {
    setVisiblePrinters((prev) => Math.min(prev + 2, printers.length));
  };
  return (
    <div className="printer-list">
      {printers.map((printer, index) => (
        <div key={index} className="printer-item">
          <img className="printer-icon" src={PrinterIcon} alt="Printer Icon" />
          <div className="printer-name">Canon 3000</div>
          <div className="printer-id">#{printer.id}</div>
          <div className={`printer-status ${printer.status}`}>
            {printer.status}
          </div>
        </div>
      ))}
      {visiblePrinters < printers.length && (
        <button className="load-more" onClick={loadMorePrinters}>
          <img src={nextIcon} alt="Next Icon" className="loadMoreImage" />
        </button>
      )}
    </div>
  );
};

export default PrintersList;
