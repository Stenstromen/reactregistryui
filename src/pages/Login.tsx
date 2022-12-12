import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button"
import { useDefaultProvider } from "../contexts/default";

function Login() {

  interface User {
    Authorization: string;
  }

  const { setBasicAuth } = useDefaultProvider();
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    console.log(username)
    console.log(password)
    axios
      .get<User[]>(process.env.REACT_APP_BACKEND_URL + "/v2/", {
        auth: {
          username: username,
          password: password,
        },
      })
      .then((res) => {
        console.log(res.config.headers?.Authorization)
        setBasicAuth(res.config.headers?.Authorization)
      });
  }

  return (
  <div>
    <InputGroup className="mb-3">
              <Form.Control
                autoComplete="off"
                /* spellCheck="off" */
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
    </InputGroup>
    <InputGroup className="mb-3">
              <Form.Control
                autoComplete="off"
                /* spellCheck="off" */
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
    </InputGroup>
    <Button onClick={handleLogin}>Submit</Button>
  </div>
  );
}

export default Login;
