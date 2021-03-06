import React from "react";
import Star from "@material-ui/icons/Star";
import StarBorder from "@material-ui/icons/StarBorder";
import { fetchApi, API_KEY_3, API_URL } from "../../api/api";
import { connect } from "react-redux";
import { toggleModal, getFavorits } from "../../redux/actions/authActions";

class Favorit extends React.Component {
  isFavorite = () => {
    const { favorits, movie } = this.props;

    return favorits.findIndex((item) => item.id === movie.id) !== -1;
  };

  onClick = () => {
    const {
      movie: { id },
      session_id,
      user,
      getFavorits,
      toggleModal,
    } = this.props;

    if (session_id) {
      const favoriteApi = `${API_URL}/account/${user.id}}/favorite?api_key=${API_KEY_3}&session_id=${session_id}`;
      fetchApi(favoriteApi, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          media_type: "movie",
          media_id: id,
          favorite: !this.isFavorite(),
        }),
      }).then((res) => {
        getFavorits({ session_id, user });
        console.log(res);
      });
    } else {
      toggleModal();
    }
  };

  render() {
    return (
      <>
        {this.isFavorite() ? (
          <Star onClick={this.onClick} />
        ) : (
          <StarBorder onClick={this.onClick} />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    favorits: state.authReducer.favorits,
    user: state.authReducer.user,
    session_id: state.authReducer.session_id,
  };
};

const mapDispatchToProps = { toggleModal, getFavorits };

export default connect(mapStateToProps, mapDispatchToProps)(Favorit);
