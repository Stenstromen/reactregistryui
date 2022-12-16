import React from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import { VscCopy } from "react-icons/vsc";

interface ViewTags {
  name: string;
  tags: string[];
  dates: string[];
  sizes: number[];
  digests: string[];
}

function ViewTags({ tags, dates, sizes, digests }: ViewTags) {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Size</th>
            <th>Content Digest</th>
            <th>Tag</th>
          </tr>
        </thead>
        <tbody>
          {tags.map((tag, index) => {
            return (
              <tr key={index}>
                <td>{dates[index]}</td>
                <td>{sizes[index]} MB</td>
                <td>{digests[index]}</td>
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
