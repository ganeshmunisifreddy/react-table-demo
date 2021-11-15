import React from "react";
import "../css/pagination.css";

export default function Pagination(props) {
  const { totalCount, page, limit, handlePagination } = props;

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="pagination">
      <button
        className="nav-btn"
        onClick={() => handlePagination(page - 1, limit)}
        disabled={page === 1}
      >
        {"<"}
      </button>
      {Array.from({ length: totalPages }).map((_, i) => (
        <div
          key={"page-" + i}
          className={"page-number" + (page === i + 1 ? " active" : "")}
          onClick={() => handlePagination(i + 1, limit)}
        >
          {i + 1}
        </div>
      ))}
      <button
        className="nav-btn"
        onClick={() => handlePagination(page + 1, limit)}
        disabled={page === totalPages}
      >
        {">"}
      </button>
      <div className="records-per-page">
        <select
          value={limit}
          onChange={(e) => handlePagination(1, Number(e.target.value))}
        >
          <option value="10">10 / Page</option>
          <option value="15">15 / Page</option>
          <option value="20">20 / Page</option>
          <option value="25">25 / Page</option>
        </select>
      </div>
    </div>
  );
}
