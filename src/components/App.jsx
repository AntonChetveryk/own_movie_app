import React from "react";
import Filters from "./Filters/Filters";
import MoviesContainer from "./Movies/MoviesContainer";
import { API_URL, API_KEY_3, fetchApi } from "../api/api";
import Header from "./Header/Header";
import Cookies from "universal-cookie";
import { connect } from "react-redux";

const cookies = new Cookies();

class App extends React.Component {
  constructor() {
    super();
    this.initialState = {
      user: null,
      session_id: null,
      showModal: false,
      isLoading: false,
      filters: {
        sort_by: "popularity.desc",
        primary_release_year: 2020,
        genres: [],
      },
      page: 1,
      movies: [],
      favorits: [],
      watchlist: [],
    };
    this.state = this.initialState;
  }

  getFavorits = (user) => {
    const { session_id } = this.state;
    fetchApi(
      `${API_URL}/account/${user.id}/favorite/movies?api_key=${API_KEY_3}&session_id=${session_id}&language=ru-RU`
    ).then((data) => this.setState({ favorits: data.results }));
  };

  getWatchlist = (user) => {
    const { session_id } = this.state;
    fetchApi(
      `${API_URL}/account/${user.id}/watchlist/movies?api_key=${API_KEY_3}&session_id=${session_id}&language=ru-RU`
    ).then((data) => this.setState({ watchlist: data.results }));
  };

  updateUser = (user) => {
    this.setState({
      user,
    });
  };

  updateSessionId = (session_id) => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000,
    });
    this.setState({
      session_id,
    });
  };

  onLogOut = () => {
    cookies.remove("session_id");
    this.setState({
      session_id: null,
      user: null,
      favorits: [],
      watchlist: [],
    });
  };

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

  toggleModal = () => {
    this.setState((state) => {
      return { showModal: !state.showModal };
    });
  };

  componentDidMount() {
    const session_id = cookies.get("session_id");
    if (session_id) {
      fetchApi(
        `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
      ).then((user) => {
        this.updateUser(user);
        this.updateSessionId(session_id);
        this.getFavorits(user);
        this.getWatchlist(user);
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.session_id) {
      if (this.state.user !== prevState.user) {
        this.getFavorits(this.state.user);
        this.getWatchlist(this.state.user);
      }
    }
  }

  render() {
    const {
      filters,
      page,
      movies,
      total_pages,
      user,
      session_id,
      favorits,
      watchlist,
      showModal,
      isLoading,
    } = this.state;

    return (
      <>
        <Header
          user={user}
          session_id={session_id}
          showModal={showModal}
          onLogOut={this.onLogOut}
          updateUser={this.updateUser}
          updateSessionId={this.updateSessionId}
          toggleModal={this.toggleModal}
        />
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
                user={user}
                page={page}
                favorits={favorits}
                watchlist={watchlist}
                filters={filters}
                movies={movies}
                session_id={session_id}
                isLoading={isLoading}
                onChangePage={this.onChangePage}
                getMovies={this.getMovies}
                getFavorits={this.getFavorits}
                getWatchlist={this.getWatchlist}
                toggleModal={this.toggleModal}
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
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
