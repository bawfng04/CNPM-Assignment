import React, { useState } from "react";

const checkNumPageAPI = "http://localhost:4000/checkPage";

const PrinterRightPanel = ({
  selectedPrinterName,
  selectedPrinterModel,
  selectedPrinterID,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    paperType: "A4",
    numPaper: "One Side",
    numSide: "",
    copies: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const check = async () => {
    let email = localStorage.getItem("email");
    email = email.replace(/['"]+/g, "");
    const response = await fetch(checkNumPageAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        email: email,
        printerID: selectedPrinterID,
        paperType: formData.paperType,
        numPaper: formData.numPaper,
        numSide: formData.numSide,
        copies: formData.copies,
      }),
    });

    //log the form
    console.log("email: ", email);
    console.log("printerID: ", selectedPrinterID);
    console.log("paperType: ", formData.paperType);
    console.log("numPaper: ", formData.numPaper);
    console.log("numSide: ", formData.numSide);

    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="right-panel">
      <div className="soleSetting">
        <label>Printer Name:</label>
        <span className="aaac">
          {selectedPrinterName === "" && selectedPrinterModel === ""
            ? "Null"
            : selectedPrinterName + " " + selectedPrinterModel}
        </span>
      </div>

      <form className="print-settings">
        <div className="setting">
          <label>Paper Type</label>
          <select
            name="paperType"
            value={formData.paperType}
            onChange={handleChange}
          >
            <option value="A4">A4</option>
            <option value="A5">A5</option>
          </select>
        </div>
        <div className="setting">
          <label>Number of Paper</label>
          <input
            type="number"
            name="numPaper"
            onChange={handleChange}
            required
          />
        </div>
        <div className="setting">
          <label>Number Side</label>
          <select
            name="numSide"
            value={formData.numSide}
            onChange={handleChange}
          >
            <option value="One Side">One Side</option>
            <option value="Double Side">Double Side</option>
          </select>
        </div>
        <div className="setting">
          <label>Copies</label>
          <input type="number" name="copies" onChange={handleChange} required />
        </div>
      </form>

      <div className="soleSetting">
        <label>Print Handing</label>
        <select>
          <option>Scale</option>
          <option>Tile Large Pages</option>
        </select>
      </div>
      <div className="soleSetting">
        <label>Orientation</label>
        <select>
          <option>Portrait</option>
          <option>Landscape</option>
        </select>
      </div>

      <div className="buttons">
        <button className="print-button" onClick={check}>
          Print
        </button>
        <button className="cancel-button">Cancel</button>
      </div>
    </div>
  );
};

export default PrinterRightPanel;
