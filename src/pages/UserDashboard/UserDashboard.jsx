import React, { useState, useEffect } from "react";
import styles from "./UserDashboard.module.scss";
import axios from "axios";

function UserDashboard() {
  const [bookData, setBookData] = useState([]);
  const [borrowedDetails, setBorrowedDetails] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetailsString = localStorage.getItem("userDetails");
      if (userDetailsString) {
        const userDetails = JSON.parse(userDetailsString);
        const token = userDetails.token;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        try {
          const response = await axios.get(
            `https://library-api-9bac.onrender.com/admin/userdetails`,
            config
          );
          console.log(response.data.borrowedBooks);
          setBookData(response.data);
          setBorrowedDetails(response.data.borrowedBooks);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchUserDetails();
  }, []);
  return (
    <div className={styles.main}>
      <h2 className={styles.header}>User Dashboard</h2>
      <div className={styles.right}>
        {/* <div className={styles.inputContainer}>
      <div>
        <input type="search" placeholder="Search" />
      </div>
    </div> */}

        {/* <div className={styles.chart}>
      <h3>Books Revenue</h3>
      <Chart />
    </div> */}
        {/* <div className={styles.revenueContainer}>
      <div>
        <h2>Revenue</h2>
      </div>
    </div> */}

        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <h2>No. Of Books Borrowed</h2>
            <h1>{bookData.totalBooksBorrowed}</h1>
          </div>
          <div className={styles.card}>
            <h2>Books Overdue</h2>
            <h1>1</h1>
          </div>
          <div className={styles.card}>
            <h2>Total Cost</h2>
            <h1>{bookData.totalCost}</h1>
          </div>
        </div>

        <div>
          <h2>List Of Borrowed Books</h2>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Cost</th>
                <th>Issued Date</th>
                <th>Return Date</th>
              </tr>
            </thead>
            <tbody>
              {borrowedDetails.length > 0 ? (
                borrowedDetails.map((bookDetails, index) => (
                  <tr key={index}>
                    <td>{bookDetails.title}</td>
                    <td>{bookDetails.cost}</td>
                    <td>
                      {new Date(bookDetails.issuedDate).toLocaleDateString()}
                    </td>
                    <td>
                      {new Date(
                        bookDetails.estimatedReturnDate
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No books borrowed.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
