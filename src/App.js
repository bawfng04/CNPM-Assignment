import "./App.css";
import React, { useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";

//test
// import Home from "./pages/components/Home";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main/*" element={<Main />} />

          <Route path="/" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
