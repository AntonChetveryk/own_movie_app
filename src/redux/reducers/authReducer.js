import Cookies from "universal-cookie";

const cookies = new Cookies();

const initialState = {
  user: null,
  session_id: cookies.get("session_id"),
  showModal: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_AUTH": {
      console.log("update auth");
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
      };
    }
    case "TOGGLE_MODAL": {
      return {
        ...state,
        showModal: !state.showModal,
      };
    }
    default:
      return state;
  }
};
