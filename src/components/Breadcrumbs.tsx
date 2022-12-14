import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import PropTypes from "prop-types";

interface Breadcrumbs {
  current: string;
  prev: string[];
}

function Breadcrumbs({ prev, current }: Breadcrumbs) {
  return (
    <div
      style={{
        width: "100%",
        alignSelf: "flex-start",
      }}
    >
      <Breadcrumb>
        {prev
          ? prev.map((url, name) => {
              return (
                <>
                  <Breadcrumb.Item key={name} href={url}>
                    {name}
                  </Breadcrumb.Item>
                </>
              );
            })
          : null}
        <Breadcrumb.Item active>{current}</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}

Breadcrumbs.prototype = {
  prev: PropTypes.array.isRequired,
  current: PropTypes.string.isRequired,
};

export default Breadcrumbs;
