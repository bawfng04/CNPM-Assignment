import React, { useEffect, useState, useRef } from "react";
import "./Dashboard.css";
import avatarDashboard from "../../../images/avatar-dashboard2.png";
import t1 from "../../../images/t1.png";
import t2 from "../../../images/t2.png";
import t3 from "../../../images/t3.png";
import boxChart from "../../../images/box-chart.jpg";
import boxBalance from "../../../images/box-balance.jpg";
import p1 from "../../../images/p1.jpg";
import p2 from "../../../images/p2.jpg";
// import p3 from "../../../images/p3.jpg";
// import iconNext from "../../../images/icon-next.png";
import Chart from "chart.js/auto";

const getInfoAPI = "http://localhost:4000/getIn4";
const getTotalAPI = "http://localhost:4000/pay/TotalPage";

function Dashboard() {
  const chartRef = useRef(null);
  const [name, setName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [a33, setA33] = useState(0);
  const [a44, setA44] = useState(0);
  const getStudentInfo = async () => {
    let email = localStorage.getItem("email");
    email = email.replace(/['"]+/g, "");
    try {
      const response = await fetch(getInfoAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authentication: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log(data);

      if (!data.student) {
        setStudentID("-------");
      } else {
        const studentID = data.student.student_id;
        setStudentID(studentID);
      }

      if (!data.user.first_name && !data.user.last_name) {
        setName("");
      } else {
        const name = data.user.first_name + " " + data.user.last_name;
        setName(name);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //get a3 a4
  useEffect(() => {
    const getTotal = async () => {
      try {
        let email = localStorage.getItem("email");
        email = email ? email.replace(/"/g, "") : "";
        const response = await fetch(getTotalAPI, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ email: email }),
        });

        const res = await response.json();

        console.log("resss: ", res);

        setA33(res.data.pages_remainingA3);
        setA44(res.data.pages_remainingA4);
      } catch (error) {
        console.log(error);
      }
    };
    getTotal();
  });

  useEffect(() => {
    getStudentInfo();
  }, []);

  //chart
  useEffect(() => {
    let chartInstance;
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      chartInstance = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["A3", "A4"],
          datasets: [
            {
              data: [a33, a44],
              backgroundColor: ["#FF6384", "#36A2EB"],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [a33, a44]);

  return (
    <section className="c-dashboard">
      <div className="c-dashboard__box-1">
        <div className="c-dashboard__box-info">
          <div className="c-dashboard__head">
            <h2>My Identify</h2>
            <p>See All</p>
          </div>
          <div className="c-dashboard__box-card">
            <div className="c-dashboard__detail">
              <h3>
                Name: <span>{name ? name : "NULL"}</span>
              </h3>
              <h3>
                Student ID: <span id="span2">{studentID}</span>
              </h3>
              <h3>
                Faculty: <span id="span3">Computer Science</span>
              </h3>
              <h3>
                Address: <span id="span4">Thu Duc City</span>
              </h3>
            </div>
            <div className="c-dashboard__box-avatar">
              <img src={avatarDashboard} alt="Logo" className="avLogo" />
            </div>
          </div>
        </div>

        <div className="c-dashboard__box-transaction">
          <div className="c-dashboard__transaction-head">
            <h2>Recent Transaction</h2>
          </div>
          <div className="c-dashboard__box-card2">
            <div className="c-dashboard__item2">
              <img src={t1} alt="Logo" />
              <div className="c-dashboard__text2">
                <h3>Deposit</h3>
                <p>17 September 2024</p>
              </div>
              <span>+100,000đ</span>
            </div>
            <div className="c-dashboard__item2">
              <img src={t2} alt="Logo" />
              <div className="c-dashboard__text2">
                <h3>Print A4 paper</h3>
                <p>15 September 2024</p>
              </div>
              <span id="span2">-25,000đ</span>
            </div>
            <div className="c-dashboard__item2">
              <img src={t3} alt="Logo" />
              <div className="c-dashboard__text2">
                <h3>Print A3 paper</h3>
                <p>10 September 2024</p>
              </div>
              <span id="span3">-30,000đ</span>
            </div>
          </div>
        </div>
      </div>

      <div className="c-dashboard__box-2">
        <div className="c-dashboard__box-chart">
          <div className="c-dashboard__chart-head">
            <h2>Weekly Activity</h2>
          </div>
          <div className="c-dashboard__chart-box">
            <img src={boxChart} alt="Logo" />
          </div>
        </div>

        <div className="c-dashboard__box-circle">
          <div className="c-dashboard__circle-head">
            <h2>Expense Statistics</h2>
          </div>
          <div className="c-dashboard__circle-box">
            <canvas ref={chartRef}></canvas>
          </div>
        </div>
      </div>

      <div className="c-dashboard__box-3">
        <div className="c-dashboard__box-activity">
          <div className="c-dashboard__activity-head">
            <h2>Paper Remaining</h2>
          </div>
          <div className="c-dashboard__activity-box">
            <div className="c-dashboard__activity-item">
              <img src={p1} alt="Logo" />
              <h3>A4 paper</h3>
              <p id="p-item1">{a44 || " 0 "}</p>
            </div>

            <div className="c-dashboard__activity-item">
              <img src={p2} alt="Logo" />
              <h3>A3 paper</h3>
              <p id="p-item2">{a33 || " 0 "}</p>
            </div>
          </div>
        </div>

        <div className="c-dashboard__box-balance">
          <div className="c-dashboard__balance-head">
            <h2>Balance History</h2>
          </div>
          <div className="c-dashboard__balance-box">
            <img src={boxBalance} alt="Logo" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
