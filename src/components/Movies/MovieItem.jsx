import React from "react";

export default class Moviemovie extends React.Component {
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
          alt=""
        />
        <div className="card-body">
          <h6 className="card-title">{movie.title}</h6>
          <div className="card-text">Рейтинг: {movie.vote_average}</div>
        </div>
      </div>
    );
  }
}
