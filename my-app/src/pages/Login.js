import React, { useState, useContext  } from "react";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from "react-router-dom";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        navigate ("/TAMA");
      }
    });
  };
  return (
    <div className="centeredContainer">
      <div className="formContainer">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="Alphanumerical Only"
          onChange={(event) => setUsername(event.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter a password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
  
}

export default Login;