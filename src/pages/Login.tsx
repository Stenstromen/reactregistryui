import axios from "axios";
import React, { useEffect } from "react";
import { useDefaultProvider } from "../contexts/default";

function Login() {
  const { username, setUsername, password, setPassword } = useDefaultProvider();

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/v2", {
        auth: {
          username: username,
          password: password,
        },
      })
      .then((res) => {
        console.log(res);
      });
  }, []);

  return <div></div>;
}

export default Login;
