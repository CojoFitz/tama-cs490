import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import TAMA from "./pages/TAMA";
import axios from "axios";
import { AuthContext } from "./helpers/AuthContext";

function App() {


  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
    window.location.href = "/Login";
  };


  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            {authState.status && (
              <Link to="/TAMA"> TAMA </Link>
            )}
            {!authState.status && (
              <>
                <Link to="/Register"> Register </Link>
                <Link to="/Login"> Log In </Link>
              </>
            )}
            {authState.status && <span className="logout-link" onClick={logout}> Logout</span>}
          </div>
          <Routes>
            <Route path="/"  element={<Home/>} />
            <Route path="/TAMA"  element={<TAMA/>} />
            <Route path="/Register"  element={<Register/>} />
            <Route path="/Login"  element={<Login/>}/>
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
