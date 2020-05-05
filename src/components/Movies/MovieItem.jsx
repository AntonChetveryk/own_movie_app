import React from "react";
import Star from "@material-ui/icons/Star";
import StarBorder from "@material-ui/icons/StarBorder";
import { fetchApi, API_KEY_3, API_URL } from "../../api/api";

export default class MovieItem extends React.Component {
  isFavorite = () => {
    const { favorits, movie } = this.props;

    return favorits.findIndex((item) => item.id === movie.id) !== -1;
  };

  onClick = () => {
    const {
      movie: { id },
      session_id,
      user,
    } = this.props;

    const favoriteApi = `${API_URL}/account/${user.id}}/favorite?api_key=${API_KEY_3}&session_id=${session_id}`;

    fetchApi(favoriteApi, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        media_type: "movie",
        media_id: id,
        favorite: !this.isFavorite(),
      }),
    }).then((res) => console.log(res));
  };

  render() {
    const { movie } = this.props;
    return (
      <div className="card">
        <img
          className="card-img-top card-img--height"
          src={
            movie.backdrop_path || movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${
                  movie.backdrop_path || movie.poster_path
                }`
              : "https://i.ya-webdesign.com/images/video-camera-png-icon.png"
          }
          alt="img"
        />
        <div className="card-body">
          <h6 className="card-title">{movie.title}</h6>
          <div className="card-text">Рейтинг: {movie.vote_average}</div>
          {this.isFavorite() ? (
            <Star onClick={this.onClick} />
          ) : (
            <StarBorder onClick={this.onClick} />
          )}
        </div>
      </div>
    );
  }
}
