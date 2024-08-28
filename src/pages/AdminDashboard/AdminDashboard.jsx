import React from "react";
import styles from "./AdminDashboard.module.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Chart from "../../components/Chart/Chart";

function AdminDashboard() {



  return (
    <div className={styles.main}>
      <h2 className={styles.header}>Admin Dashboard</h2>
      <div className={styles.right}>
        <div className={styles.inputContainer}>
          <div>
            <input type="search" placeholder="Search" />
          </div>
        </div>

        <div className={styles.chart}>
          <h3>Books Revenue</h3>
          <Chart />
        </div>
        {/* <div className={styles.revenueContainer}>
          <div>
            <h2>Revenue</h2>
          </div>
        </div> */}

        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <h2>Borrowed</h2>
          </div>
          <div className={styles.card}>
            <h2>Overdue</h2>
          </div>
          <div className={styles.card}>
            <h2>Visitors</h2>
          </div>
        </div>

        <div>
          <h2>Books Circulated</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Members</th>
                <th>ID</th>
                <th>Title</th>
                <th>Return Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John Doe</td>
                <td>12345</td>
                <td>The Great Gatsby</td>
                <td>2024-09-15</td>
              </tr>
              <tr>
                <td>Jane Smith</td>
                <td>67890</td>
                <td>1984</td>
                <td>2024-09-20</td>
              </tr>
              <tr>
                <td>Michael Johnson</td>
                <td>54321</td>
                <td>To Kill a Mockingbird</td>
                <td>2024-09-25</td>
              </tr>
              <tr>
                <td>Emily Davis</td>
                <td>98765</td>
                <td>Pride and Prejudice</td>
                <td>2024-09-30</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
