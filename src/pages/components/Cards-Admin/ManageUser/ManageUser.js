import "./ManageUser.css";
import totalUser from "../../../images/totalUser.png";
import totalTransaction from "../../../images/totalTransaction.png";

const ManageUser = () => {
  return (
    <div className="history-container">
      <div className="summary-section">
        <div className="card">
          <img src={totalUser} alt="A4" className="paperIcon" />
          <div className="info">
            <h3>Total Users</h3>
            <p>200</p>
          </div>
        </div>
        <div className="card">
          <img src={totalTransaction} alt="A3" className="paperIcon" />
          <div className="info">
            <h3>Total Transactions</h3>
            <p>49</p>
          </div>
        </div>
      </div>
      <div className="printNfilter">
        <h2 className="printTextz">Users list</h2>
      </div>

      <table className="history-table">
        <thead>
          <tr>
            <th className="table-header">SL No</th>
            <th className="table-header">Student ID</th>
            <th className="table-header">Full Name</th>
            <th className="table-header">Email</th>
            <th className="table-header">Faculty</th>
            <th className="table-header">Detail</th>
          </tr>
        </thead>
        <tbody className="rounded-tbody">
          {[...Array(10)].map((_, index) => (
            <tr key={index}>
              <td className="table-content">{index}</td>
              <td className="table-content">2210298</td>
              <td className="table-content">🥰😑🤡🙂😭🔑✅😂🤣🤯🥹😱</td>
              <td className="table-content">abcdef@hcmut.edu.vn</td>
              <td className="table-content">CSE</td>
              <td className="table-content">
                <button className="detail-btn">Detail</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUser;
