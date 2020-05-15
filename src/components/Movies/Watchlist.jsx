import React from "react";
import Bookmark from "@material-ui/icons/Bookmark";
import BookmarkBorder from "@material-ui/icons/BookmarkBorder";
import { fetchApi, API_KEY_3, API_URL } from "../../api/api";
import { connect } from "react-redux";
import { toggleModal, getWatchlist } from "../../redux/actions/authActions";

class Watchlist extends React.Component {
  state = {
    isLoading: false,
  };

  isWatchlist = () => {
    const { watchlists, movie } = this.props;

    return watchlists.findIndex((item) => item.id === movie.id) !== -1;
  };

  onClick = () => {
    const {
      movie: { id },
      session_id,
      user,
      getWatchlist,
      toggleModal,
    } = this.props;

    if (session_id) {
      const favoriteApi = `${API_URL}/account/${user.id}}/watchlist?api_key=${API_KEY_3}&session_id=${session_id}`;
      this.setState({ isLoading: true });

      fetchApi(favoriteApi, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          media_type: "movie",
          media_id: id,
          watchlist: !this.isWatchlist(),
        }),
      }).then((res) => {
        this.setState({ isLoading: false }, () => {
          getWatchlist({ session_id, user });
          console.log(res);
        });
      });
    } else {
      toggleModal();
    }
  };

  render() {
    return (
      <>
        {this.isWatchlist() ? (
          <Bookmark
            onClick={this.onClick}
            className={this.state.isLoading ? "disable" : null}
          />
        ) : (
          <BookmarkBorder
            onClick={this.onClick}
            className={this.state.isLoading ? "disable" : null}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    watchlists: state.authReducer.watchlists,
    user: state.authReducer.user,
    session_id: state.authReducer.session_id,
  };
};

const mapDispatchToProps = { toggleModal, getWatchlist };

export default connect(mapStateToProps, mapDispatchToProps)(Watchlist);
