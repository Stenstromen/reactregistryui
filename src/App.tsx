import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Tags from "./pages/Tags";
import { useDefaultProvider } from "./contexts/default";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const navigate = useNavigate();
  const { username, password } = useDefaultProvider();

  useEffect(() => {
    return !username || !password
      ? (console.log("nothing in localstorage, redir to login"),
        navigate("/login"))
      : console.log("username password in localstorage, continue");
  }, []);

  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tags" element={<Tags />} />
      </Routes>
    </div>
  );
}

export default App;
