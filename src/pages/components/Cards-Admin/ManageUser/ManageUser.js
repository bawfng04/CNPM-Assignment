import React, { useState, useEffect } from "react";
import "./ManageUser.css";
import totalUserz from "../../../images/totalUser.png";
import totalTransactionz from "../../../images/totalTransaction.png";

const fetchAllUser = "http://localhost:4000/admin/getUsers";
const handleDetailAPI = (id) => `http://localhost:4000/order/recentOrder/${id}`;

const ManageUser = () => {
  const [totalUser, setTotalUser] = useState(0);
  const [totalTransaction, setTotalTransaction] = useState(0);
  const [allUser, setAllUser] = useState([]);
  const [visibleUser, setVisibleUser] = useState(10);

  useEffect(() => {
    fetch(fetchAllUser, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("data: ", data);
        // console.log("a: ", data.Totaloder);
        // console.log("b: ", data.Totaluser);
        // console.log("c: ", data);

        setTotalTransaction(data.Totaloder.data);
        setTotalUser(data.Totaluser.data);
        setAllUser(data.data);
      })
      .catch((error) => {
        console.error("Error fetching printers: ", error);
      });
  }, []);

  const handleShowMore = () => {
    setVisibleUser((prevVisibleUser) => prevVisibleUser + 10);
  };

  const showModal = (data) => {
    console.log("showmodeldata: ", data[0]);

    const modal = document.getElementById("printerDetailModal");
    const span = document.getElementsByClassName("close")[0];
    const details = document.getElementById("printerDetails");

    // Populate the modal with data

    // data = data[000];

    console.log("dataa: ", data);

    if (!data) {
      alert("No data found");
    } else {
      details.innerHTML = `
    <table className="history-table">
      <thead>
        <tr>
          <th className="table-header">No.</th>
          <th className="table-header">Printer ID</th>
          <th className="table-header">File Name</th>
          <th className="table-header">Start Time</th>
          <th className="table-header">End Time</th>
          <th className="table-header">Pages Printed</th>
          <th className="table-header">Number of Copies</th>
        </tr>
      </thead>
      <tbody className="rounded-tbody">
        ${data
          .map(
            (item, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${item.printer_id}</td>
            <td>${item.file_name}</td>
            <td>${item.start_time}</td>
            <td>${item.end_time}</td>
            <td>${item.pages_printed}</td>
            <td>${item.num_copies}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
    `;
    }

    // Show the modal
    modal.style.display = "block";

    // Close the modal when the user clicks on <span> (x)
    span.onclick = function () {
      modal.style.display = "none";
    };

    // Close the modal when the user clicks anywhere outside of the modal
    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
  };

  const fetchDetail = async (id) => {
    try {
      console.log("id: ", id);
      const response = await fetch(handleDetailAPI(id), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      console.log("data: ", data);
      if (!data.data) {
        alert("No history");
        return;
      }
      showModal(data.data);
    } catch (error) {
      console.error("Error fetching printer detail: ", error);
    }
  };

  return (
    <div className="history-container">
      <div className="summary-section">
        <div className="card">
          <img src={totalUserz} alt="A4" className="paperIcon" />
          <div className="info">
            <h3>Total Users</h3>
            <p>{totalUser}</p>
          </div>
        </div>
        <div className="card">
          <img src={totalTransactionz} alt="A3" className="paperIcon" />
          <div className="info">
            <h3>Total Orders</h3>
            <p>{totalTransaction}</p>
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
            <th className="table-header">Full Name</th>
            <th className="table-header">Email</th>
            <th className="table-header">Role</th>
            <th className="table-header">Printing history</th>
          </tr>
        </thead>
        <tbody className="rounded-tbody">
          {allUser.slice(0, visibleUser).map((user, index) => (
            <tr key={index}>
              <td className="table-data">{index + 1}</td>
              <td className="table-data">
                {user.first_name + " " + user.last_name}
              </td>
              <td className="table-data">{user.email}</td>
              <td className="table-data">{user.role}</td>
              <td className="table-data">
                <button
                  className="detail-btn"
                  onClick={() => fetchDetail(user.id)}
                >
                  Detail
                </button>
                <div id="printerDetailModal" class="modal">
                  <div class="modal-content">
                    <span class="close">&times;</span>
                    <h2>Printer Details</h2>
                    <p id="printerDetails"></p>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        {allUser.length && visibleUser && allUser.length > visibleUser && (
          <tr>
            <td colSpan="5" className="table-data">
              <div className="show-more-container">
                <button className="show-more-button" onClick={handleShowMore}>
                  Show More
                </button>
              </div>
            </td>
          </tr>
        )}
      </table>
    </div>
  );
};

export default ManageUser;
