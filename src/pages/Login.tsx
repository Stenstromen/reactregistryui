import axios from "axios";
import React, { useState } from "react";
import LoginModal from "../components/LoginModal";
import { useNavigate } from "react-router-dom";
import { useDefaultProvider } from "../contexts/default";

function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState<boolean>(false);
  const { username, setUsername, password, setPassword } =
    useDefaultProvider();

  const handleLogin = () => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/v2/", {
        auth: {
          username: username,
          password: password,
        },
      })
      .then(() => {
        console.log("Login ok");
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        navigate("/");
      })
      .catch(() => {
        console.log("Login fail");
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 3000);
      });
  };

  return (
    <div>
      <LoginModal
        password={password}
        setPassword={setPassword}
        username={username}
        setUsername={setUsername}
        handleLogin={handleLogin}
        show={show}
      />
    </div>
  );
}

export default Login;
