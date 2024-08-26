import React from "react";
import styles from "./Sidebar.module.scss";
import profile from "../../assets/download.png";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

function Sidebar({ activeTab, onTabChange }) {
  return (
    <div className={styles.sidebarContainer}>
      <h2>Shelves</h2>
      <button
        className={`${styles.sidebar} ${
          activeTab === "Dashboard" ? styles.active : ""
        }`}
        onClick={() => onTabChange("Dashboard")}
      >
        <div className={styles.icons}>
          <DashboardOutlinedIcon />
        </div>
        <div>Dashboard</div>
      </button>
      <button
        className={`${styles.sidebar} ${
          activeTab === "Listing" ? styles.active : ""
        }`}
        onClick={() => onTabChange("Listing")}
      >
        <div className={styles.icons}>
          <ListOutlinedIcon />
        </div>
        <div>Listings</div>
      </button>
      <button
        className={`${styles.sidebar} ${
          activeTab === "Setting" ? styles.active : ""
        }`}
        onClick={() => onTabChange("Setting")}
      >
        <div className={styles.icons}>
          <SettingsOutlinedIcon />
        </div>
        <div>Settings</div>
      </button>
      <div className={styles.bottom}>
        <div className={styles.profileContainer}>
          <img src={profile} alt="Profile" />
          <span>Akshay Wankhade</span>
        </div>
        <div className={styles.btnContainer}>
          <button>Add Account</button>
          <br />
          <button>
            <div className={styles.icons}>
              <LogoutOutlinedIcon />
            </div>
            <div>Log Out</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
