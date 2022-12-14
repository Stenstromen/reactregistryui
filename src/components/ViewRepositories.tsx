import React from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import { VscGoToFile } from "react-icons/vsc";

interface ViewRepositories {
  repositories: string[];
  setTag: (tag: string) => void;
}

function ViewRepositories({ repositories, setTag }: ViewRepositories) {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Repository</th>
          </tr>
        </thead>
        <tbody>
          {repositories.map((item) => {
            return (
              <tr key={item} onClick={() => setTag(item)}>
                <td>
                  <a onClick={() => setTag(item)}>
                    <VscGoToFile size={20} />
                  </a>
                  &nbsp;&nbsp;&nbsp;{item}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

ViewRepositories.prototype = {
  repositories: PropTypes.array.isRequired,
  setTag: PropTypes.string.isRequired,
};

export default ViewRepositories;
