import React from "react";

const Pagination = (props) => {
  const { page, total_pages } = props;
  return (
    <div className="text-center">
      <span>{`${page} of ${total_pages}`}</span>
    </div>
  );
};

export default Pagination;
