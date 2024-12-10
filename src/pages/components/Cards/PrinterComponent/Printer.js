import React, { useState } from "react";
import PrinterLeftPanel from "./PrinterLeftPanel";
import PrinterRightPanel from "./PrinterRightPanel";
import PrintersList from "./PrintersList";
import "./Printer.css";

const Printer = () => {
  const [selectedPrinterName, setSelectedPrinterName] = useState("");
  const [selectedPrinterModel, setSelectedPrinterModel] = useState("");
  const [selectedPrinterID, setSelectedPrinterID] = useState("");

  const handleSelectPrinter = (id, name, model) => {
    setSelectedPrinterID(id);
    setSelectedPrinterName(name);
    setSelectedPrinterModel(model);
  };

  return (
    <div className="printer-container">
      <h2>Upload file</h2>
      <div className="printer-main">
        <div className="printer-content">
          <PrinterLeftPanel />
          <PrinterRightPanel
            selectedPrinterName={selectedPrinterName}
            selectedPrinterModel={selectedPrinterModel}
            selectedPrinterID={selectedPrinterID}
          />
        </div>
        <div className="list-printer"></div>
        <PrintersList onSelectPrinter={handleSelectPrinter} />
      </div>
    </div>
  );
};

export default Printer;
