import React, { useState, useEffect } from "react";

import { Card } from "@mui/material";
import "./style.css";

const UserDataForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });
  const [userData, setUserData] = useState({});
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (unsavedChanges) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [unsavedChanges]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setUnsavedChanges(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const userId = generateUserId();
      let userData = {};
      userData.userId = userId;
      userData.formData = formData;
      localStorage.setItem("userData", JSON.stringify(userData));
      setUnsavedChanges(false);
      setUserData(userData);
      setSubmissionSuccess(true);
      setFormData({
        name: "",
        address: "",
        email: "",
        phone: "",
      });
      setTimeout(() => {
        setSubmissionSuccess(false);
      }, 3000);
    }
  };

  const validateForm = () => {
    let valid = true;
    let errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
      valid = false;
    }
    if (!formData.address.trim()) {
      errors.address = "Address is required";
      valid = false;
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is not valid";
      valid = false;
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
      valid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone number must be 10 digits";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const generateUserId = () => {
    return Math.random().toString(36).substr(2, 9);
  };
  const handleFocus = () => {
    setErrors({});
  };

  return (
    <>
      <Card sx={{ minWidth: 400 }} style={{ padding: "20px" }}>
        <h2>Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={handleFocus}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              onFocus={handleFocus}
            />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={handleFocus}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onFocus={handleFocus}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>
          <button type="submit">Submit</button>
        </form>
      </Card>
      {submissionSuccess && (
        <div className="success-popup">
          <p>Data submitted successfully!</p>
        </div>
      )}
    </>
  );
};

export default UserDataForm;
