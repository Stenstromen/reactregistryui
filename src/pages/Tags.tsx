import React, { useState, useEffect } from "react";
//import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import ViewTags from "../components/ViewTags"
import { useDefaultProvider } from "../contexts/default";

function Tags() {
  //const { param } = useParams();
  const { username, password, tag } = useDefaultProvider();
  const [repoName, setRepoName] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + `/v2/${tag}/tags/list`, {
        auth: {
          username: username,
          password: password,
        },
      })
      .then((res) => {
        setRepoName(res.data.name)
        setTags(res.data.tags);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        minWidth: "60%",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Header title={repoName} />
      <ViewTags name={repoName} tags={tags} />
    </div>
  );
}

export default Tags;
