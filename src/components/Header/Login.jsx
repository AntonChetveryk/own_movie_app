import React from "react";
import { API_URL, API_KEY_3 } from "../../api/api";

// `${API_URL}/authentication/token/new?api_key=${API_KEY_3}`
// `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`
// `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY_3}`

export default class Login extends React.Component {
  sendPromises = () => {
    //1
    fetch(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
      .then((res) => res.json())
      .then(({ request_token }) =>
        //2
        fetch(
          `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
          {
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
          }
        )
          .then((res) => res.json())
          //3
          .then(({ request_token }) =>
            fetch(
              `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY_3}`,
              {
                method: "POST",
                mode: "cors",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify({
                  request_token,
                }),
              }
            )
              .then((res) => res.json())
              .then((res) => console.log(res.session_id))
          )
      );
  };
  render() {
    return (
      <div>
        <button
          className="btn btn-success"
          type="button"
          onClick={this.sendPromises}
        >
          Login
        </button>
      </div>
    );
  }
}
