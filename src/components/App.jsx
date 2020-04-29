import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import { API_URL, API_KEY_3 } from "../api/api";

export default class App extends React.Component {
  state = {
    filters: {
      sort_by: "popularity.desc",
      primary_release_year: 2020,
    },
    page: 1,
    movies: [],
  };

  getMovies = () => {
    const {
      filters: { sort_by, primary_release_year },
      page,
    } = this.state;
    const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&page=${page}&primary_release_year=${primary_release_year}`;
    fetch(link)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          movies: data.results,
          total_pages: data.total_pages,
        });
      });
  };

  onChangeFilters = (event) => {
    const { value, name } = event.target;
    this.setState((prevState) => ({
      filters: {
        ...prevState.filters,
        [name]: value,
      },
    }));
  };

  onChangePage = (page) => {
    this.setState({
      page,
    });
  };

  render() {
    const { filters, page, movies } = this.state;
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters
                  page={page}
                  filters={filters}
                  onChangeFilters={this.onChangeFilters}
                  onChangePage={this.onChangePage}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList
              page={page}
              getMovies={this.getMovies}
              filters={filters}
              movies={movies}
              onChangePage={this.onChangePage}
            />
          </div>
        </div>
      </div>
    );
  }
}
