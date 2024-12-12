import React, { useState } from "react";
import HCMUTLogo from "../../images/HCMUTlogo.png";
// import notiButton from "../../images/notiButton.png";
import settingsButton from "../../images/settingsButton.png";


const logoutAPI = "http://localhost:4000/logout/";

const handleLogout = async () => {
  const response = await fetch(logoutAPI, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  // console.log("TOKENNNN:", localStorage.getItem("token"));
  const data = await response.json();
  if (data.message) {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    localStorage.removeItem("iat");
    localStorage.removeItem("exp");
    localStorage.removeItem("activeComponent");
    window.location.href = "/";
    alert("Logout success");
  } else {
    console.log(data.error);
  }
};

function Header({ activeComponent, setActiveComponent }) {
  let headerText;
  const [displayLogout, setDisplayLogout] = useState(false);

  const handleOnClickSettingsHeader = () => {
    setDisplayLogout(!displayLogout);
  };

  const handleOnClickAvatar = () => {
    setActiveComponent("settings");
  };

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
    case "general":
      headerText = "General";
      break;
    case "config":
      headerText = "Config";
      break;
    case "manageUser":
      headerText = "Manage User";
      break;
    case "managePrinter":
      headerText = "Manage Printer";
      break;
    default:
      headerText = "Overview";
  }

  return (
    <header className="header">
      <h2>{headerText}</h2>
      <div className="header-icons">
        <button className="headerButton">
          <img
            src={settingsButton}
            alt="settingsButton"
            onClick={handleOnClickSettingsHeader}
          ></img>
        </button>

        {displayLogout && (
          <div className="logoutContainer">
            <button className="logoutButton" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}

        <button onClick={handleOnClickAvatar} className="avatarLogo">
          <img src={HCMUTLogo} alt="HCMUTLogo" className="HCMUTLogo"></img>
        </button>
      </div>
    </header>
  );
}

export default Header;
