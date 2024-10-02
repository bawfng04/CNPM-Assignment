import React, { useState } from "react";
import "./Settings.css";
import Profile from "./Profile";
import Security from "./Security";

const Settings = () => {
  const [activeSettings, setActiveSettings] = useState("EditProfile");

  return (
    <div className="settingsContainer">
      <div className="whiteBackground">
        <div className="te">
          <div className="tabs">
            <div className="tabsDiv">
              <button
                className="settingsBtn"
                onClick={() => setActiveSettings("EditProfile")}
              >
                Edit Profile
              </button>
              <button
                className="settingsBtn"
                onClick={() => setActiveSettings("Security")}
              >
                Security
              </button>
            </div>
          </div>
          <div className="profileAndInfo">
            <div className="settings-container">
              {activeSettings === "EditProfile" ? <Profile /> : <Security />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
