import React, { useEffect, useState, useCallback } from "react";
import uploadIcon from "../../../images/uploadIcon.png";

// const uploadAPI = "http://localhost:4000/uploads/";

const PrinterLeftPanel = ({ setFilee, handlePages }) => {
  const [file, setFile] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errorUpload, setErrorUpload] = useState(false);

  const [pageOption, setPageOption] = useState("current-page");
  const [startPage, setStartPage] = useState("");
  const [endPage, setEndPage] = useState("");

  const handleFile = (fileName) => {
    setFilee(fileName);
  };

  const handlePagesIn = useCallback(
    (option, start, end) => {
      if (start && end && start > end) {
        alert("Start page must be less than end page");
        setStartPage("");
        setEndPage("");
        return;
      }
      handlePages(option, start, end);
    },
    [handlePages]
  );

  useEffect(() => {
    handlePagesIn(pageOption, startPage, endPage);
  }, [handlePagesIn, pageOption, startPage, endPage]);

  // const uploadFile = async (file) => {
  //   const formData = new FormData();
  //   formData.append("printFile", file);

  //   try {
  //     const response = await fetch(uploadAPI, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //       body: formData,
  //     });

  //     handleFile(file);

  //     if (response.headers.get("content-type")?.includes("application/json")) {
  //       const data = await response.json();
  //       if (data.error) {
  //         console.log(data.error);
  //         setErrorUpload(true);
  //       } else {
  //         console.log(data.message);
  //         setUploadSuccess(true);
  //       }
  //     } else {
  //       alert("File uploaded successfully");
  //       setUploadSuccess(true);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     setErrorUpload(true);
  //   }
  // };

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
      // uploadFile(uploadedFile);

      //gửi props
      handleFile(uploadedFile);
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
        <form>
          <div className="chooseOptions">
            <label>
              <input
                type="radio"
                value="current-page"
                checked={pageOption === "current-page"}
                onChange={() => setPageOption("current-page")}
              />
              Current Page
            </label>
            <div className="pagesss">
              <label>
                <input
                  type="radio"
                  value="pages"
                  checked={pageOption === "pages"}
                  onChange={() => setPageOption("pages")}
                />
                Pages
              </label>

              {pageOption === "pages" && (
                <div>
                  <div className="alal">
                    <label>
                      Start Page:
                      <input
                        type="number"
                        value={startPage}
                        onChange={(e) => setStartPage(e.target.value)}
                        required
                        className="iPage"
                      />
                    </label>
                  </div>
                  <div className="alal">
                    <label>
                      End Page:{" "}
                      <input
                        type="number"
                        value={endPage}
                        onChange={(e) => setEndPage(e.target.value)}
                        required
                        className="iPage"
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PrinterLeftPanel;
