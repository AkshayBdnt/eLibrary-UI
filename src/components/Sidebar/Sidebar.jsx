import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import profile from "../../assets/download.png";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import toast from "react-hot-toast";

function Sidebar() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const userDetailsString = localStorage.getItem("userDetails");
  const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
  const name = userDetails?.name || "User";
  const userType = userDetails?.usertype || "guest";

  // Set the default path based on userType only on component mount
  useEffect(() => {
    if (userType === "administrator") {
      setActiveTab("dashboard");
      navigate("/admin-dashboard", { replace: true });
    } else if (userType === "librarian") {
      setActiveTab("dashboard");
      navigate("/lib-dashboard", { replace: true });
    }
  }, [userType]);

  const handleTabClick = (tab, path) => {
    setActiveTab(tab);
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("userDetails");
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
            onClick={() =>
              handleTabClick(
                "dashboard",
                userType === "administrator"
                  ? "/admin-dashboard"
                  : "/lib-dashboard"
              )
            }
          >
            <div className={styles.icons}>
              <DashboardOutlinedIcon />
            </div>
            <div>Dashboard</div>
          </button>

          {/* Conditional rendering for Listings - available to both admin and librarian */}
          {/* <button
            className={`${styles.sidebarItem} ${
              activeTab === "listing" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("listing", "/listing")}
          >
            <div className={styles.icons}>
              <ListOutlinedIcon />
            </div>
            <div>Listings</div>
          </button> */}

          {/* Conditional rendering for listings - available only to librarian */}
          {userType === "librarian" && (
            <button
              className={`${styles.sidebarItem} ${
                activeTab === "listing" ? styles.active : ""
              }`}
              onClick={() => handleTabClick("listing", "/listing")}
            >
              <div className={styles.icons}>
                <SettingsOutlinedIcon />
              </div>
              <div>Listing</div>
            </button>
          )}

          {userType === "librarian" && (
            <button
              className={`${styles.sidebarItem} ${
                activeTab === "bookForm" ? styles.active : ""
              }`}
              onClick={() => handleTabClick("bookForm", "/add-books")}
            >
              <div className={styles.icons}>
                <PostAddOutlinedIcon />
              </div>
              <div>Add Books</div>
            </button>
          )}

          {/* Conditional rendering for Settings - available only to admin */}
          {userType === "administrator" && (
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
          )}
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.profileContainer}>
          <img src={profile} alt="Profile" />
          <span>{name}</span>
        </div>
        <div className={styles.btnContainer}>
          {/* Add Account only available for admin */}
          {/* {userType === "administrator" && ( */}
          <>
            <button onClick={() => navigate("/register")}>Add Account</button>
            <br />
          </>
          {/* )} */}
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
