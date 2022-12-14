import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import PropTypes from "prop-types";

interface Breadcrumbs {
  prev: string[];
  current: string;
  item: string[];
  url: string;
  name: string;
}

function Breadcrumbs({ prev, current }: Breadcrumbs) {
  return (
    <>
      <Breadcrumb>
        {prev
          ? prev.map((item) => {
              return (
                <>
                  <Breadcrumb.Item href={item.url}>{item.name}</Breadcrumb.Item>
                </>
              );
            })
          : null}
        <Breadcrumb.Item active> {current}</Breadcrumb.Item>
      </Breadcrumb>
    </>
  );
}

Breadcrumbs.prototype = {
  prev: PropTypes.array.isRequired,
  current: PropTypes.string.isRequired,
};

export default Breadcrumbs;
