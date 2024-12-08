import React, { useState, useEffect } from "react";
import "./Market.css";
import m1 from "../../../images/m1.png";
import m2 from "../../../images/m2.png";
import m3 from "../../../images/m3.png";
import m4 from "../../../images/m4.png";
// import ta1 from "../../../images/ta1.png";
import ta2 from "../../../images/ta2.png";
import ta3 from "../../../images/ta3.png";
import pa1 from "../../../images/pa1.png";
import pa2 from "../../../images/pa2.png";
import pa3 from "../../../images/pa3.png";
import pa4 from "../../../images/pa4.png";
import pa5 from "../../../images/pa5.png";
import pa6 from "../../../images/pa6.png";
import iconPlus from "../../../images/icon-plus.png";
import c1 from "../../../images/c1.png";

const marketAPI = "http://localhost:4000/pay/BuyPages";
const doneAPI = "http://localhost:4000/pay/Update";
const getTotalAPI = "http://localhost:4000/pay/TotalPage";

function Market() {
  const [A0num, setA0num] = useState(0);
  const [A1num, setA1num] = useState(0);
  const [A2num, setA2num] = useState(0);
  const [A3num, setA3num] = useState(0);
  const [A4num, setA4num] = useState(0);
  const [A5num, setA5num] = useState(0);
  const [qrDisplay, setQrDisplay] = useState(false);
  const [loading, setLoading] = useState(false);

  const [A3plus, setA3plus] = useState(0);
  const [A4plus, setA4plus] = useState(0);

  const [totalPaper, setTotalPaper] = useState(0);

  const handleDone = async () => {
    try {
      const userEmail = localStorage.getItem("email");
      // userEmail = userEmail ? userEmail.replace(/"/g, "") : "";
      // console.log("USER EMAIL: ", userEmail);
      const data = {
        email: userEmail.replace(/"/g, ""),
        A3: A3num,
        A4: A4num,
      };


      console.log("DATA: ", data);
      const response = await fetch(doneAPI, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res && res.data.pages_remaining) {
        const totalPaper = res.data.pages_remaining;
        setTotalPaper(totalPaper);
        setA3plus(parseInt(A3num));
        setA4plus(parseInt(A4num));

        console.log("A3PLUS: ", parseInt(A3plus));
        console.log("A4PLUS: ", parseInt(A4plus));

        let oldA3 = localStorage.getItem("A3plus");
        let oldA4 = localStorage.getItem("A4plus");
        oldA3 = oldA3 ? parseInt(oldA3) : 0;
        oldA4 = oldA4 ? parseInt(oldA4) : 0;
        oldA3 += parseInt(A3num);
        oldA4 += parseInt(A4num);
        localStorage.setItem("A3plus", oldA3);
        localStorage.setItem("A4plus", oldA4);

        alert("Transaction completed");
        setQrDisplay(false);
        setLoading(false);
        let parentElement2 = document.getElementById("TOTAL");
        let parentElement3 = document.getElementById("Vietnamse");
        let parentElement = document.getElementById("QRRR");
        //clear previous total

        parentElement2.innerHTML = "";
        parentElement3.innerHTML = "";
        parentElement.innerHTML = "";
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const oldA3 = parseInt(localStorage.getItem("A3plus")) || 0;
    const oldA4 = parseInt(localStorage.getItem("A4plus")) || 0;
    setA3plus(oldA3);
    setA4plus(oldA4);
  }, []);

  useEffect(() => {
    const getTotal = async () => {
      try {
        const email = localStorage.getItem("email");
        email = email ? email.replace(/"/g, "") : "";
        console.log("EEmail: ", email);
        const response = await fetch(getTotalAPI, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ email: email }),
        });

        const res = await response.json();
        const totalPage = res.data;
        setTotalPaper(totalPage);
      } catch (error) {
        console.log(error);
      }
    };
    getTotal();
  }, []);

  const sendToBackend = async (data) => {
    try {
      const response = await fetch(marketAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();

      console.log(res);
      if (res) {
        const qrUrl = res.qrUrl;
        const total = res.total;
        if (total === 0) {
          alert("Please select at least 1 item to buy");
          return;
        }

        let parentElement2 = document.getElementById("TOTAL");
        let parentElement3 = document.getElementById("Vietnamse");
        //clear previous total

        parentElement2.innerHTML = "";
        parentElement3.innerHTML = "";

        parentElement2.innerHTML = `<h3>Total: ${formatCurrency(total)}</h3>`;
        parentElement3.innerHTML = `<h3>${convertToVietnamese(total)}</h3>`;

        //qr code image

        const imgElement = document.createElement("img");
        imgElement.src = qrUrl;
        imgElement.alt = "QR Code";
        document.body.appendChild(imgElement);

        let parentElement = document.getElementById("QRRR");
        //clear previous qr code
        parentElement.innerHTML = "";
        parentElement.appendChild(imgElement);

        setQrDisplay(true);

        //scroll to the image
        imgElement.scrollIntoView({ behavior: "smooth" });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  function formatCurrency(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
  }

  //convert to Vietnamse
  function convertToVietnamese(amount) {
    const units = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ", "triệu tỷ"];
    const numbers = [
      "không",
      "một",
      "hai",
      "ba",
      "bốn",
      "năm",
      "sáu",
      "bảy",
      "tám",
      "chín",
    ];

    function readThreeDigits(number) {
      let hundred = Math.floor(number / 100);
      let ten = Math.floor((number % 100) / 10);
      let unit = number % 10;
      let result = "";

      if (hundred !== 0) {
        result += numbers[hundred] + " trăm ";
        if (ten === 0 && unit !== 0) {
          result += "linh ";
        }
      }

      if (ten !== 0 && ten !== 1) {
        result += numbers[ten] + " mươi ";
        if (ten === 0 && unit !== 0) {
          result += "linh ";
        }
      }

      if (ten === 1) {
        result += "mười ";
      }

      switch (unit) {
        case 1:
          if (ten !== 0 && ten !== 1) {
            result += "mốt ";
          } else {
            result += numbers[unit] + " ";
          }
          break;
        case 5:
          if (ten === 0) {
            result += numbers[unit] + " ";
          } else {
            result += "lăm ";
          }
          break;
        default:
          if (unit !== 0) {
            result += numbers[unit] + " ";
          }
          break;
      }

      result = result.trim();
      return result;
    }

    function readGroup(number) {
      if (number === "000") return "";
      return readThreeDigits(parseInt(number, 10));
    }

    function convert(amount) {
      if (amount === 0) return "không đồng";
      let strAmount = amount.toString();
      let result = "";
      let groupCount = 0;

      while (strAmount.length > 0) {
        let group = strAmount.slice(-3);
        strAmount = strAmount.slice(0, -3);
        let groupText = readGroup(group);
        if (groupText !== "") {
          result = groupText + " " + units[groupCount] + " " + result;
        }
        groupCount++;
      }

      result = result.trim() + " đồng";
      result = result.charAt(0).toUpperCase() + result.slice(1);
      return result;
    }

    return convert(amount);
  }

  const handleChange = (index, e) => {
    const setters = [
      setA0num,
      setA1num,
      setA2num,
      setA3num,
      setA4num,
      setA5num,
    ];
    setters[index](e.target.value);
  };

  const handleBuyNow = () => {
    //create form data
    setLoading(true);
    const data = {
      A0: A0num,
      A1: A1num,
      A2: A2num,
      A3: A3num,
      A4: A4num,
      A5: A5num,
    };

    sendToBackend(data);
    console.log("Data: ", data);
  };

  return (
    <section className="c-market">
      <div className="c-market__box-1">
        <div className="c-market__head-item">
          <img src={m1} alt="Logo" />
          <div className="c-market__head-info">
            <h2>My Balance</h2>
            <p>120,000đ</p>
          </div>
        </div>

        <div className="c-market__head-item">
          <img src={m2} alt="Logo" />
          <div className="c-market__head-info">
            <h2>Deposit</h2>
            <p>200,000đ</p>
          </div>
        </div>

        <div className="c-market__head-item">
          <img src={m3} alt="Logo" />
          <div className="c-market__head-info">
            <h2>Expense</h2>
            <p>80,000đ</p>
          </div>
        </div>

        <div className="c-market__head-item">
          <img src={m4} alt="Logo" />
          <div className="c-market__head-info">
            <h2>Total paper</h2>
            <p>{totalPaper}</p>
          </div>
        </div>
      </div>

      <div className="c-market__box-2">
        <div className="c-market__box-left">
          <div className="c-market__box-transaction">
            <div className="c-market__head-transaction">
              <h2>Last Transaction</h2>
            </div>

            <div className="c-market__info-transaction">
              <div className="c-market__item-transaction">
                <img src={ta2} alt="Logo" />
                <div className="c-market__head-info-transaction">
                  <h2>A4 paper</h2>
                  <p>17 Set 2024</p>
                </div>
                <p className="p-1">#UT12102</p>
                <p className="p-2">40</p>
                <p className="p-3">luoi_hoc_diem_cao.pdf</p>
                <span>-10,000đ</span>
              </div>

              <div className="c-market__item-transaction">
                <img src={ta2} alt="Logo" />
                <div className="c-market__head-info-transaction">
                  <h2>A4 paper</h2>
                  <p>15 Set 2024</p>
                </div>
                <p className="p-1">#UT12102</p>
                <p className="p-2">52</p>
                <p className="p-3">bikip_10_cnpm.pdf</p>
                <span>-13,000đ</span>
              </div>

              <div className="c-market__item-transaction">
                <img src={ta3} alt="Logo" />
                <div className="c-market__head-info-transaction">
                  <h2>Deposit</h2>
                  <p>14 Set 2024</p>
                </div>
                <p className="p-1">#GD12103</p>
                <p className="p-2">Cash</p>
                <p className="p-3">Success</p>
                <span id="green">+100,000đ</span>
              </div>
            </div>
          </div>

          <div className="c-market__box-paper">
            <div className="c-market__head-paper">
              <h2>Paper Shop</h2>
            </div>

            <div className="c-market__info-paper">
              <div className="c-market__item-paper">
                <div className="c-market__top-paper">
                  <img src={pa1} alt="Logo" />
                  <p>A5 paper</p>
                </div>
                <div className="c-market__bottom-paper">
                  <input type="number" onChange={(e) => handleChange(5, e)} />
                  <img src={iconPlus} alt="Logo" />
                </div>
              </div>

              <div className="c-market__item-paper">
                <div className="c-market__top-paper">
                  <img src={pa2} alt="Logo" />
                  <p>A4 paper</p>
                </div>
                <div className="c-market__bottom-paper">
                  <input type="number" onChange={(e) => handleChange(4, e)} />
                  <img src={iconPlus} alt="Logo" />
                </div>
              </div>

              <div className="c-market__item-paper">
                <div className="c-market__top-paper">
                  <img src={pa3} alt="Logo" />
                  <p>A3 paper</p>
                </div>
                <div className="c-market__bottom-paper">
                  <input type="number" onChange={(e) => handleChange(3, e)} />
                  <img src={iconPlus} alt="Logo" />
                </div>
              </div>

              <div className="c-market__item-paper">
                <div className="c-market__top-paper">
                  <img src={pa4} alt="Logo" />
                  <p>A2 paper</p>
                </div>
                <div className="c-market__bottom-paper">
                  <input type="number" onChange={(e) => handleChange(2, e)} />
                  <img src={iconPlus} alt="Logo" />
                </div>
              </div>

              <div className="c-market__item-paper">
                <div className="c-market__top-paper">
                  <img src={pa5} alt="Logo" />
                  <p>A1 paper</p>
                </div>
                <div className="c-market__bottom-paper">
                  <input type="number" onChange={(e) => handleChange(1, e)} />
                  <img src={iconPlus} alt="Logo" />
                </div>
              </div>

              <div className="c-market__item-paper">
                <div className="c-market__top-paper">
                  <img src={pa6} alt="Logo" />
                  <p>A0 paper</p>
                </div>
                <div className="c-market__bottom-paper">
                  <input type="number" onChange={(e) => handleChange(0, e)} />
                  <img src={iconPlus} alt="Logo" />
                </div>
              </div>

              <div className="c-market__price">
                <button className="marketButton" onClick={handleBuyNow}>
                  Buy now
                </button>
              </div>
              <h3>Total:</h3>
            </div>
          </div>
        </div>

        <div className="c-market__box-right">
          <div className="c-market__head-current">
            <h2>Current Paper</h2>
          </div>
          <div className="c-market__box-current">
            <div className="c-market__item-current">
              <img src={c1} alt="Logo" />
              <div className="c-market__info-current">
                <h3>A5 paper</h3>
                <p>5h ago</p>
              </div>
              <span>0</span>
            </div>

            <div className="c-market__item-current">
              <img src={c1} alt="Logo" />
              <div className="c-market__info-current">
                <h3>A4 paper</h3>
                <p>5h ago</p>
              </div>
              <span>
                {localStorage.getItem("A4plus")
                  ? localStorage.getItem("A4plus")
                  : 0}
              </span>
            </div>

            <div className="c-market__item-current">
              <img src={c1} alt="Logo" />
              <div className="c-market__info-current">
                <h3>A3 paper</h3>
                <p>5h ago</p>
              </div>
              <span>
                {localStorage.getItem("A3plus")
                  ? localStorage.getItem("A3plus")
                  : 0}
              </span>
            </div>

            <div className="c-market__item-current">
              <img src={c1} alt="Logo" />
              <div className="c-market__info-current">
                <h3>A2 paper</h3>
                <p>5h ago</p>
              </div>
              <span>0</span>
            </div>

            <div className="c-market__item-current">
              <img src={c1} alt="Logo" />
              <div className="c-market__info-current">
                <h3>A1 paper</h3>
                <p>5h ago</p>
              </div>
              <span>0</span>
            </div>

            <div className="c-market__item-current">
              <img src={c1} alt="Logo" />
              <div className="c-market__info-current">
                <h3>A0 paper</h3>
                <p>5h ago</p>
              </div>
              <span>0</span>
            </div>
          </div>
        </div>
      </div>

      <div className="QRRRR">
        {loading && <h3 className="loading">Loading...</h3>}
        <div id="TOTAL" className="totalPrice"></div>
        <div id="Vietnamse" className="totalPrice2"></div>
        <div id="QRRR"></div>
        <div className="abc">
          {!loading && qrDisplay && (
            <button className="PaymentComplete" onClick={handleDone}>
              Done
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default Market;
