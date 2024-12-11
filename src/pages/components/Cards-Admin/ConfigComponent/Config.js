import React, { useState } from "react";
import "./Config.css";

const Config = () => {
  const [defaultPaper, setDefaultPaper] = useState(
    localStorage.getItem("defaultPaper") || 0
  );
  const [defaultDate, setDefaultDate] = useState(
    localStorage.getItem("defaultDate") || ""
  );
  const [fileTypes, setFileTypes] = useState([
    "Word Document (*.docx)",
    "PDF Document (*.pdf)",
    "Plain Text (*.txt)",
    "Image File (*.jpeg, *.png, *.jpg, *.webp)",
    "Web Page (*.html, *.htm)",
  ]);
  const [newFileType, setNewFileType] = useState("");

  const handleDelete = (index) => {
    const updatedFileTypes = fileTypes.filter((_, i) => i !== index);
    setFileTypes(updatedFileTypes);
  };

  const handleAdd = () => {
    if (newFileType) {
      setFileTypes([...fileTypes, newFileType]);
      setNewFileType("");
    }
  };

  const handleDefaultInputChange = (e) => {
    setDefaultPaper(e.target.value);
    localStorage.setItem("defaultPaper", e.target.value);
  };

  const handleDateInputChange = (e) => {
    setDefaultDate(e.target.value);
    localStorage.setItem("defaultDate", e.target.value);
  };

  return (
    <div className="config-container">
      <h2>Change Configure</h2>
      <div className="configMain">
        <div className="config-form">
          <div className="form-group">
            <label>Default Paper</label>
            <input
              type="number"
              value={defaultPaper}
              onChange={handleDefaultInputChange}
            />
          </div>
          <div className="form-group">
            <label>Date give the Default Paper</label>
            <input
              type="date"
              value={defaultDate}
              onChange={handleDateInputChange}
            />
          </div>
        </div>
        <div className="file-list">
          <h3>Permitted Type of File</h3>
          <div className="fileTypes">
            <ul>
              {fileTypes.map((type, index) => (
                <li key={index} className="fileUnit">
                  {type}
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="add-file-type">
          <input
            type="text"
            className="searchTypeOfFile"
            placeholder="Select type of file"
            value={newFileType}
            onChange={(e) => setNewFileType(e.target.value)}
          />
          <button className="add-button" onClick={handleAdd}>
            Add
          </button>
        </div>
        <button className="save-button">Save</button>
      </div>
    </div>
  );
};

export default Config;
