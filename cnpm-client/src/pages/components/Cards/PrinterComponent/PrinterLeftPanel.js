import uploadIcon from "../../../images/uploadIcon.png";

const PrinterLeftPanel = () => {
  return (
    <div className="left-panel">
      <div className="upload-section">
        <div className="upload-container">
          <img className="uploadIcon" src={uploadIcon} alt="upload icon" />
          <label for="file">
            Drag & drop files or <span>Browse</span>
          </label>
          <input type="file" id="file" />
          <div className="description">
            Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
          </div>
        </div>

        <div className="fileName">
          <div className="nameDisplay">
            <h4>luoi_hoc_diem_cao.pdf</h4>
          </div>
          <div className="status">
            <h5>Upload success</h5>
          </div>
        </div>
      </div>

      <div className="print-range">
        <h3>Print Range</h3>
        <div className="option">
          <input
            type="radio"
            name="range"
            id="current-view"
            className="radio-option"
          />
          <label htmlFor="current-view">Current View</label>
        </div>
        <div className="option">
          <input
            type="radio"
            name="range"
            id="current-page"
            className="radio-option"
          />
          <label htmlFor="current-page">Current Page</label>
        </div>
        <div className="option">
          <input
            type="radio"
            name="range"
            id="all-page"
            className="radio-option"
          />
          <label htmlFor="all-page">All Page</label>
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
              <h4>1-10</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrinterLeftPanel;
