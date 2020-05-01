import React from "react";
import { Modal, ModalBody } from "reactstrap";

import LoginForm from "./LoginForm";

export default class Login extends React.Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState((state) => {
      return { showModal: !state.showModal };
    });
  };

  render() {
    return (
      <div>
        <button
          className="btn btn-success"
          type="button"
          onClick={this.toggleModal}
        >
          Login
        </button>
        <Modal isOpen={this.state.showModal} toggle={this.toggleModal}>
          <ModalBody>
            <LoginForm />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
