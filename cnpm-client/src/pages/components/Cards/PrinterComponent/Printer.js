import React from "react";
import PrinterLeftPanel from "./PrinterLeftPanel";
import PrinterRightPanel from "./PrinterRightPanel";
import PrintersList from "./PrintersList";
import "./Printer.css";

const Printer = () => {
  return (
    <div className="printer-container">
      <h2>Upload file</h2>
      <div className="printer-main">
        <div className="printer-content">
          <PrinterLeftPanel />
          <PrinterRightPanel />
        </div>
        <div className="list-printer"></div>
        <PrintersList />
      </div>
    </div>
  );
};

export default Printer;
