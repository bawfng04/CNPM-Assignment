import React, { useState, useEffect } from "react";
import enPrinter from "../../../images/enPrinter.png";
import disPrinter from "../../../images/disPrinter.png";

const getNum = "http://localhost:4000/admin/printer/num";

const SumarySection = () => {
  const [enable, setEnable] = useState(0);
  const [disable, setDisable] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(getNum, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setEnable(data.enable);
      setDisable(data.disable);
    };
    fetchData();
  }, []);

  return (
    <div className="summary-section">
      <div className="card">
        <img src={enPrinter} alt="A4" className="paperIcon" />
        <div className="info">
          <h3>Enabled Printers</h3>
          <p>200</p>
        </div>
      </div>
      <div className="card">
        <img src={disPrinter} alt="A3" className="paperIcon" />
        <div className="info">
          <h3>Disabled Printer</h3>
          <p>49</p>
        </div>
      </div>
    </div>
  );
};

export default SumarySection;
