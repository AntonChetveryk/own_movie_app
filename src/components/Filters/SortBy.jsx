import React from "react";
import PropTypes from "prop-types";

function getYears(from, to) {
  let years = [];
  for (let i = from; i <= to; i++) {
    years.push(i);
  }
  return years;
}

const years = getYears(1950, 2025);

export default class SortBy extends React.Component {
  static propTypes = {
    filters: PropTypes.object.isRequired,
    onChangeFilters: PropTypes.func.isRequired,
  };

  static defaultProps = {
    options: [
      {
        label: "Популярные по убыванию",
        value: "popularity.desc",
        image: "/lol.jpg",
      },
      {
        label: "Популярные по возростанию",
        value: "popularity.asc",
      },
      {
        label: "Рейтинг по убыванию",
        value: "vote_average.desc",
      },
      {
        label: "Рейтинг по возростанию",
        value: "vote_average.asc",
      },
    ],
  };

  render() {
    const {
      filters: { sort_by, primary_release_year },
      onChangeFilters,
      options,
    } = this.props;
    return (
      <div className="form-group">
        <label htmlFor="sort_by">Сортировать по:</label>
        <select
          id="sort_by"
          className="form-control"
          name="sort_by"
          value={sort_by}
          onChange={onChangeFilters}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <label htmlFor="primary_release_year">Сортировать по году:</label>
        <select
          className="form-control"
          value={primary_release_year}
          onChange={onChangeFilters}
          id="primary_release_year"
          name="primary_release_year"
        >
          {years.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
