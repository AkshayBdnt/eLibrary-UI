import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./Layout.module.scss"; // Create a separate CSS/SCSS file for layout styling

function Layout() {
  return (
    <div className={styles.layout}>
        <div><Sidebar /></div>
      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
