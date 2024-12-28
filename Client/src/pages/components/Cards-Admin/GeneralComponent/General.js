import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "./General.css";

const PrinterListAPI = "http://localhost:4000/print/all";

const General = () => {
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
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
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
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
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
          <h2 className="chartLable">Number of Printers in Campuses</h2>
          <div className="chart">
            <Bar className="chartin" data={campusChart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default General;
