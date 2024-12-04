import React from "react";

const logoutAPI = "http://localhost:4000/logout/";

const handleLogout = async () => {
  const response = await fetch(logoutAPI, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  console.log("TOKENNNN:", localStorage.getItem("token"));
  const data = await response.json();
  if (data.message) {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/";
    alert("Logout success");
  } else {
    console.log(data.error);
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




// UPDATE public.users
// SET role = 'admin';