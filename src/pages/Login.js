import React, { useState } from "react";
import Register from "./Register";
import logo from "./images/logo.png";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const [logged, setlogged] = useState(false);

  // const testLocalStorage = () => {
  //   localStorage.setItem("123", "456");
  //   alert(localStorage.getItem("123"));
  // };

  const handleLogin = (e) => {
    e.preventDefault();
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = () => {
    setIsRegistering(false);
  };

  return (
    <div className="Main">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      {isRegistering ? (
        <Register onRegister={handleRegister} onCancel={handleRegister} />
      ) : (
        <div className="loginContainer">
          <div className="loginBox">
            <h1 className="login-title">Login to your account</h1>
            <form className="login-form" onSubmit={handleLogin}>
              {/* Email Field */}
              <div className="email-field">
                <label htmlFor="email">Email</label>
                <input
                  className="loginInput"
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  required
                ></input>
              </div>
              {/* Password Field */}
              <div className="password-field">
                <div className="password-text">
                  <label htmlFor="pasword">Password</label>
                  <a className="forgot-link" href="/">
                    Forgot?
                  </a>
                </div>
                <div className="passwordInput">
                  <input
                    className="loginInput"
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Enter your password"
                    required
                  ></input>
                </div>
              </div>
              {/* Submit Button*/}
              <div className="loginButtonContainer">
                <button className="loginButton" onClick={handleLogin}>
                  Login now
                </button>
              </div>
              {/* Sign Up */}
              <div className="signUp-field">
                <p className="signUp-text"> Don't have an account? </p>
                <a className="signUp-link" href="/register">
                  Sign up
                </a>
              </div>
              {/* End */}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
