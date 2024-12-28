import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Register from "./Register";
import logo from "./images/logo.png";
import "./Login.css";
import { jwtDecode } from "jwt-decode";

const loginAPI = "http://localhost:4000/login";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const [logged, setLogged] = useState(false);
  const navigate = useNavigate();

  // const testLocalStorage = () => {
  //   localStorage.setItem("123", "456");
  //   alert(localStorage.getItem("123"));
  // };

  const decodeToken = (token) => {
    const decoded = jwtDecode(token);
    console.log("decoded: ", decoded);
    return decoded;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(loginAPI, {
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

      if (data.error) {
        console.log("DATA: ", data);
        setError(data.error);

        clearError();
      }

      if (data.token) {
        console.log("DATA: ", data);
        localStorage.setItem(
          "role",
          JSON.stringify(decodeToken(data.token).role)
        );
        localStorage.setItem(
          "email",
          JSON.stringify(decodeToken(data.token).email)
        );
        localStorage.setItem(
          "userId",
          JSON.stringify(decodeToken(data.token).userID)
        );
        localStorage.setItem(
          "iat",
          JSON.stringify(decodeToken(data.token).iat)
        );
        localStorage.setItem(
          "exp",
          JSON.stringify(decodeToken(data.token).exp)
        );

        localStorage.setItem("token", data.token);
        setLogged(true);
        localStorage.setItem("isLoggedIn", "true");
        document.cookie = `token=${data.token}; max-age=3600; path=/`;
        console.log("TOKEN: ", localStorage.getItem("token"));

        setTimeout(() => {
          console.log("Current role: ", localStorage.getItem("role"));
          console.log("Current email: ", localStorage.getItem("email"));
          console.log("Current userId: ", localStorage.getItem("userId"));
          console.log("Current iat: ", localStorage.getItem("iat"));
          console.log("Current exp: ", localStorage.getItem("exp"));
          onLogin();
          const userRole = JSON.parse(localStorage.getItem("role"));
          if (userRole === "student") {
            navigate("/main/user");
          } else {
            navigate("/main/admin");
          }
        }, 3000);
      } else {
        if (email === "") {
          setError("Please input your email");
        } else if (password === "") {
          setError("Password can't be empty");
        } else {
          setError(data.error);
        }
        clearError();
      }
    } catch (error) {
      console.error("Errorrr", error);
      setError("Server  error");
      clearError();
    }
  };

  const clearError = () => {
    setTimeout(() => {
      setError("");
    }, 4000);
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
    <div className="lgPage">
      <div className="Main">
        {error && (
          <div className="loginNoti">
            <p>{error}</p>
          </div>
        )}
        {logged && (
          <div className="loginNotiS">
            <div className="tick"></div>
            <p className="lssf">Login successful!</p>
          </div>
        )}
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        {isRegistering ? (
          <Register onRegister={handleRegister} onCancel={handleRegister} />
        ) : (
          <div className="loginContainer">
            <div className="loginBox">
              <h1 className="login-title">Login to your account</h1>
              {/* <form className="login-form" onSubmit={handleLogin}> */}
              <form className="login-form" onSubmit={handleSubmit}>
                {/* Email Field */}
                <div className="input-container">
                  <input
                    className="loginInput"
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder=""
                    required
                  ></input>
                  <label htmlFor="email">Email</label>
                </div>
                {/* Password Field */}
                <div className="password-field">
                  <div className="password-text">
                    <label htmlFor="pasword"></label>
                    <a className="forgot-link" href="/">
                      Forgot?
                    </a>
                  </div>
                  <div className="input-container">
                    <input
                      className="loginInput"
                      type="password"
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder=""
                      required
                    ></input>
                    <label htmlFor="password">Password</label>
                  </div>
                </div>
                {/* Submit Button*/}
                <div className="loginButtonContainer">
                  <button className="loginButton" onClick={handleSubmit}>
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
    </div>
  );
}

export default Login;
