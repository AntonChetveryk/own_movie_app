import Cookies from "universal-cookie";

const cookies = new Cookies();

const initialState = {
  user: null,
  session_id: cookies.get("session_id"),
  showModal: false,
  favorits: [],
  watchlists: [],
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_AUTH": {
      cookies.set("session_id", action.payload.session_id, {
        path: "/",
        maxAge: 2592000,
      });
      return {
        ...state,
        session_id: action.payload.session_id,
        user: action.payload.user,
      };
    }
    case "LOG_OUT": {
      cookies.remove("session_id");
      return {
        ...state,
        session_id: null,
        user: null,
        favorits: [],
        watchlists: [],
      };
    }
    case "TOGGLE_MODAL": {
      return {
        ...state,
        showModal: !state.showModal,
      };
    }
    case "UPDATE_FAVORITE_MOVIES":
      return {
        ...state,
        favorits: action.payload,
      };
    case "UPDATE_WATCHLIST_MOVIES":
      return {
        ...state,
        watchlists: action.payload,
      };

    default:
      return state;
  }
};
