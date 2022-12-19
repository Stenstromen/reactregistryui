import React, { useState, useEffect } from "react";
import axios from "axios";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import ViewTags from "../components/ViewTags";
import { useDefaultProvider } from "../contexts/default";

function Tags() {
  const { username, password, tag, setTag } = useDefaultProvider();
  const [render, setRender] = useState<string>("");
  const [repoName, setRepoName] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [sizes, setSizes] = useState<number[]>([]);
  const [digests, setDigests] = useState<string[]>([]);

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
    let size: number;
    return await axios
      .get(process.env.REACT_APP_BACKEND_URL + `/v2/${tag}/manifests/${item}`, {
        auth: {
          username: username,
          password: password,
        },
        headers: {
          Accept: "application/vnd.docker.distribution.manifest.v2+json",
        },
      })
      .then((res) => {
        size = res.data.config.size;
        res.data.layers.forEach((item: { size: number }) => {
          size += item.size;
        });
        setSizes((sizes) => [...sizes, Math.round(size / 1024 / 1024)]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDigest = async (item: string) => {
    return await axios
      .get(process.env.REACT_APP_BACKEND_URL + `/v2/${tag}/manifests/${item}`, {
        auth: {
          username: username,
          password: password,
        },
        headers: {
          Accept: "application/vnd.docker.distribution.manifest.v2+json",
        },
      })
      .then((res) => {
        setDigests((digests) => [...digests, res.data.config.digest]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteTagStep2 = (item: string) => {
    console.log("deleteing step2... ");
    axios
    .delete(
      process.env.REACT_APP_BACKEND_URL +
        `/v2/${tag}/manifests/${item}`,
      {
        auth: {
          username: username,
          password: password,
        },
        headers: {
          Accept: "application/vnd.docker.distribution.manifest.v2+json",
        },
      }
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  return setRender(item);
  }

  const deleteTag = (item: string) => {
    console.log("deleteing... ");
    return axios
      .get(process.env.REACT_APP_BACKEND_URL + `/v2/${tag}/manifests/${item}`, {
        auth: {
          username: username,
          password: password,
        },
        headers: {
          Accept: "application/vnd.docker.distribution.manifest.v2+json",
        },
      })
      .then((res) => {
        console.log(res.data.config.digest);
        deleteTagStep2(res.data.config.digest)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("fetching");
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
  }, [render]);

  useEffect(() => {
    return tags.forEach((item: string) => {
      getDate(item);
      getSize(item);
      getDigest(item);
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
      <ViewTags
        name={repoName}
        tags={tags}
        dates={dates}
        sizes={sizes}
        digests={digests}
        deleteTag={deleteTag}
      />
    </div>
  );
}

export default Tags;
