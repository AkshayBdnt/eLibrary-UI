import React, { useState, useEffect } from "react";
import styles from "./MyAccount.module.scss";
import axios from "axios";

const MyAccount = () => {
  const [books, setBooks] = useState([]);
  const [userDetails, setUserDetails] = useState({
    name: "",
    phoneNo: "",
    gender: "",
    membership: { type: "" },
    userId: "",
  });
  const [originalDetails, setOriginalDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [isModified, setIsModified] = useState(false);

  const getTokenFromLocalStorage = () => {
    const userDetailsString = localStorage.getItem("userDetails");
    if (userDetailsString) {
      const { token } = JSON.parse(userDetailsString);
      return token;
    }
    console.error("No user details found in localStorage.");
    return null;
  };

  const fetchUserData = async () => {
    const token = getTokenFromLocalStorage();
    if (!token) return;

    try {
      const { data: userData } = await axios.get(
        "https://library-api-9bac.onrender.com/admin/userdetails",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUserDetails((prev) => ({
        ...userData,
        userId: userData.userId || prev.userId,
      }));
      setOriginalDetails(userData);
      setBooks(userData.borrowedBooks || []);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleReturnBook = async (bookId) => {
    const token = getTokenFromLocalStorage();
    if (!token) return;

    try {
      const response = await axios.post(
        "https://library-api-9bac.onrender.com/books/return",
        { issuedBookId: bookId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        alert("Book returned successfully!");
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
      }
    } catch (error) {
      console.error("Failed to return book:", error);
    }
  };

  const handleEditDetails = async (e) => {
    e.preventDefault();
    const token = getTokenFromLocalStorage();
    if (!token) return;

    try {
      const response = await axios.patch(
        `https://library-api-9bac.onrender.com/admin/user/${userDetails.userId}`,
        userDetails,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        alert("Details updated successfully!");
        setOriginalDetails(userDetails);
        setIsModified(false);
      }
    } catch (error) {
      console.log("Error updating details:", error);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setUserDetails((prev) => ({
      ...prev,
      [name]: name === "membership" ? { type: value } : value,
    }));

    const isChanged = Object.keys(userDetails).some((key) =>
      key !== "membership"
        ? userDetails[key] !== originalDetails[key]
        : userDetails.membership.type !== originalDetails.membership?.type
    );
    setIsModified(isChanged);
  };

  if (loading) return <div className={styles.emptyState}>Loading...</div>;

  return (
    <div className={styles.container}>
      <h2>My Account</h2>
      <div className={styles.basicDetails}>
        <h3>Basic Details</h3>
        <form onSubmit={handleEditDetails} className={styles.form}>
          <div className={styles.outerDiv}>
            <div>
              <label className={styles.label}>Name</label>
              <input
                type="text"
                name="name"
                value={userDetails.name}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div>
              <label className={styles.label}>Phone</label>
              <input
                type="text"
                name="phoneNo"
                value={userDetails.phoneNo}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          </div>
          <div className={styles.outerDiv}>
            <div style={{ width: "250px" }}>
              <label className={styles.label}>Gender</label>
              <select
                name="gender"
                value={userDetails.gender}
                onChange={handleChange}
                className={styles.input}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div style={{ width: "250px" }}>
              <label className={styles.label}>Membership</label>
              <select
                name="membership"
                value={userDetails.membership.type}
                onChange={handleChange}
                className={styles.input}
              >
                <option value="">Select Membership</option>
                <option value="yearly">Yearly</option>
                <option value="half-yearly">Half-Yearly</option>
                <option value="quarterly">Quarterly</option>
              </select>
            </div>
          </div>
          <button type="submit" className={styles.button} disabled={!isModified}>
            Save Changes
          </button>
        </form>
      </div>

      <h3 className={styles.issuedBooksTitle}>Issued Books</h3>
      <div className={styles.issuedBooks}>
        {books.length > 0 ? (
          <ul>
            {books.map((book) => (
              <li key={book.id} className={styles.issuedBookItem}>
                <div>
                  <strong>{book.title}</strong>
                  <p>Issued on: {new Date(book.issuedDate).toLocaleDateString()}</p>
                  <p>Return by: {new Date(book.returnDate).toLocaleDateString()}</p>
                </div>
                <button
                  onClick={() => handleReturnBook(book.id)}
                  className={`${styles.returnButton} ${
                    book.status === "returned" ? styles.returned : ""
                  }`}
                  disabled={book.status === "returned"}
                >
                  {book.status === "returned" ? "Returned" : "Return Book"}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.emptyState}>No books issued.</p>
        )}
      </div>
    </div>
  );
};

export default MyAccount;
