import React from "react";
import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";

interface LoginFail {
  show: boolean;
}

function LoginFail({ show }: LoginFail) {
  return (
    <>
      <Alert show={show} key="danger" variant="danger">
        Login failed
      </Alert>
    </>
  );
}

export default LoginFail;

LoginFail.propTypes = {
  show: PropTypes.bool.isRequired,
};
