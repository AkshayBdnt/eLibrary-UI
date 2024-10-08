import React, { useEffect, useState } from "react";
import styles from "./LibrarianDashboard.module.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Chart from "../../components/Chart/Chart";
import axios from "axios";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

function LibrarianDashboard() {
  const [data, setData] = useState([]);
  const [cardData, setCardData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
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
            `https://library-api-9bac.onrender.com/books/viewissuedbooks`,
            config
          );
          setCardData(response.data);
          setData(response.data.IssuedBooks || []);
        } catch (error) {
          setError("Error fetching data");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.main}>
      <h2 className={styles.header}>Librarian Dashboard</h2>
      <div className={styles.right}>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className={styles.error}>{error}</p>
        ) : (
          <>
            <div className={styles.cardContainer}>
              {/* <div className={styles.card}>
                <h2 className={styles.cardHeading}>No. Of Books Issued</h2>
                <p>{cardData.totalIssuedBooks}</p>
              </div>
              <div className={styles.card}>
                <h2 className={styles.cardHeading}>Total Amount</h2>
                <p>${cardData.totalAmount}</p>
              </div> */}
              {/* <div className={styles.card}>
                  <h2>Visitors</h2>
                </div> */}
              <div className={styles.card}>
                <div className={styles.cardDiv2}>
                  <AutoStoriesIcon
                    fontSize="large"
                    className={styles.bookIcon}
                  />
                </div>
                <div className={styles.cardDiv1}>
                  <h2>No. Of Books Borrowed</h2>
                  <h1>{cardData.totalIssuedBooks}</h1>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.cardDiv2}>
                  <CurrencyRupeeIcon
                    fontSize="large"
                    className={styles.bookIcon}
                  />
                </div>
                <div className={styles.cardDiv1}>
                  <h2>Total Cost</h2>
                  <h1>{cardData.totalAmount}</h1>
                </div>
              </div>
            </div>
            <div>
              <h2 className={styles.booksCirculated}>Books Circulated</h2>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Member Name</th>
                    <th>Book Title</th>
                    <th>Issued Date</th>
                    <th>Return Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data.map((issuedBook, index) => (
                      <tr key={index}>
                        <td>{issuedBook.issuedTo.name}</td>
                        <td>{issuedBook.book.title}</td>
                        <td>
                          {new Date(issuedBook.issuedDate).toLocaleDateString()}
                        </td>
                        <td>
                          {issuedBook.returnDate !== "N/A"
                            ? new Date(
                                issuedBook.returnDate
                              ).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td>{issuedBook.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No books circulated</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LibrarianDashboard;
