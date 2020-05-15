import React, { Component } from "react";
import MoviesList from "./MoviesList";

export default class MoviesContainer extends Component {
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
    const { movies, getFavorits, getWatchlist, isLoading } = this.props;
    return (
      <>
        {isLoading ? (
          "Loading..."
        ) : (
          <MoviesList
            movies={movies}
            getFavorits={getFavorits}
            getWatchlist={getWatchlist}
          />
        )}
      </>
    );
  }
}
