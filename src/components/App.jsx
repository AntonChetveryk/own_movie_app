import React from "react";
import Filters from "./Filters/Filters";
import MoviesContainer from "./Movies/MoviesContainer";
import { API_URL, API_KEY_3, fetchApi } from "../api/api";
import Header from "./Header/Header";
import Cookies from "universal-cookie";
import { connect } from "react-redux";
import {
  updateAuth,
  getFavorits,
  getWatchlist,
} from "../redux/actions/authActions";

const cookies = new Cookies();

class App extends React.Component {
  constructor() {
    super();
    this.initialState = {
      isLoading: false,
      filters: {
        sort_by: "popularity.desc",
        primary_release_year: 2020,
        genres: [],
      },
      page: 1,
      movies: [],
    };
    this.state = this.initialState;
  }

  getMovies = () => {
    const {
      filters: { sort_by, primary_release_year, genres },
      page,
    } = this.state;
    const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&page=${page}&primary_release_year=${primary_release_year}&with_genres=${genres.join(
      ","
    )}`;

    this.setState({ isLoading: true });
    fetch(link)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          movies: data.results,
          total_pages: data.total_pages,
          isLoading: false,
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

  onChangeGenres = (e) => {
    const { value, checked } = e.target;
    this.setState((state) => {
      const {
        filters: { genres },
      } = state;
      return {
        filters: {
          ...state.filters,
          genres: checked
            ? [...genres, value]
            : genres.filter((el) => el !== value),
        },
      };
    });
  };

  onReset = (event) => {
    event.preventDefault();
    this.setState({ filters: this.initialState.filters });
  };

  componentDidMount() {
    const session_id = cookies.get("session_id");
    const { updateAuth, getFavorits, getWatchlist } = this.props;

    if (session_id) {
      fetchApi(
        `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
      ).then((user) => {
        updateAuth({ session_id, user });
        getFavorits({ session_id, user });
        getWatchlist({ session_id, user });
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { session_id, user, getFavorits, getWatchlist } = this.props;

    if (session_id) {
      if (user !== prevProps.user) {
        getFavorits({ session_id, user });
        getWatchlist({ session_id, user });
      }
    }
  }

  render() {
    const { filters, page, movies, total_pages, isLoading } = this.state;

    return (
      <>
        <Header />
        <div className="container">
          <div className="row mt-4">
            <div className="col-4">
              <div className="card">
                <div className="card-body">
                  <h3>Фильтры:</h3>
                  <Filters
                    page={page}
                    filters={filters}
                    total_pages={total_pages}
                    onChangeFilters={this.onChangeFilters}
                    onChangePage={this.onChangePage}
                    onReset={this.onReset}
                    onChangeGenres={this.onChangeGenres}
                  />
                </div>
              </div>
            </div>
            <div className="col-8">
              <MoviesContainer
                page={page}
                filters={filters}
                movies={movies}
                isLoading={isLoading}
                onChangePage={this.onChangePage}
                getMovies={this.getMovies}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
    session_id: state.authReducer.session_id,
  };
};
const mapDispatchToProps = { updateAuth, getFavorits, getWatchlist };

export default connect(mapStateToProps, mapDispatchToProps)(App);
