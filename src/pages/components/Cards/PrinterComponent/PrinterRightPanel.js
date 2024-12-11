import React, { useState } from "react";

const checkNumPageAPI = "http://localhost:4000/checkPage";

const PrinterRightPanel = ({
  selectedPrinterName,
  selectedPrinterModel,
  selectedPrinterID,
  selectedPrinterStatus,
  file,
  selectedPageOption,
  selectedStartPage,
  selectedEndPage,
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

  const check = async (event) => {
    event.preventDefault();
    if (!selectedPrinterID) {
      alert("Please select a printer");
      return;
    } else if (!file) {
      alert("Please upload a file");
      return;
    }

    let pageNumber = 0;

    if (selectedPageOption === "current-page") {
      pageNumber = 1;
    } else if (selectedStartPage && selectedEndPage) {
      pageNumber = selectedEndPage - selectedStartPage + 1;
    } else {
      alert("Please select a valid page range");
      return;
    }

    // console.log("PAGE NUMBER: ", pageNumber);
    // console.log("selectedPageOption: ", selectedPageOption);
    // console.log("selectedStartPage: ", selectedStartPage);
    // console.log("selectedEndPage: ", selectedEndPage);

    if (selectedPrinterStatus === "disabled") {
      alert("Please select a printer that is not disabled");
      return;
    }
    let email = localStorage.getItem("email");
    let userId = localStorage.getItem("userId");

    email = email.replace(/['"]+/g, "").trim();
    userId = parseInt(userId.replace(/['"]+/g, "").trim());
    // userId = userId.replace(/^\s+|\s+$/gm, "");

    // const formDataToSend = new FormData();
    // formDataToSend.append("printFile", file);
    // formDataToSend.append("userID", userId);
    // formDataToSend.append("email", email);
    // formDataToSend.append("printerID", selectedPrinterID);
    // formDataToSend.append("pageSize", formData.paperType);
    // formDataToSend.append(
    //   "doubleSize",
    //   formData.numSide === "One Side" ? false : true
    // );
    // formDataToSend.append("numCopy", formData.copies);
    // formDataToSend.append("num_pages", pageNumber);

    const formDataToSend = {
      printFile: file.name,
      userID: userId,
      email: email,
      printerID: selectedPrinterID,
      pageSize: formData.paperType,
      doubleSize: formData.numSide === "One Side" ? false : true,
      numCopy: formData.copies,
      num_pages: pageNumber,
    };

    try {
      const response = await fetch(checkNumPageAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        // body: formDataToSend,
        body: JSON.stringify(formDataToSend),
      });

      console.log("Form data to send", formDataToSend);
      console.log(
        "File:",
        file,
        "userID:",
        userId,
        "email:",
        email,
        "printerID:",
        selectedPrinterID,
        "pageSize:",
        formData.paperType,
        "doubleSize:",
        formData.numSide === "One Side" ? false : true,
        "numCopy:",
        formData.copies,
        "num_pages:",
        pageNumber
      );

      console.log("UID:", userId);

      const data = await response.json();
      if (data) {
        if (data.flag) {
          alert("Print success!");
        } else {
          // localStorage.setItem("activeComponent", "market");
          // window.location.reload();
          console.log("Route 2");
          console.log("data", data);
        }
      }
    } catch (error) {
      console.error("Error:", error);
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
