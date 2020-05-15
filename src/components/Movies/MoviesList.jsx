import React from "react";
import MovieItem from "./MovieItem";
import PropTypes from "prop-types";

const MoviesList = ({
  movies,
  session_id,
  favorits,
  watchlist,
  user,
  getFavorits,
  getWatchlist,
  toggleModal,
}) => (
  <div className="row">
    {movies.map((movie) => {
      return (
        <div key={movie.id} className="col-6 mb-4">
          <MovieItem
            movie={movie}
            getFavorits={getFavorits}
            getWatchlist={getWatchlist}
          />
        </div>
      );
    })}
  </div>
);

MoviesList.defaultProps = {
  movies: [],
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default MoviesList;
