import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

const PrinterListAPI = "http://localhost:4000/print/all";
const handleDetailAPI = (id) => `http://localhost:4000/print/detail/${id}`;

const clickCheckboxAPI = (id) =>
  `http://localhost:4000/print/change-status/${id}`;

const deleteAPI = (id) => `http://localhost:4000/print/delete/${id}`;

const ListPrinter = ({ updatePrinterCounts }) => {
  const [printers, setPrinters] = useState([]);
  const [visiblePrinter, setVisiblePrinter] = useState(10);
  const [en, setEn] = useState(0);
  const [dis, setDis] = useState(0);

  const fetchPrinters = async () => {
    try {
      const response = await fetch(PrinterListAPI, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      let data2 = await response.json();
      let data = data2.data;

      const en = data2.totalPrinterEn.data;
      const dis = data2.totalPrinterDis.data;

      setEn(en);
      setDis(dis);

      // Update counts in the parent component
      updatePrinterCounts(en, dis);

      setPrinters(data);
    } catch (error) {
      console.error("Error fetching printers: ", error);
    }
  };

  const handleShowMore = () => {
    setVisiblePrinter((prevVisiblePrinter) => prevVisiblePrinter + 10);
  };

  const handleDelete = (id) => {
    fetch(deleteAPI(id), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data: ", data);
        //re-fetch
        fetchPrinters();
      })
      .catch((error) => {
        console.error("Error deleting printer: ", error);
      });
  };

  function handleOnClickCheckbox(id) {
    console.log("api: ", clickCheckboxAPI(id));
    const currentStatus = printers.find((printer) => printer.id === id).status;
    let sent = "";
    if (currentStatus && currentStatus === "available") {
      sent = "disabled";
    } else {
      sent = "available";
    }

    console.log("sent: ", sent);
    fetch(clickCheckboxAPI(id), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ status: sent }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data: ", data);
        //re-fetch
        fetchPrinters();
      })
      .catch((error) => {
        console.error("Error changing printer status: ", error);
      });
  }

  const printerStatusChart = {
    labels: ["Available", "Disabled"],
    datasets: [
      {
        label: "Number of Printers",
        data: [en, dis],
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)"],
      },
    ],
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  };

  const showModal = (data) => {
    console.log("showmodeldata: ", data[0]);

    const modal = document.getElementById("printerDetailModal");
    const span = document.getElementsByClassName("close")[0];
    const details = document.getElementById("printerDetails");

    // Populate the modal with data

    data = data[0];

    details.innerHTML = `
    <strong>ID:</strong> ${data.id}<br>
    <strong>Brand Name:</strong> ${data.brand_name}<br>
    <strong>Model:</strong> ${data.model}<br>
    <strong>Campus Name:</strong> ${data.campus_name}<br>
    <strong>Building Name:</strong> ${data.building_name}<br>
    <strong>Room Number:</strong> ${data.room_number}<br>
    <strong>File Types:</strong> ${data.file_types}<br>
    <strong>Status:</strong> ${data.status}<br>
    <strong>Default Number of Pages:</strong> ${data.default_num_pages}<br>
    <strong>Created At:</strong> ${data.created_at}<br>
    <strong>Updated At:</strong> ${data.updated_at}
  `;

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
      const response = await fetch(handleDetailAPI(id), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      let data = await response.json();
      console.log("data: ", data);
      console.log("dayn: ", data.data);

      showModal(data.data);
    } catch (error) {
      console.error("Error fetching printer detail: ", error);
    }
  };

  useEffect(() => {
    fetchPrinters(); //eslint-disable-next-line
  }, []);

  return (
    <div className="history-container">
      {/* <div className="chartz">
        <Bar className="pChart" data={printerStatusChart} />
      </div> */}

      <div className="printNfilter">
        <h2 className="printTextz">Printers list</h2>
      </div>

      <div className="table-container">
        <table className="history-table">
          <thead>
            <tr>
              <th className="table-header">Printer ID</th>
              <th className="table-header">Model</th>
              <th className="table-header">Name</th>
              <th className="table-header">Status</th>
              <th className="table-header">Delete</th>
              <th className="table-header">Detail</th>
            </tr>
          </thead>
          <tbody className="rounded-tbody">
            {Array.isArray(printers) && printers.length > 0 ? (
              printers.slice(0, visiblePrinter).map((printer, index) => (
                <tr key={printer.id}>
                  <td className="table-data">{printer.id}</td>
                  <td className="table-data">{printer.brand_name}</td>
                  <td className="table-data">{printer.model}</td>
                  {/* <td className="table-data">{printer.status}</td> */}
                  <td className="table-data checkbox-cell">
                    <label className="switch">
                      <input
                        type="checkbox"
                        defaultChecked={
                          printer.status === "available" ? true : false
                        }
                        onClick={() => handleOnClickCheckbox(printer.id)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </td>
                  <td className="table-data">
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(printer.id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td className="table-data">
                    <button
                      className="delete-btn2"
                      onClick={() => fetchDetail(printer.id)}
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
              ))
            ) : (
              <tr>
                <td colSpan="5" className="table-data">
                  No printers available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {printers.length &&
          visiblePrinter &&
          printers.length > visiblePrinter && (
            <div className="show-more-container">
              <button className="show-more-button" onClick={handleShowMore}>
                Show More
              </button>
            </div>
          )}
      </div>
    </div>
  );
};

export default ListPrinter;
