import React from "react";
import Login from "./Login";
import UserMenu from "./UserMenu";

class Header extends React.Component {
  render() {
    const {
      user,
      updateUser,
      updateSessionId,
      onLogOut,
      session_id,
    } = this.props;

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
          {user ? (
            <UserMenu user={user} session_id={session_id} onLogOut={onLogOut} />
          ) : (
            <Login updateUser={updateUser} updateSessionId={updateSessionId} />
          )}
        </div>
      </nav>
    );
  }
}

export default Header;
