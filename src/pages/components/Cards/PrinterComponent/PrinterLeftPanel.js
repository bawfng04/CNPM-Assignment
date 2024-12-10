import React, { useState } from "react";
import uploadIcon from "../../../images/uploadIcon.png";

const uploadAPI = "http://localhost:4000/uploads/";


const PrinterLeftPanel = ({ setFilee }) => {
  const [file, setFile] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errorUpload, setErrorUpload] = useState(false);

  const handleFile = (fileName) => {
    setFilee(fileName);
  };

  const uploadFile = async (file) => {
    // const formData = new FormData();
    // formData.append("printFile", file);

    // try {
    //   const response = await fetch(uploadAPI, {
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     },
    //     body: formData,
    //   });

    handleFile(file);

    //   if (response.headers.get("content-type")?.includes("application/json")) {
    //     const data = await response.json();
    //     if (data.error) {
    //       console.log(data.error);
    //       setErrorUpload(true);
    //     } else {
    //       console.log(data.message);
    //       setUploadSuccess(true);
    //     }
    //   } else {
    //     alert("File uploaded successfully");
    //     setUploadSuccess(true);
    //   }
    // } catch (error) {
    //   console.log(error);
    //   setErrorUpload(true);
    // }
  };

  const handleFileChange = (e) => {
    const allowedFileTypes = ["jpg", "png", "pdf", "docx"];
    const uploadedFile = e.target.files[0];
    const fileExtension = uploadedFile
      ? uploadedFile.name.split(".").pop().toLowerCase()
      : "";

    if (uploadedFile && allowedFileTypes.includes(fileExtension)) {
      setFile(uploadedFile);
      setUploadSuccess(false);
      setErrorUpload(false);
      uploadFile(uploadedFile);
    } else {
      setFile(null);
      setUploadSuccess(false);
      setErrorUpload(true);
      alert("Unsupported file type!");
    }
  };

  return (
    <div className="left-panel">
      <div className="upload-section">
        <div className="upload-container">
          <img className="uploadIcon" src={uploadIcon} alt="upload icon" />
          <label htmlFor="file">
            Drag & drop files or <span>Browse</span>
          </label>
          <input
            type="file"
            id="file"
            accept=".jpg, .png, .pdf, .docx"
            onChange={handleFileChange}
          />
          <div className="description">Supported formats: PDF, DOCX</div>
        </div>
        {uploadSuccess ? (
          <div className="fileName">
            <div className="nameDisplay">
              <h4>{file && file.name}</h4>
            </div>
            <div className="status">
              <h5>Upload success</h5>
            </div>
          </div>
        ) : (
          <div className="fileName">
            <div className="nameDisplay">
              <h4 className="fileStatus">
                {file ? file.name : "No files uploaded yet"}
              </h4>
            </div>
            {errorUpload && (
              <div className="incorectStatus">
                <h5>
                  This document is not supported, please upload another file
                  type.
                </h5>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="print-range">
        <h3>Print Range</h3>

        <div className="option">
          <input
            type="radio"
            name="range"
            id="current-page"
            className="radio-option"
          />
          <label htmlFor="current-page">Current Page</label>
        </div>

        <div className="option2">
          <div className="pagesNum">
            <div className="l">
              <input
                type="radio"
                name="range"
                id="pages"
                className="radio-option"
              />
              <label htmlFor="pages">Pages</label>
            </div>
            <div className="r">
              <input type="number" name="startpage" id="pages" />
              <input type="number" name="endpage" id="pages" />
            </div>
          </div>
        </div>

        <form className="print-settings">
          <input
            type="radio"
            name="range"
            id="pages"
            className="radio-option"
          />
          <input type="number" name="startpage" id="pages" />
          <input type="number" name="endpage" id="pages" />
        </form>
      </div>
    </div>
  );
};

export default PrinterLeftPanel;
