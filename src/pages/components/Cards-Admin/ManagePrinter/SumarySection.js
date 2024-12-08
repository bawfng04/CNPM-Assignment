import React from "react";
import enPrinter from "../../../images/enPrinter.png";
import disPrinter from "../../../images/disPrinter.png";

const SumarySection = () => {
  const enable = localStorage.getItem("enablePrinters") || 0;
  const disable = localStorage.getItem("disablePrinters") || 0;

  return (
    <div className="summary-section">
      <div className="card">
        <img src={enPrinter} alt="A4" className="paperIcon" />
        <div className="info">
          <h3>Enabled Printers</h3>
          <p>{enable}</p>
        </div>
      </div>
      <div className="card">
        <img src={disPrinter} alt="A3" className="paperIcon" />
        <div className="info">
          <h3>Disabled Printer</h3>
          <p>{disable}</p>
        </div>
      </div>
    </div>
  );
};

export default SumarySection;
