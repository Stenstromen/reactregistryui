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
  const [dates, setDates] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([])

  const getDate = async (item: string) => {
    return await axios
      .get(process.env.REACT_APP_BACKEND_URL + `/v2/${tag}/manifests/${item}`, {
        auth: {
          username: username,
          password: password,
        },
      })
      .then((res) => {
        setDates((dates) => [
          ...dates,
          JSON.parse(res.data.history[0].v1Compatibility).created,
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSize = async (item: string) => {
    return await axios
      .get(process.env.REACT_APP_BACKEND_URL + `/v2/${tag}/manifests/${item}`, {
        auth: {
          username: username,
          password: password,
        },
        headers: {
          Accept: "application/vnd.docker.distribution.manifest.v2+json"
        },
      })
      .then((res) => {
        /* setDates((dates) => [
          ...dates,
          JSON.parse(res.data.history[0].v1Compatibility).created,
        ]); */
        //console.log(res.data.config.size)
        // eslint-disable-next-line prefer-const
        let sizes = res.data.config.size;
        //console.log(res.data.layers)
        res.data.layers.forEach((item: { size: number; }) => {
          //console.log(item.size)
          sizes =+ item.size
        });

        console.log(sizes)
      })
      .catch((err) => {
        console.log(err);
      });
  }

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

  useEffect(() => {
    return tags.forEach((item: string) => {
      getDate(item);
      getSize(item);
    });
  }, [tags]);

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
      <ViewTags name={repoName} tags={tags} dates={dates} />
    </div>
  );
}

export default Tags;
