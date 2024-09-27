import HCMUTLogo from "../../images/HCMUTlogo.png";
import notiButton from "../../images/notiButton.png";
import settingsButton from "../../images/settingsButton.png";

function Header({ activeComponent }) {
  let headerText;
  switch (activeComponent) {
    case "dashboard":
      headerText = "Overview";
      break;
    case "printer":
      headerText = "Printer";
      break;
    case "market":
      headerText = "Market";
      break;
    case "history":
      headerText = "History";
      break;
    case "settings":
      headerText = "Settings";
      break;
    default:
      headerText = "Overview";
  }

  return (
    <header className="header">
      <h2>{headerText}</h2>
      <div className="header-icons">
        <div className="searchContainer">
          <input
            type="text"
            placeholder=" Search for something"
            className="searchBar"
          />
        </div>
        <button className="headerButton">
          <img src={settingsButton} alt="settingsButton"></img>
        </button>
        <button className="headerButton">
          <img src={notiButton} alt="notiButton"></img>
        </button>
        <img src={HCMUTLogo} alt="HCMUTLogo" className="HCMUTLogo"></img>
      </div>
    </header>
  );
}

export default Header;
