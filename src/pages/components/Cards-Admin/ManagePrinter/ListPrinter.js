const ListPrinter = () => {
  return (
    <div className="history-container">
      <div className="printNfilter">
        <h2 className="printTextz">Printers list</h2>
      </div>
      <div className="table-container">
        <table className="history-table">
          <thead>
            <tr>
              <th className="table-header">SL No</th>
              <th className="table-header">Printer ID</th>
              <th className="table-header">Printer Name</th>
              <th className="table-header">Status</th>
              <th className="table-header">Delete</th>
              <th className="table-header">Detail</th>
            </tr>
          </thead>
          <tbody className="rounded-tbody">
            {[...Array(10)].map((_, index) => (
              <tr key={index} className="tableRow">
                <td className="table-content">{index}</td>
                <td className="table-content">#f43u9f03</td>
                <td className="table-content">
                  Canon PIXMA G7020 All-In-One MegaTank Printer
                </td>
                <td className="table-content">
                  <label class="switch">
                    <input type="checkbox"></input>
                    <span class="slider round"></span>
                  </label>
                </td>
                <td className="table-content">
                  <button className="delete-btn">Delete</button>
                </td>
                <td className="table-content">
                  <button className="detail-btn">Detail</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListPrinter;
