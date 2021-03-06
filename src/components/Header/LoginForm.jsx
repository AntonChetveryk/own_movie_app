import React from "react";
import { API_URL, API_KEY_3 } from "../../api/api";
import { fetchApi } from "../../api/api";
import classNames from "classnames";
import { connect } from "react-redux";
import { updateAuth } from "../../redux/actions/authActions";

const tokenApi = `${API_URL}/authentication/token/new?api_key=${API_KEY_3}`;
const tokenWithLoginApi = `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`;
const sessionIdApi = `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY_3}`;
class LoginForm extends React.Component {
  state = {
    username: "",
    password: "",
    repeatPassword: "",
    errors: {},
    submitting: false,
  };

  onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevState) => ({
      [name]: value,
      errors: {
        ...prevState.errors,
        [name]: null,
        base: null,
      },
    }));
  };

  handleBlur = (e) => {
    const { name } = e.target;
    const errors = this.validateFields();
    if (Object.keys(errors).length > 0) {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          [name]: errors[name],
        },
      }));
    }
  };

  validateFields = () => {
    const errors = {};

    if (this.state.username === "") {
      errors.username = "Обязательно";
    }

    if (this.state.password === "") {
      errors.password = "Обязательно";
    }

    if (this.state.repeatPassword !== this.state.password) {
      errors.repeatPassword = "Должен быть равен паролю";
    }

    return errors;
  };

  onSubmit = () => {
    const { username, password } = this.state;
    let session_id = null;
    //1
    this.setState({
      submitting: true,
    });
    fetchApi(tokenApi)
      .then(({ request_token }) => {
        //2
        return fetchApi(tokenWithLoginApi, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
            request_token,
          }),
        });
      })
      .then(({ request_token }) => {
        //3
        return fetchApi(sessionIdApi, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            request_token,
          }),
        });
      })
      .then((res) => {
        session_id = res.session_id;
        return fetchApi(
          `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
        );
      })
      .then((user) => {
        this.setState(
          {
            submitting: false,
          },
          () => this.props.updateAuth({ session_id, user })
        );
      })

      .catch((error) =>
        this.setState({
          submitting: false,
          errors: {
            base: error.status_message,
          },
        })
      );
  };

  onLogin = (e) => {
    e.preventDefault();
    const errors = this.validateFields();
    if (Object.keys(errors).length > 0) {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          ...errors,
        },
      }));
    } else {
      this.onSubmit();
    }
  };

  render() {
    const {
      username,
      password,
      errors,
      submitting,
      repeatPassword,
    } = this.state;
    return (
      <div className="form-login-container">
        <form className="form-login">
          <h1 className="h3 mb-3 font-weight-normal text-center">
            Авторизация
          </h1>
          <div className="form-group">
            <label htmlFor="username">Пользователь</label>
            <input
              type="text"
              className={classNames("form-control", {
                "border-red": errors.username,
              })}
              id="username"
              placeholder="Пользователь"
              name="username"
              value={username}
              onChange={this.onChange}
              onBlur={this.handleBlur}
            />
            {errors.username && (
              <div className="invalid">{errors.username}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              className={classNames("form-control", {
                "border-red": errors.password,
              })}
              id="password"
              placeholder="Пароль"
              name="password"
              value={password}
              onChange={this.onChange}
              onBlur={this.handleBlur}
            />
            {errors.password && (
              <div className="invalid">{errors.password}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="repeatPassword">Повторите пароль</label>
            <input
              type="password"
              className={classNames("form-control", {
                "border-red": errors.repeatPassword,
              })}
              id="repeatPassword"
              placeholder="Повторите пароль"
              name="repeatPassword"
              value={repeatPassword}
              onChange={this.onChange}
              onBlur={this.handleBlur}
            />
            {errors.repeatPassword && (
              <div className="invalid">{errors.repeatPassword}</div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-lg btn-primary btn-block"
            onClick={this.onLogin}
            disabled={submitting}
          >
            Вход
          </button>
          {errors.base && (
            <div className="invalid text-center">{errors.base}</div>
          )}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
    session_id: state.authReducer.session_id,
  };
};

const mapDispatchToProps = { updateAuth };

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
