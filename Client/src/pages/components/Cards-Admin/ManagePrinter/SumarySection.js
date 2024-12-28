import React from "react";
import enPrinter from "../../../images/enPrinter.png";
import disPrinter from "../../../images/disPrinter.png";

const SumarySection = ({ enablePrinters, disablePrinters }) => {
  return (
    <div className="summary-section">
      <div className="card">
        <img src={enPrinter} alt="Enabled Printers" className="paperIcon" />
        <div className="info">
          <h3>Enabled Printers</h3>
          <p>{enablePrinters}</p>
        </div>
      </div>
      <div className="card">
        <img src={disPrinter} alt="Disabled Printers" className="paperIcon" />
        <div className="info">
          <h3>Disabled Printers</h3>
          <p>{disablePrinters}</p>
        </div>
      </div>
    </div>
  );
};

export default SumarySection;
