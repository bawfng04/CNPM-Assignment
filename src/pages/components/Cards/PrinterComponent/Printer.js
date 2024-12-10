import React, { useState } from "react";
import PrinterLeftPanel from "./PrinterLeftPanel";
import PrinterRightPanel from "./PrinterRightPanel";
import PrintersList from "./PrintersList";
import "./Printer.css";

const Printer = () => {
  const [selectedPrinterName, setSelectedPrinterName] = useState("");
  const [selectedPrinterModel, setSelectedPrinterModel] = useState("");
  const [selectedPrinterID, setSelectedPrinterID] = useState("");
  const [file, setFile] = useState("");

  const handleSelectPrinter = (id, name, model) => {
    setSelectedPrinterID(id);
    setSelectedPrinterName(name);
    setSelectedPrinterModel(model);
  };

  const handleSelectFile = (file) => {
    setFile(file);
  };

  return (
    <div className="printer-container">
      <h2>Upload file</h2>

      <div className="printer-main">
        <div className="printer-content">
          <PrinterLeftPanel setFilee={handleSelectFile} />
          <PrinterRightPanel
            selectedPrinterName={selectedPrinterName}
            selectedPrinterModel={selectedPrinterModel}
            selectedPrinterID={selectedPrinterID}
            file={file}
          />
        </div>
        <PrintersList onSelectPrinter={handleSelectPrinter} />
      </div>
    </div>
  );
};


export default Printer;
