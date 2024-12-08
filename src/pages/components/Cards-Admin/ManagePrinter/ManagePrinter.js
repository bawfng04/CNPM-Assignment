import "./ManagePrinter.css";
import React, { useState } from "react";
import SumarySection from "./SumarySection";
import ListPrinter from "./ListPrinter";
import AddPrinter from "./AddPrinter";

const ManagePrinter = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [enablePrinters, setEnablePrinters] = useState(0);
  const [disablePrinters, setDisablePrinters] = useState(0);

  const updatePrinterCounts = (enableCount, disableCount) => {
    setEnablePrinters(enableCount);
    setDisablePrinters(disableCount);
  };

  return (
    <div className="managePrinterContainer">
      <SumarySection
        enablePrinters={enablePrinters}
        disablePrinters={disablePrinters}
      />

      <div className="tabs">
        <div className="tabsDiv">
          <button className="settingsBtn" onClick={() => setActiveTab("list")}>
            <span className={activeTab === "list" ? "underlineText" : ""}>
              Printers List
            </span>
          </button>
          <button className="settingsBtn" onClick={() => setActiveTab("add")}>
            <span className={activeTab === "add" ? "underlineText" : ""}>
              Add Printer
            </span>
          </button>
        </div>
      </div>
      <div key={activeTab} className="SS">
        {activeTab === "list" ? (
          <ListPrinter updatePrinterCounts={updatePrinterCounts} />
        ) : (
          <AddPrinter />
        )}
      </div>
    </div>
  );
};

export default ManagePrinter;
