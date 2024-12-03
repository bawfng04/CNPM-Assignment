import React from "react";

const logoutAPI = "http://localhost:4000/logout";

const handleLogout = async (navigate) => {
  const response = await fetch(logoutAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data.error) {
    console.log(data.error);
  } else {
    localStorage.setItem("isLoggedIn", "false");
    navigate("/login");
  }
};

const Security = () => {
  return (
    <div className="securityDiv">
      <h3 className="title">Change password</h3>
      <div className="form-group">
        <label>Current password</label>
        <input type="text" />
      </div>
      <div className="form-group">
        <label>New password</label>
        <input type="password" />
      </div>
      <div className="form-group">
        <label>Confirm password</label>
        <input type="password" />
      </div>
      <div className="form-group2">
        <button className="save-button">Save</button>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Security;
