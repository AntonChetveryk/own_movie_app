import React from "react";
import Bookmark from "@material-ui/icons/Bookmark";
import BookmarkBorder from "@material-ui/icons/BookmarkBorder";
import { fetchApi, API_KEY_3, API_URL } from "../../api/api";

export default class Watchlist extends React.Component {
  state = {
    isLoading: false,
  };

  isWatchlist = () => {
    const { watchlist, movie } = this.props;

    return watchlist.findIndex((item) => item.id === movie.id) !== -1;
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
          getWatchlist(user);
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
