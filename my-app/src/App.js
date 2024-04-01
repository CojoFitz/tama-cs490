import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import TAMA from "./pages/TAMA";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
  }, []);
    
  const logout = () => {
    sessionStorage.removeItem("accessToken");
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <Router>
        <div className="navbar">
            <Link to="/"> Home </Link>
            <Link to="/TAMA"> TAMA </Link>
            {!isLoggedIn && <Link to="/Register"> Register </Link>}
            {!isLoggedIn && <Link to="/Login"> Log In </Link>}
            {isLoggedIn && (
              <span className="logout-link" onClick={logout}>Log Out</span>
            )}
        </div>
        <Routes>
          <Route path="/"  element={<Home/>} />
          <Route path="/TAMA"  element={<TAMA/>} />
          {!isLoggedIn && <Route path="/Register"  element={<Register/>} />}
          {!isLoggedIn && <Route path="/Login"  element={<Login/>} />}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
