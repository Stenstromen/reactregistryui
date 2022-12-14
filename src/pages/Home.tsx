import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ViewRepositories from "../components/ViewRepositories";
import { useDefaultProvider } from "../contexts/default";

function Home() {
  const navigate = useNavigate();
  const { username, password, setTag, tag } = useDefaultProvider();
  const [repositories, setRepositories] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/v2/_catalog", {
        auth: {
          username: username,
          password: password,
        },
      })
      .then((res) => {
        setRepositories(res.data.repositories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (tag) return navigate("/tags");
  }, [tag, setTag]);

  return (
    <div
      style={{
        display: "flex",
        minWidth: "60%",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Header title="Repositories" />
      <ViewRepositories repositories={repositories} setTag={setTag} />
    </div>
  );
}

export default Home;
