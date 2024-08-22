import styles from "./GlobalFilter.module.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <div className={styles.input_wrapper}>
      <SearchOutlinedIcon />
      <input
        className={styles.input}
        style={{ backgroundColor: "transparent" }}
        type="text"
        placeholder="Search...."
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
};

export default GlobalFilter;
