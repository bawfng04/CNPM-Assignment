import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import resBackground from "./images/bg.png";
import GGlogo from "./images/GoogleLogo.png";

const registerAPI = "http://localhost:4000/register";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const navigate = useNavigate();

  const clearError = () => {
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (password !== rePassword) {
        setError("Password does not match!");
        clearError();
        return;
      }
      const response = await fetch(registerAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.error) {
        setError(data.error);
        clearError();
      } else {
        setRegisterSuccess(true);
        setTimeout(() => navigate("/login"), 3000);
      }
    } catch (error) {
      setError("Something went wrong! Please try again later.");
      clearError();
    }

  };

  // const handleRegister = (event) => {
  //   event.preventDefault();
  //   const userAccounts = JSON.parse(
  //     localStorage.getItem("userAccounts") || "{}"
  //   );
  //   if (userAccounts[email]) {
  //     setError("Email already registered!");
  //     clearError();
  //   } else if (password !== rePassword) {
  //     setError("Password does not match!");
  //     clearError();
  //   } else {
  //     userAccounts[email] = password;
  //     localStorage.setItem("userAccounts", JSON.stringify(userAccounts));
  //     setRegisterSuccess(true);
  //     setTimeout(() => navigate("/login"), 3000);
  //   }
  // };

  const handleCancel = () => {
    navigate("/login");
  };

  return (
    <div className="main-container">
      {registerSuccess && (
        <div className="registerNoti">
          <p className="reretext">Registration successful!</p>
          <p className="reretext">
            Please check your email to verify your account
          </p>
          <p className="reretext">
            Click{"   "}
            <a
              href="https://mail.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              this link
            </a>
            {"   "}
            to open Gmail.
          </p>
        </div>
      )}
      {error && (
        <div className="registerNotiError">
          <p>{error}</p>
        </div>
      )}
      <div className="left-side">
        <img src={resBackground} alt="Background" />
      </div>
      <div className="right-side">
        {/* <form onSubmit={handleRegister}> */}
        <form className="regisForm" onSubmit={handleSubmit}>
          <h1>Create an account</h1>
          <div className="input-container">
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder=" "
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-container">
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder=" "
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="input-container">
            <input
              type="password"
              id="rePassword"
              name="rePassword"
              required
              placeholder=" "
              onChange={(e) => setRePassword(e.target.value)}
            />
            <label htmlFor="rePassword">Confirm Password</label>
          </div>
          <button type="submit" className="registerButton">
            Create account
          </button>
          <button type="button" className="googleButton">
            <img src={GGlogo} alt="Google Logo" className="GGLogo"></img>
            Continue with Google
          </button>
          <div className="rUnderText">
            <p className="rText">Already Have An Account?</p>
            <span className="rLink" onClick={handleCancel}>
              Log In
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
