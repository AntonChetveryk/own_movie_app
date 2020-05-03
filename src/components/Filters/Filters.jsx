import React from "react";
import SortBy from "./SortBy";
import Pagination from "./Pagination";
import Genres from "./Genres";

export default class Filters extends React.PureComponent {
  render() {
    const {
      filters,
      page,
      onChangeFilters,
      onChangePage,
      total_pages,
      onReset,
      onChangeGenres,
    } = this.props;
    return (
      <form className="mb-3">
        <button type="button" className="btn btn-light my-2" onClick={onReset}>
          Сбросить фильтры
        </button>
        <SortBy filters={filters} onChangeFilters={onChangeFilters} />
        <div className="btn-group my-2">
          <button
            type="button"
            className="btn btn-light"
            disabled={page === 1}
            onClick={onChangePage.bind(null, page - 1)}
          >
            Назад
          </button>
          <button
            type="button"
            className="btn btn-light"
            disabled={page === total_pages}
            onClick={onChangePage.bind(null, page + 1)}
          >
            Вперед
          </button>
        </div>
        <Pagination page={page} total_pages={total_pages} />
        <h3 className="my-4">Жанры:</h3>
        <Genres filters={filters} onChangeGenres={onChangeGenres} />
      </form>
    );
  }
}
