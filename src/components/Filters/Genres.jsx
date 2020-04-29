import React from "react";
import { API_URL, API_KEY_3 } from "../../api/api";

export default class Genres extends React.Component {
  state = {
    genresList: [],
  };

  getGenresList = () => {
    fetch(`${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`)
      .then((res) => res.json())
      .then((res) => this.setState(this.setState({ genresList: res.genres })));
  };

  componentDidMount() {
    this.getGenresList();
  }

  render() {
    const { genresList } = this.state;
    const {
      filters: { genres },
      onChangeGenres,
    } = this.props;

    return (
      <div>
        {genresList.map((genre) => (
          <div key={genre.id}>
            <input
              type="checkbox"
              name={genre.name}
              id={genre.id}
              value={genre.id}
              checked={genres.includes(String(genre.id))}
              onChange={onChangeGenres}
            />
            <label htmlFor={genre.id} className="ml-2">
              {genre.name}
            </label>
          </div>
        ))}
      </div>
    );
  }
}
