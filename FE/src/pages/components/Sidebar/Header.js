import HCMUTLogo from "../../images/HCMUTlogo.png";
import notiButton from "../../images/notiButton.png";
import settingsButton from "../../images/settingsButton.png";

function Header() {
  return (
    <header className="header">
      <h2>Overview</h2>
      <div className="header-icons">
        <input
          type="text"
          placeholder="🔎 Search for something"
          className="searchBar"
        />
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
