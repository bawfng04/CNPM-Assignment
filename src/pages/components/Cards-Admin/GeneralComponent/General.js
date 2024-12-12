import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "./General.css";

const fetchAllUser = "http://localhost:4000/admin/getUsers";
const PrinterListAPI = "http://localhost:4000/print/all";

const General = () => {
  const [userData, setUserData] = useState([]);
  const [printerData, setPrinterData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const printerResponse = await fetch(PrinterListAPI, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const printerResult = await printerResponse.json();

        console.log("P:", printerResult.data);

        setPrinterData(printerResult.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const printerChartData = {
    labels: printerData.map((printer, index) => `Printer ${printer.id + 1}`),
    datasets: [
      {
        label: "Number of Pages Printed",
        data: printerData.map((printer) => printer.default_num_pages || 0),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  //pie chart for campus printer

  const campusChart = {
    labels: ["Campus 1", "Campus 2"],
    datasets: [
      {
        label: "Number of Printers",
        data: [
          printerData.filter((printer) => printer.campus_name === "1").length,
          printerData.filter((printer) => printer.campus_name === "2").length,
        ],
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)"],
      },
    ],
  };

  return (
    <div className="container">
      <div className="chart-section">
        <div className="chartUnit">
          <h2 className="chartLable">Printer Default Numpages</h2>
          <div className="chart">
            <Bar className="chartin" data={printerChartData} />
          </div>
        </div>
        <div className="chartUnit">
          <h2 className="chartLable">
            Number of Printers in Campus 1 and Campus 2
          </h2>
          <div className="chart">
            <Bar className="chartin" data={campusChart} />
          </div>
        </div>
      </div>
      <div className="information-section">
        <div className="info-box">
          <h3>General Information Printer</h3>
          <ul>
            <li>
              Total Printer<span>150 machine</span>
            </li>
            <li>
              Number Active Printer<span>100 printer</span>
            </li>
            <li>
              Number of Paper Printed<span>1050 paper</span>
            </li>
            <li>
              Number of Paper Printed current Week<span>412 paper</span>
            </li>
            <li>
              Number of Paper Printed per User<span>43 paper</span>
            </li>
            <li>
              Default Paper<span>20 paper</span>
            </li>
          </ul>
        </div>
        <div className="info-box">
          <h3>General Information User</h3>
          <ul>
            <li>
              Total User<span>20,000 user</span>
            </li>
            <li>
              Number of New User per Week<span>20 user</span>
            </li>
            <li>
              Total Transaction<span>40,000 transaction</span>
            </li>
            <li>
              Number of Transaction per User<span>2 transaction</span>
            </li>
            <li>
              Number of Transaction current Week<span>2011 transaction</span>
            </li>
            <li>
              Top up per Transaction<span>50,000 ₫</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default General;
