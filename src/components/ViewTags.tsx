import React from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import { VscCopy } from "react-icons/vsc";
//import { LinkContainer } from "react-router-bootstrap";

interface ViewTags {
  name: string;
  tags: string[];
}

function ViewTags({ name, tags }: ViewTags) {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Tag</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tags.map((tag) => {
            return (
              <tr key={tag}>
                <td>{name}</td>
                <td>{tag}</td>
                <td>
                  <a
                    style={{ color: "black" }}
                    title="Copy Pull Command To Clipboard"
                    href="#"
                  >
                    <VscCopy size={20} />
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

ViewTags.prototype = {
  name: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
};

export default ViewTags;
