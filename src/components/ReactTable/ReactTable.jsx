import styles from "./ReactTable.module.scss";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";
import GlobalFilter from "../GlobalFilter/GlobalFilter";

const ReactTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state: { pageIndex, globalFilter },
    setGlobalFilter,
    pageCount,
    gotoPage,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 5 },
      //   initialState: { pageSize: 5, pageIndex: 5 },
    },

    useGlobalFilter,
    useSortBy, // <- Pass useSortBy as a second argument here
    usePagination
  );
  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <GlobalFilter
          style={{ backgroundColor: "transparent" }}
          filter={globalFilter}
          setFilter={setGlobalFilter}
        />
        <button className={styles.primary_btn}>Search</button>
      </div>
      <div className={styles.react_table}>
        <table {...getTableProps()} className={styles.table}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr className={styles.tr} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    style={{minWidth: "120px", padding: "10px", borderBottom: "2px solid #ddd" }}
                  >
                    {column.render("Header")}
                    {/* Add sorting indicator */}
                    <span style={{ cursor: "pointer" }}>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <ArrowUpOutlined />
                        ) : (
                          <ArrowDownOutlined />
                        )
                      ) : (
                        <SwapVertIcon />
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td className={styles.td} {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <button
            disabled={pageIndex === 0}
            // onClick={() => gotoPage(0)}
            onClick={(e) => {
              e.preventDefault();
              gotoPage(0);
            }}
            className={styles.primary_btn}
            style={{ marginRight: "20px" }}
          >
            First Page
          </button>
          <button
            disabled={pageIndex >= pageCount - 1}
            // onClick={() => gotoPage(pageCount - 1)}
            onClick={(e) => {
              e.preventDefault();
              gotoPage(pageCount - 1);
            }}
            className={styles.primary_btn}
            style={{ marginRight: "20px" }}
          >
            Last Page
          </button>

          <button
            disabled={!canPreviousPage}
            // onClick={previousPage}
            onClick={(e) => {
              e.preventDefault();
              previousPage();
            }}
            className={styles.primary_btn}
            style={{ marginRight: "20px" }}
          >
            Prev
          </button>

          <span style={{ marginRight: "20px" }}>
            {pageIndex + 1} of {pageCount}
          </span>

          <button
            disabled={!canNextPage}
            // onClick={nextPage}
            onClick={(e) => {
              e.preventDefault();
              nextPage();
            }}
            className={styles.primary_btn}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReactTable;
