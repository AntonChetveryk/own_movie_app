import React, { Component } from "react";
import MovieItem from "./MovieItem";

export default class MovieList extends Component {
  componentDidMount() {
    this.props.getMovies();
  }

  componentDidUpdate(prevProps) {
    const { filters, onChangePage, getMovies, page } = this.props;
    if (filters !== prevProps.filters) {
      onChangePage(1);
      getMovies();
    }

    if (page !== prevProps.page) {
      getMovies();
    }
  }

  render() {
    const { movies } = this.props;

    return (
      <div className="row">
        {movies.map((movie) => {
          return (
            <div key={movie.id} className="col-6 mb-4">
              <MovieItem item={movie} />
            </div>
          );
        })}
      </div>
    );
  }
}
