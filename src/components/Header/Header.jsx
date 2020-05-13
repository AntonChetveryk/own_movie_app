import React from "react";
import Login from "./Login";
import UserMenu from "./UserMenu";
import { connect } from "react-redux";

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
          </ul>
          {this.props.user ? <UserMenu /> : <Login />}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
  };
};

export default connect(mapStateToProps)(Header);
