import "./App.css";
import { useCallback, useEffect, useState } from "react";
import Table from "./components/Table";

const totalCount = 200;
const columnList = [
  {
    label: "Id",
    accesor: "id",
    show: true,
    sort: true,
  },
  {
    label: "User",
    accesor: "user.name",
    show: true,
  },
  {
    label: "Title",
    accesor: "title",
    show: true,
    sort: true,
  },
  {
    label: "Completed",
    accesor: "completed",
    show: true,
    sort: true,
  },
];

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("id");
  const [orderBy, setOrderBy] = useState("asc");
  const [displayedColumns, setDisplayedColumns] = useState(columnList);

  const fetchData = useCallback(() => {
    fetch(
      `https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${limit}&_sort=${sortBy}&_order=${orderBy}&_expand=user`
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      });
  }, [page, limit, sortBy, orderBy]);

  const handlePagination = (pageVal, limitVal) => {
    setPage(pageVal);
    setLimit(limitVal);
  };

  const handleSorting = (sortByVal, orderByVal) => {
    setSortBy(sortByVal);
    setOrderBy(orderByVal);
  };

  const handleDisplayedColums = (checked, index) => {
    let cols = [...displayedColumns];
    cols[index].show = checked;

    setDisplayedColumns(cols);
  };

  useEffect(() => {
    fetchData();
    return () => {};
  }, [fetchData]);

  return (
    <div className="App">
      <h3 style={{ textAlign: "center" }}>Todos</h3>
      <div className="col-list">
        <h5>Columns : </h5>
        {displayedColumns.map((col, idx) => (
          <div className="col-list-item" key={"col-item-" + col.label}>
            <input
              type="checkbox"
              checked={col.show}
              onChange={(e) => handleDisplayedColums(e.target.checked, idx)}
            />
            {col.label}
          </div>
        ))}
      </div>
      <Table
        totalCount={totalCount}
        displayedColumns={displayedColumns}
        page={page}
        limit={limit}
        sortBy={sortBy}
        orderBy={orderBy}
        handlePagination={handlePagination}
        handleSorting={handleSorting}
        data={data}
      />
    </div>
  );
}

export default App;
