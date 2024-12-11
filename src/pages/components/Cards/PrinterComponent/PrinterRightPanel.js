import React, { useState, useEffect } from "react";

const checkNumPageAPI = "http://localhost:4000/checkPage";


const PrintAPI = "http://localhost:4000/createOrder";

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
    paperType: localStorage.getItem("pageSize") || "A4",
    numPaper: "",
    numSide: localStorage.getItem("doubleSize") || "One Side",
    copies: localStorage.getItem("numCopy") || 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (localStorage.getItem("printFlag") === "false") {
      // Restore values then clear storage
      localStorage.removeItem("pageSize");
      localStorage.removeItem("doubleSize");
      localStorage.removeItem("numCopy");
      localStorage.removeItem("printFlag");
      localStorage.removeItem("printerID");
      localStorage.removeItem("num_pages");
    }
  }, []);

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
      if (selectedStartPage > selectedEndPage) {
        alert("Please select a valid page range");
        return;
      }
      pageNumber = selectedEndPage - selectedStartPage + 1;
    } else {
      alert("Error");
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
      fileName: file.name,
      fileSize: file.size,
      userID: userId,
      email: email,
      printerID: selectedPrinterID,
      pageSize: formData.paperType,
      doubleSize: formData.numSide === "One Side" ? false : true,
      numCopy: formData.copies,
      num_pages: pageNumber,
    };

    console.log("FILE: ", file);

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

      console.log("UID:", userId);

      const data = await response.json();
      if (data) {
        if (data.flag) {
          // nếu in thành công

          const print = async () => {
            try {
              const response = await fetch(PrintAPI, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(formDataToSend),
              });
              console.log("form data to send", formDataToSend);
              const data = await response.json();
              console.log("data::: ", data);
              if (data.statusCode === 200) {
                alert("Print success");
              } else {
                alert("Print fail");
              }
            } catch (error) {
              console.error("Error:", error);
            }
          };

          print();
        } else if (!data.flag) {
          // nếu in không thành công
          // lấy trang a3 a4 cần mua
          let a3 = data.pageA3 || 0;
          let a4 = data.pageA4 || 0;

          localStorage.setItem("A3numToBuy", a3);
          localStorage.setItem("A4numToBuy", a4);
          localStorage.setItem("printFlag", "true");
          localStorage.setItem("activeComponent", "market");
          //lưu thông tin form vào local storage
          localStorage.setItem("printerID", selectedPrinterID);
          localStorage.setItem("pageSize", formData.paperType);
          localStorage.setItem("doubleSize", formData.numSide);
          localStorage.setItem("numCopy", formData.copies);
          localStorage.setItem("num_pages", pageNumber);

          console.log("data", data);
          // window.location.reload();
        } else {
          alert("Error");
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
            <option value="A3">A3</option>
          </select>
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
          <input
            type="number"
            name="copies"
            onChange={handleChange}
            required
            value={formData.copies || 0}
          />
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
