import React from "react";
import PropTypes from "prop-types";

interface Header {
  title: string;
}

function Header({ title }: Header) {
  return (
    <div style={{
        width: "100%",
        height: "100px",
        border: "2px solid blue",
        alignSelf: "flex-start"
    }}>
      <h1>{title}</h1>
    </div>
  );
}

Header.prototype = {
  title: PropTypes.string.isRequired,
};

export default Header;
