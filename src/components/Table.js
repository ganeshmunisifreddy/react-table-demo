import React from "react";
import "../css/table.css";
import Pagination from "./Pagination";
import { getDataFromPath } from "../utils";
import { MdArrowUpward, MdArrowDownward } from "react-icons/md";

export default function Table(props) {
  const {
    totalCount,
    displayedColumns,
    page,
    limit,
    orderBy,
    handlePagination,
    handleSorting,
    data,
  } = props;
  return (
    <div>
      <Pagination
        totalCount={totalCount}
        page={page}
        limit={limit}
        handlePagination={handlePagination}
      />
      <table>
        <thead>
          <tr className="header-row">
            {displayedColumns
              .filter((x) => x.show)
              .map((c) => (
                <th key={"col-head-item-" + c.label}>
                  <div className="col-header-cell">
                    {c.label}
                    {c.sort && (
                      <span className="order-by-icon">
                        {orderBy === "asc" ? (
                          <MdArrowUpward
                            onClick={() => handleSorting(c.accesor, "desc")}
                          />
                        ) : (
                          <MdArrowDownward
                            onClick={() => handleSorting(c.accesor, "asc")}
                          />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {displayedColumns
                .filter((x) => x.show)
                .map((c, colIdx) => (
                  <td key={`row-${row.id}-col-${colIdx}`}>
                    {getDataFromPath(c.accesor, row).toString()}
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalCount={totalCount}
        page={page}
        limit={limit}
        handlePagination={handlePagination}
      />
    </div>
  );
}
