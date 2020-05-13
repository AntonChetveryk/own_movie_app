import React from "react";
import { Modal, ModalBody } from "reactstrap";
import { toggleModal } from "../../redux/actions/authActions";
import { connect } from "react-redux";
import LoginForm from "./LoginForm";

class Login extends React.Component {
  render() {
    const { toggleModal, showModal } = this.props;

    return (
      <div>
        <button className="btn btn-success" type="button" onClick={toggleModal}>
          Login
        </button>
        <Modal isOpen={showModal} toggle={toggleModal}>
          <ModalBody>
            <LoginForm />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showModal: state.authReducer.showModal,
  };
};

const mapDispatchToProps = { toggleModal };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
