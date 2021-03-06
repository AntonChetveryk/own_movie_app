import React from "react";
import Favorit from "./Favorit";
import Watchlist from "./Watchlist";

export default class MovieItem extends React.Component {
  render() {
    const { movie, getFavorits, getWatchlist } = this.props;

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
          <Favorit movie={movie} getFavorits={getFavorits} />
          <Watchlist movie={movie} getWatchlist={getWatchlist} />
        </div>
      </div>
    );
  }
}
