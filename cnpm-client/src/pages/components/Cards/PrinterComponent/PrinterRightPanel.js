const PrinterRightPanel = () => {
  return (
    <div className="right-panel">
      <div className="soleSetting">
        <label>Select Printer</label>
        <select>
          <option>Canon 3000</option>
        </select>
      </div>
      <div className="print-settings">
        <div className="setting">
          <label>Paper Type</label>
          <select>
            <option>A4</option>
          </select>
        </div>
        <div className="setting">
          <label>Number of Paper</label>
          <select>
            <option>30</option>
          </select>
        </div>
        <div className="setting">
          <label>Number Side</label>
          <select>
            <option>One Side</option>
          </select>
        </div>
        <div className="setting">
          <label>Copies</label>
          <select>
            <option>1</option>
          </select>
        </div>
      </div>
      <div className="soleSetting">
        <label>Print Handing</label>
        <select>
          <option>Scale</option>
        </select>
      </div>
      <div className="soleSetting">
        <label>Orientation</label>
        <select>
          <option>Auto portrait/landscape</option>
        </select>
      </div>

      <div className="buttons">
        <button className="print-button">Print</button>
        <button className="cancel-button">Cancel</button>
      </div>
    </div>
  );
};

export default PrinterRightPanel;
