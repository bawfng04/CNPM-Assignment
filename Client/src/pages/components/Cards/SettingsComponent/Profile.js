import ProfileLogo from "../../../images/HCMUT_official_logo.png";
import React, { useState } from "react";

const sendFormAPI = "http://localhost:4000/update";

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    studentID: "",
    PhoneNumber: "",
    faculty: "",
    address: "",
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
    let email = localStorage.getItem("email");
    // console.log("email", email);
    email = email.replace(/^"|"$/g, "");
    // console.log("email", email);

    const token = localStorage.getItem("token");

    const formDataToSend = {
      email: email,
      firstname: formData.firstName,
      lastname: formData.lastName,
      phonenumber: formData.PhoneNumber,
      studentID: formData.studentID,
      faculty: formData.faculty,
      address: formData.address,
    };

    console.log("fff", formDataToSend);

    try {

      const response = await fetch(sendFormAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(formDataToSend),
      });
      if (response.ok) {
        alert("Update successfully");
        localStorage.setItem("activeComponent", "Dashboard");
        window.location.reload();
      } else {
        console.log("response", response);
        const errorData = await response.json();
        console.error("Error:", errorData.error);
        alert("Update failed: " + errorData.error[0]);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Update failed: ", error);
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
          <form className="form2" onSubmit={handleSubmit}>
            <div className="form2">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Student ID</label>
                <input
                  type="number"
                  name="studentID"
                  value={formData.studentID}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>PhoneNumber</label>
                <input
                  type="text"
                  name="PhoneNumber"
                  value={formData.PhoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Faculty</label>
                <input
                  type="text"
                  name="faculty"
                  value={formData.faculty}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
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
