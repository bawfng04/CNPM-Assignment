import React from "react";
import "./AddPrinter.css";
import A3 from "../../../images/A3.png";
import A4 from "../../../images/A4.png";
import A1 from "../../../images/A1.png";

const AddPrinter = () => {
  return (
    <div className="wrapAddPrinter">
      <div className="add-printer-container">
        <div className="form-section">
          <label>Printer Name</label>
          <input
            type="text"
            defaultValue="Canon Pixma G7020 All-In-One MegaTank Printer"
          />

          <label>Manufacturer Name</label>
          <input type="text" defaultValue="Canon" />

          <label>Model</label>
          <input type="text" defaultValue="Canon Pixma" />
        </div>

        <div className="form-section">
          <label>Building</label>
          <input type="text" defaultValue="H6" />

          <label>Room Number</label>
          <input type="text" defaultValue="110" />

          <label>Campus</label>
          <input
            type="text"
            defaultValue="Trường Đại học Bách Khoa TP HCM, cơ sở 1"
          />

          <label>Type of Paper</label>
          <div className="paper-type">
            <select className="paperSelect">
              <option>Select type of paper</option>
            </select>

            <button className="add-button">Add</button>
          </div>
          <div className="paper-icons">
            <div className="aImage">
              <img src={A1} alt="A1" />
              <label>A1</label>
            </div>
            <div className="aImage">
              <img src={A3} alt="A3" />
              <label>A3</label>
            </div>
            <div className="aImage">
              <img src={A4} alt="A4" />
              <label>A4</label>
            </div>
          </div>
        </div>
      </div>
      <button className="save-button align-right">Save</button>
    </div>
  );
};

export default AddPrinter;
