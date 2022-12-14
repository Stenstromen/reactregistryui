import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import LoginFail from "./LoginFail";

interface LoginModal {
  password: string;
  setPassword: (password: string) => void;
  username: string;
  setUsername: (username: string) => void;
  handleLogin: (params: unknown) => unknown;
  show: boolean;
}

function LoginModal({
  password,
  setPassword,
  username,
  setUsername,
  handleLogin,
  show,
}: LoginModal) {
  return (
    <div>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={true}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Please Login <em>{process.env.REACT_APP_BACKEND_URL}</em>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button onClick={handleLogin}>Login</Button>
        </Modal.Body>
        <LoginFail show={show} />
      </Modal>
    </div>
  );
}

LoginModal.propTypes = {
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default LoginModal;
