import React, { useState } from "react";

const checkNumPageAPI = "http://localhost:4000/checkPage";

const PrinterRightPanel = ({
  selectedPrinterName,
  selectedPrinterModel,
  selectedPrinterID,
  file,
}) => {
  const [formData, setFormData] = useState({
    paperType: "A4",
    numPaper: "",
    numSide: "One Side",
    copies: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //email, printerID, pageSize, doubleSize, numCopy

  const check = async (event) => {
    event.preventDefault();
    if (!selectedPrinterID) {
      alert("Please select a printer");
      return;
    }
    let email = localStorage.getItem("email");
    let userId = localStorage.getItem("userId");
    email = email.replace(/['"]+/g, "");

    userId = userId.replace(/['"]+/g, "");
    userId = parseInt(userId);

    const formData = new FormData();
    formData.append("printFile", file);
    formData.append("userID", userId);
    formData.append("email", email);
    formData.append("printerID", selectedPrinterID);
    formData.append("pageSize", formData.paperType);
    formData.append(
      "doubleSize",
      formData.numSide === "One Side" ? false : true
    );
    formData.append("numCopy", formData.copies);

    const response = await fetch(checkNumPageAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    console.log("formdata", formData);

    //log form
    console.log({
      userId: userId,
      email: email,
      printerID: selectedPrinterID,
      pageSize: formData.paperType,
      doubleSize: formData.numSide === "One Side" ? false : true,
      numCopy: formData.copies,
    });

    const data = await response.json();
    console.log(data);

    if (data.flag) {
      alert("Print success");
    } else {
      localStorage.setItem("activeComponent", "market");
      //refresh page
      window.location.reload(); //chuyển trang market
    }
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

      <form className="print-settings" onSubmit={check}>
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
        <button className="print-button">Print</button>
      </form>
    </div>
  );
};

export default PrinterRightPanel;
