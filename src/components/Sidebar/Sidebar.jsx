import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import profile from "../../assets/download.png";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import toast from "react-hot-toast"

function Sidebar() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const userDetailsString = localStorage.getItem("userDetails");

  const userDetails = JSON.parse(userDetailsString);
  const name = userDetails.name;
  const userType = userDetails.usertype;

  const handleTabClick = (tab, path) => {
    setActiveTab(tab);
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout Successful");
    navigate("/");
  };

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.top}>
        <h2>Shelves</h2>
        <div className={styles.sidebar}>
          <button
            className={`${styles.sidebarItem} ${
              activeTab === "dashboard" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("dashboard", "/admin-dashboard")}
          >
            <div className={styles.icons}>
              <DashboardOutlinedIcon />
            </div>
            <div>Dashboard</div>
          </button>
          <button
            className={`${styles.sidebarItem} ${
              activeTab === "listing" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("listing", "/listing")}
          >
            <div className={styles.icons}>
              <ListOutlinedIcon />
            </div>
            <div>Listings</div>
          </button>
          <button
            className={`${styles.sidebarItem} ${
              activeTab === "setting" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("setting", "/setting")}
          >
            <div className={styles.icons}>
              <SettingsOutlinedIcon />
            </div>
            <div>Settings</div>
          </button>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.profileContainer}>
          <img src={profile} alt="Profile" />
          <span>{name}</span>
        </div>
        <div className={styles.btnContainer}>
          <button onClick={() => (navigate("/register"))}>Add Account</button>
          <br />
          <button onClick={handleLogout}>
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
