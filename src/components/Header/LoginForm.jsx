import React from "react";
import { API_URL, API_KEY_3 } from "../../api/api";
import { fetchApi } from "../../api/api";

const tokenApi = `${API_URL}/authentication/token/new?api_key=${API_KEY_3}`;
const tokenWithLoginApi = `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`;
const sessionIdApi = `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY_3}`;

export default class LoginForm extends React.Component {
  state = {
    username: "",
    password: "",
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

  handleBlur = () => {
    const errors = this.validateFields();
    if (Object.keys(errors).length > 0) {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          ...errors,
        },
      }));
    }
  };

  validateFields = () => {
    const errors = {};

    if (this.state.username === "") {
      errors.username = "Requaire";
    }

    return errors;
  };

  onSubmit = () => {
    const { username, password } = this.state;
    const getRequestToken = () => fetchApi(tokenApi);
    const validateWithLogin = (body) => fetchApi(tokenWithLoginApi, body);

    //1
    this.setState({
      submitting: true,
    });
    getRequestToken()
      .then(({ request_token }) => {
        //2
        return validateWithLogin({
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
            username: "chetverykanton92@gmail.com",
            password: "anton1031",
            request_token,
          }),
        });
      })
      .then((res) => {
        console.log(res);
        this.setState({
          submitting: false,
        });
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
    const { username, password, errors, submitting } = this.state;
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
              className="form-control"
              id="username"
              placeholder="Пользователь"
              name="username"
              value={username}
              onChange={this.onChange}
              onBlur={this.handleBlur}
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Пароль"
              name="password"
              value={password}
              onChange={this.onChange}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
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
            <div className="invalid-feedback text-center">{errors.base}</div>
          )}
        </form>
      </div>
    );
  }
}
