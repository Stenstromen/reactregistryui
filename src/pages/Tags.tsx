import React, { useState, useEffect } from "react";
import axios from "axios";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import ViewTags from "../components/ViewTags";
import { useDefaultProvider } from "../contexts/default";

function Tags() {
  const { username, password, tag, setTag } = useDefaultProvider();
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
        setRepoName(res.data.name);
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
      {/* <Breadcrumbs current={repoName} prev={previous} /> */}
      <Breadcrumb
        style={{
          width: "100%",
          alignSelf: "flex-start",
        }}
      >
        <Breadcrumb.Item>
          <Link to={"/"} onClick={() => setTag("")}>
            Home
          </Link>
        </Breadcrumb.Item>{" "}
        <Breadcrumb.Item active>{repoName}</Breadcrumb.Item>
      </Breadcrumb>
      <ViewTags name={repoName} tags={tags} />
    </div>
  );
}

export default Tags;
