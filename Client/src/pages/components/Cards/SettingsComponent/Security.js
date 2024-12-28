import React, { useState } from "react";

const logoutAPI = "http://localhost:4000/logout/";
const sendFormAPI = "http://localhost:4000/updatePass";

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

const Security = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formDataToSend = {
      oldPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    };

    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      alert("Please fill in all fields");
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    let email = localStorage.getItem("email");
    email = email.replace(/^"|"$/g, "");
    email = email.trim();

    formDataToSend.email = email;

    try {
      const response = await fetch(sendFormAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(formDataToSend),
      });

      console.log("response::: ", response);

      if (response.ok) {
        alert("Update password success");
      } else {
        const errorData = await response.json();
        alert(
          "Update password failed: " + (errorData.error || response.statusText)
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Update password failed: " + error.message);
    }
  };

  return (
    <div className="securityDiv">
      <h3 className="title">Change password</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Current password</label>
          <input
            type="text"
            name="currentPassword"
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>New password</label>
          <input
            type="password"
            name="newPassword"
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Confirm password</label>
          <input
            type="password"
            name="confirmPassword"
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group2">
          <button className="save-button">Save</button>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </form>
    </div>
  );
};

export default Security;

// UPDATE public.users
// SET role = 'admin';
