import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import resBackground from "./images/bg.png";
import GGlogo from "./images/GoogleLogo.png";

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
    }, 2000);
  };

  const handleRegister = (event) => {
    event.preventDefault();
    const userAccounts = JSON.parse(
      localStorage.getItem("userAccounts") || "{}"
    );
    if (userAccounts[email]) {
      setError("Email already registered!");
      clearError();
    } else if (password !== rePassword) {
      setError("Password does not match!");
      clearError();
    } else {
      userAccounts[email] = password;
      localStorage.setItem("userAccounts", JSON.stringify(userAccounts));
      setRegisterSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    }
  };

  const handleCancel = () => {
    navigate("/login");
  };

  return (
    <div className="main-container">
      {registerSuccess && (
        <div className="registerNoti">
          <p>Registration successful!</p>
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
        <form onSubmit={handleRegister}>
          <h1>Create an account</h1>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="rePassword">Confirm Password</label>
          <input
            type="password"
            id="rePassword"
            name="rePassword"
            required
            onChange={(e) => setRePassword(e.target.value)}
          />
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
