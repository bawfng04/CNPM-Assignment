import React, { useState } from "react";
import "./Market.css";
import m1 from "../../../images/m1.png";
import m2 from "../../../images/m2.png";
import m3 from "../../../images/m3.png";
import m4 from "../../../images/m4.png";
import ta1 from "../../../images/ta1.png";
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

function Market() {
  const [A0num, setA0num] = useState(0);
  const [A1num, setA1num] = useState(0);
  const [A2num, setA2num] = useState(0);
  const [A3num, setA3num] = useState(0);
  const [A4num, setA4num] = useState(0);
  const [A5num, setA5num] = useState(0);
  const [qrDisplay, setQrDisplay] = useState(false);
  const [loading, setLoading] = useState(false);

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

        let parentElement2 = document.getElementById("TOTAL");
        //clear previous total
        parentElement2.innerHTML = "";
        parentElement2.innerHTML = `<h3>Total: ${formatCurrency(total)}</h3>`;

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

  const handleA0Change = (e) => {
    setA0num(e.target.value);
  };

  const handleA1Change = (e) => {
    setA1num(e.target.value);
  };

  const handleA2Change = (e) => {
    setA2num(e.target.value);
  };

  const handleA3Change = (e) => {
    setA3num(e.target.value);
  };

  const handleA4Change = (e) => {
    setA4num(e.target.value);
  };

  const handleA5Change = (e) => {
    setA5num(e.target.value);
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
            <p>45</p>
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
                <img src={ta1} alt="Logo" />
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
                  <input type="number" onChange={handleA5Change} />
                  <img src={iconPlus} alt="Logo" />
                </div>
              </div>

              <div className="c-market__item-paper">
                <div className="c-market__top-paper">
                  <img src={pa2} alt="Logo" />
                  <p>A4 paper</p>
                </div>
                <div className="c-market__bottom-paper">
                  <input type="number" onChange={handleA4Change} />
                  <img src={iconPlus} alt="Logo" />
                </div>
              </div>

              <div className="c-market__item-paper">
                <div className="c-market__top-paper">
                  <img src={pa3} alt="Logo" />
                  <p>A3 paper</p>
                </div>
                <div className="c-market__bottom-paper">
                  <input type="number" onChange={handleA3Change} />
                  <img src={iconPlus} alt="Logo" />
                </div>
              </div>

              <div className="c-market__item-paper">
                <div className="c-market__top-paper">
                  <img src={pa4} alt="Logo" />
                  <p>A2 paper</p>
                </div>
                <div className="c-market__bottom-paper">
                  <input type="number" onChange={handleA2Change} />
                  <img src={iconPlus} alt="Logo" />
                </div>
              </div>

              <div className="c-market__item-paper">
                <div className="c-market__top-paper">
                  <img src={pa5} alt="Logo" />
                  <p>A1 paper</p>
                </div>
                <div className="c-market__bottom-paper">
                  <input type="number" onChange={handleA1Change} />
                  <img src={iconPlus} alt="Logo" />
                </div>
              </div>

              <div className="c-market__item-paper">
                <div className="c-market__top-paper">
                  <img src={pa6} alt="Logo" />
                  <p>A0 paper</p>
                </div>
                <div className="c-market__bottom-paper">
                  <input type="number" onChange={handleA0Change} />
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
              <span>30</span>
            </div>

            <div className="c-market__item-current">
              <img src={c1} alt="Logo" />
              <div className="c-market__info-current">
                <h3>A4 paper</h3>
                <p>5h ago</p>
              </div>
              <span>20</span>
            </div>

            <div className="c-market__item-current">
              <img src={c1} alt="Logo" />
              <div className="c-market__info-current">
                <h3>A3 paper</h3>
                <p>5h ago</p>
              </div>
              <span>10</span>
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
              <span>1</span>
            </div>
          </div>
        </div>
      </div>

      <div className="c-market__box-3">
        <div className="c-market__box-payment">
          <div className="c-market__box-payment-left">
            {loading && <h3 className="loading">Loading...</h3>}
            <div id="TOTAL" className="totalPrice"></div>
            <div id="QRRR"></div>
            <div className="abc">
              {!loading && qrDisplay && (
                <button className="PaymentComplete">Done</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Market;
