import React, { useEffect, useState } from "react";
import styles from "./AdminDashboard.module.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Chart from "../../components/Chart/Chart";
import axios from "axios";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

function AdminDashboard() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState("");
  const [incomeData, setIncomeData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetailsString = localStorage.getItem("userDetails");

        if (userDetailsString) {
          const userDetails = JSON.parse(userDetailsString);
          const token = userDetails.token;

          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          const response = await axios.get(
            `https://library-api-9bac.onrender.com/admin/librarians/`,
            config
          );

          if (response.data) {
            setData(response.data.librarians);
            setCount(response.data.totalCount);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        const userDetailsString = localStorage.getItem("userDetails");

        if (userDetailsString) {
          const userDetails = JSON.parse(userDetailsString);
          const token = userDetails.token;

          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios.get(
            `https://library-api-9bac.onrender.com/income/monthly/`,
            config
          );
          if (response.data) {
            setIncomeData(response.data.monthlyIncome);
            setRevenueData(response.data.year[2024]);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchIncomeData();
  }, []);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long", 
      day: "numeric",
    });
  };

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
          <Chart data={incomeData} />
        </div>
        {/* <div className={styles.revenueContainer}>
          <div>
            <h2>Revenue</h2>
          </div>
        </div> */}

        <div className={styles.cardContainer}>
          {/* <div className={styles.card}>
            <h2>No. Of Librarians</h2>
            <h1>{count}</h1>
          </div> */}
          {/* <div className={styles.card}>
            <h2>No. Of Users</h2>
          </div>
          <div className={styles.card}>
            <h2>NO. Of Visitors</h2>
          </div> */}
          <div className={styles.card}>
            <div className={styles.cardDiv2}>
              <AutoStoriesIcon fontSize="large" className={styles.bookIcon} />
            </div>
            <div className={styles.cardDiv1}>
              <h2>No. Of Librarians</h2>
              <h1>{count}</h1>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardDiv2}>
              <CurrencyRupeeIcon fontSize="large" className={styles.bookIcon} />
            </div>
            <div className={styles.cardDiv1}>
              <h2>Total Revenue</h2>
              <h1>{revenueData}</h1>
            </div>
          </div>
        </div>

        <div>
          <h2 className={styles.list}>Librarian Data</h2>
          {data && data.length > 0 ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Created Date</th>
                </tr>
              </thead>
              <tbody>
                {data.map((details) => {
                  return (
                    <tr key={details.userId}>
                      <td>{details.username}</td>
                      <td>{details.userId}</td>
                      <td>{details.email}</td>
                      <td>{formatDate(details.createdDate)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p>No Data Available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
