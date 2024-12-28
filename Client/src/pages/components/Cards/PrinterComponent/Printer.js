import React, { useState } from "react";
import PrinterLeftPanel from "./PrinterLeftPanel";
import PrinterRightPanel from "./PrinterRightPanel";
import PrintersList from "./PrintersList";
import "./Printer.css";

const Printer = () => {
  const [selectedPrinterName, setSelectedPrinterName] = useState("");
  const [selectedPrinterModel, setSelectedPrinterModel] = useState("");
  const [selectedPrinterID, setSelectedPrinterID] = useState("");
  const [selectedPrinterStatus, setSelectedPrinterStatus] = useState("");
  //
  const [file, setFile] = useState("");
  //
  const [pageOption, setPageOption] = useState("current-page");
  const [startPage, setStartPage] = useState("");
  const [endPage, setEndPage] = useState("");

  const handleSelectPrinter = (id, name, model, status) => {
    setSelectedPrinterID(id);
    setSelectedPrinterName(name);
    setSelectedPrinterModel(model);
    setSelectedPrinterStatus(status);
  };

  const handleSelectFile = (file) => {
    setFile(file);
  };

  const handlePages = (option, start, end) => {
    console.log("handlePages called with:", option, start, end);
    setPageOption(option);
    setStartPage(start);
    setEndPage(end);
  };

  return (
    <div className="printer-container">
      <h2>Upload file</h2>

      <div className="printer-main">
        <div className="printer-content">
          <PrinterLeftPanel
            setFilee={handleSelectFile}
            handlePages={handlePages}
          />
          <PrinterRightPanel
            selectedPrinterName={selectedPrinterName}
            selectedPrinterModel={selectedPrinterModel}
            selectedPrinterID={selectedPrinterID}
            selectedPrinterStatus={selectedPrinterStatus}
            file={file}
            selectedPageOption={pageOption}
            selectedStartPage={startPage}
            selectedEndPage={endPage}
          />
        </div>
        <PrintersList onSelectPrinter={handleSelectPrinter} />
      </div>
    </div>
  );
};


export default Printer;
