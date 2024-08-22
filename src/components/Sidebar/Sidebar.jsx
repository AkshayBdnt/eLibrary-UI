import React from "react";
import styles from "./Sidebar.module.scss";
import profile from "../../assets/download.png";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <h2>Shelves</h2>
      <ul>
        <div>
          <DashboardOutlinedIcon />
        </div>
        <div>Dashboard</div>
      </ul>
      <ul>
        <div>
          <ListOutlinedIcon />
        </div>
        <div>Listings</div>
      </ul>
      <ul>
        <div>
          <SettingsOutlinedIcon />
        </div>
        <div>Settings</div>
      </ul>
      <div className={styles.bottom}>
        <div className={styles.profileContainer}>
          <img src={profile} />
          <span>Akshay Wankhade</span>
        </div>
        <div className={styles.btnContainer}>
          <button> Add Account</button>
          <br />
          <button> Log Out</button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
