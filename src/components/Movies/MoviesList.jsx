import React from "react";
import MovieItem from "./MovieItem";
import PropTypes from "prop-types";

const MoviesList = ({ movies, session_id, favorits, watchlist, user }) => (
  <div className="row">
    {movies.map((movie) => {
      return (
        <div key={movie.id} className="col-6 mb-4">
          <MovieItem
            movie={movie}
            user={user}
            session_id={session_id}
            favorits={favorits}
            watchlist={watchlist}
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
