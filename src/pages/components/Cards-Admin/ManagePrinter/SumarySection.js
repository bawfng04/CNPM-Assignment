import enPrinter from "../../../images/enPrinter.png";
import disPrinter from "../../../images/disPrinter.png";

const SumarySection = () => {
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
