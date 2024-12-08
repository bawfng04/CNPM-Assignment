import React, { useState } from "react";
import "./AddPrinter.css";

const sentAPI = "http://localhost:4000/admin/creatprinter";

const AddPrinter = () => {
  const [formData, setFormData] = useState({
    brand_name: "",
    campus_name: "",
    building_name: "",
    room_number: "",
    default_num_pages: "",
    file_types: "",
    model: "",
  });

  const handleCheckboxChange = (event) => {
    const { name, value } = event.target;
    let updatedFileTypes = formData.file_types
      ? formData.file_types.split(",")
      : [];

    if (event.target.checked) {
      updatedFileTypes.push(value);
    } else {
      updatedFileTypes = updatedFileTypes.filter(
        (fileType) => fileType !== value
      );
    }

    setFormData({
      ...formData,
      [name]: updatedFileTypes.join(","),
    });
  };

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.model) newErrors.model = '"model" is not allowed to be empty';
    if (!formData.brand_name)
      newErrors.brand_name = '"brandname" is not allowed to be empty';
    if (!formData.campus_name)
      newErrors.campus_name = '"campus_name" is not allowed to be empty';
    if (!formData.building_name)
      newErrors.building_name = '"building_name" is not allowed to be empty';
    if (!formData.room_number)
      newErrors.room_number = '"room_number" is not allowed to be empty';
    if (!formData.default_num_pages || isNaN(formData.default_num_pages))
      newErrors.default_num_pages = '"default_num_pages" must be a number';
    if (!formData.file_types)
      newErrors.file_types = '"file_types" is not allowed to be empty';
    return newErrors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Ensure default_num_pages is a number
    const formDataToSend = {
      ...formData,
      default_num_pages: Number(formData.default_num_pages),
    };

    console.log("Submitting form data:", formDataToSend); // Log the form data being submitted
    fetch(sentAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authentication: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(formDataToSend),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            console.error("Server response:", data); // Log the entire server response
            console.log(data.error);
            alert(data.error);
            throw new Error(
              `HTTP error! status: ${res.status}, message: ${
                data.message || "No message provided"
              }`
            );
          });
        }
        // Handle successful response
        else {
          alert("Printer added successfully");
        }
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  return (
    <div className="wrapAddPrinter">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-section">
          <div className="all1">
            <div className="left1">
              <label>Model</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                required
              />

              <label>Brand Name</label>
              <input
                type="text"
                name="brand_name"
                value={formData.brand_name}
                onChange={handleChange}
                required
              />
              {errors.brandname && <p>{errors.brand_name}</p>}

              <label>Campus</label>
              <input
                type="text"
                name="campus_name"
                value={formData.campus_name}
                onChange={handleChange}
                required
                pattern=".{1,2}"
                title="Please enter 1 or 2 characters"
              />
              {errors.campus_name && <p>{errors.campus_name}</p>}
            </div>
            <div className="right1">
              <label>Building</label>
              <input
                type="text"
                name="building_name"
                value={formData.building_name}
                onChange={handleChange}
                required
              />
              {errors.building_name && <p>{errors.building_name}</p>}

              <label>Room</label>
              <input
                type="text"
                name="room_number"
                value={formData.room_number}
                onChange={handleChange}
                required
              />
              {errors.room_number && <p>{errors.room_number}</p>}

              <label>Default Number of Pages</label>
              <input
                type="number"
                name="default_num_pages"
                value={formData.default_num_pages}
                onChange={handleChange}
                required
              />
              {errors.default_num_pages && <p>{errors.default_num_pages}</p>}
            </div>
          </div>

          <div className="topp">
            <label className="kkkkk">File type</label>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="file_types"
                  value="docx"
                  checked={formData.file_types.split(",").includes("docx")}
                  onChange={handleCheckboxChange}
                />
                docx
              </label>
              <label>
                <input
                  type="checkbox"
                  name="file_types"
                  value="pdf"
                  checked={formData.file_types.split(",").includes("pdf")}
                  onChange={handleCheckboxChange}
                />
                pdf
              </label>
              <label>
                <input
                  type="checkbox"
                  name="file_types"
                  value="txt"
                  checked={formData.file_types.split(",").includes("txt")}
                  onChange={handleCheckboxChange}
                />
                txt
              </label>
              <label>
                <input
                  type="checkbox"
                  name="file_types"
                  value="jpg"
                  checked={formData.file_types.split(",").includes("jpg")}
                  onChange={handleCheckboxChange}
                />
                jpg
              </label>
            </div>
            {errors.file_types && <p>{errors.file_types}</p>}
          </div>
        </div>
        <div className="divAddButton">
          <button type="submit" className="add-button">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPrinter;
