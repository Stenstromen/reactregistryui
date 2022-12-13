import axios from "axios";
import React from "react";
import LoginModal from "../components/LoginModal";
import { useDefaultProvider } from "../contexts/default";

function Login() {
  const { username, setUsername, password, setPassword, setLoggedIn } =
    useDefaultProvider();

  const handleLogin = () => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/v2/", {
        auth: {
          username: username,
          password: password,
        },
      })
      .then((res) => {
        console.log("Login ok " + res);
        setLoggedIn(true);
      })
      .catch((res) => {
        console.log("fail " + res);
        setLoggedIn(false);
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
      />
    </div>
  );
}

export default Login;
