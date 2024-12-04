import ProfileLogo from "../../../images/HCMUT_official_logo.png";
import React, { useState } from "react";

const sendFormAPI = "http://localhost:4000/form/something";

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    studentID: "",
    presentAddress: "",
    faculty: "",
    city: "",
    class: "",
    country: "",
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
    try {
      const response = await fetch(sendFormAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(formData),
      });
      if (response.message) {
        // Handle success
        console.log("Form submitted successfully");
      } else {
        // Handle error
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="profileAndInfo">
        <div className="profileImage">
          <img
            src={ProfileLogo}
            alt="profileLogo"
            className="profileLogo"
          ></img>
        </div>

        <div className="settings-container">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" />
              </div>
              <div className="form-group">
                <label>Student ID</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>Present Address</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>Faculty</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>City</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>Class</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>Country</label>
                <input type="text" />
              </div>
            </div>
            <button className="save-button align-right">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
