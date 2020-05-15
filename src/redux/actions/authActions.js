import { fetchApi, API_KEY_3, API_URL } from "../../api/api";

export const updateAuth = (payload) => {
  return { type: "UPDATE_AUTH", payload };
};

export const onLogOut = () => {
  return { type: "LOG_OUT" };
};

export const toggleModal = () => {
  return { type: "TOGGLE_MODAL" };
};

export const getFavorits = ({ session_id, user }) => (dispatch) => {
  fetchApi(
    `${API_URL}/account/${user.id}/favorite/movies?api_key=${API_KEY_3}&session_id=${session_id}&language=ru-RU`
  ).then((favorits) => {
    dispatch(updateFavoriteMovies(favorits.results));
  });
};

export const updateFavoriteMovies = (favorits) => {
  return {
    type: "UPDATE_FAVORITE_MOVIES",
    payload: favorits,
  };
};

export const getWatchlist = ({ session_id, user }) => (dispatch) => {
  fetchApi(
    `${API_URL}/account/${user.id}/watchlist/movies?api_key=${API_KEY_3}&session_id=${session_id}&language=ru-RU`
  ).then((watchlists) => {
    dispatch(updateWatchlistMovies(watchlists.results));
  });
};

export const updateWatchlistMovies = (watchlists) => {
  return {
    type: "UPDATE_WATCHLIST_MOVIES",
    payload: watchlists,
  };
};
