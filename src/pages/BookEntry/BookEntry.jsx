import React, { useState } from "react";
import styles from "./BookEntry.module.scss";
import book from "../../assets/book.png";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function BookEntry() {
  const navigate = useNavigate();
  const [bookInfo, setBookInfo] = useState({
    title: "",
    author: "",
    count: "",
    cost: "",
    bookType: "",
    description: "",
    bookImage: null, // Change to null for file handling
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Handle file input separately
    if (name === "bookImage" && files.length > 0) {
      setBookInfo((prevBookInfo) => ({
        ...prevBookInfo,
        [name]: files[0], // Store the file object
      }));
    } else {
      setBookInfo((prevBookInfo) => ({
        ...prevBookInfo,
        [name]: value,
      }));
    }
  };

  // Handle form submission (Add Book)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userDetailsString = localStorage.getItem("userDetails");

      const userDetails = JSON.parse(userDetailsString);
      const token = userDetails.token;

      const formData = new FormData();
      for (const key in bookInfo) {
        formData.append(key, bookInfo[key]);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Ensure correct content type for file upload
        },
      };

      const response = await axios.post(
        `https://library-api-9bac.onrender.com/books/addbook`,
        formData,
        config
      );

      if (response.status === 201) {
        toast.success("Book Added Successfully!");
        navigate("/listing");
      } else {
        toast.error("Book Submission Failed!");
      }
    } catch (error) {
      toast.error("Book Submission Failed!");
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <div className={styles.imgContainer}>
            <img src={book} alt="Book" />
          </div>
          <div className={styles.headerText}>Book Entry</div>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.outerDiv}>
            <div>
              <div className={styles.label}>
                <label>Book Title</label>
              </div>
              <div>
                <input
                  type="text"
                  name="title"
                  value={bookInfo.title}
                  onChange={handleChange}
                  placeholder="Book Title"
                  className={styles.input}
                  required
                />
              </div>
            </div>
            <div>
              <div className={styles.label}>
                <label>Author's Name</label>
              </div>
              <div>
                <input
                  type="text"
                  name="author"
                  value={bookInfo.author}
                  onChange={handleChange}
                  placeholder="Author's Name"
                  className={styles.input}
                  required
                />
              </div>
            </div>
          </div>
          <div className={styles.outerDiv}>
            <div>
              <div className={styles.label}>
                <label>Book Type</label>
              </div>
              <div>
                <select
                  name="bookType"
                  value={bookInfo.bookType}
                  onChange={handleChange}
                  className={styles.input}
                  required
                >
                  <option value="" disabled>
                    Select Book Type
                  </option>
                  <option value="scienceFiction">Science Fiction</option>
                  <option value="technical">Technical</option>
                  <option value="biography">Biography</option>
                  <option value="nonFiction">Non-Fiction</option>
                  <option value="history">History</option>
                </select>
              </div>
            </div>
            <div>
              <div className={styles.label}>
                <label>Book's Image</label>
              </div>
              <div>
                <input
                  type="file"
                  name="bookImage"
                  onChange={handleChange} // No need to store the value attribute for file inputs
                  className={styles.input}
                  required
                />
              </div>
            </div>
          </div>
          <div className={styles.outerDiv}>
            <div>
              <div className={styles.label}>
                <label>Count</label>
              </div>
              <div>
                <input
                  type="number"
                  name="count"
                  value={bookInfo.count}
                  onChange={handleChange}
                  placeholder="Count"
                  className={styles.input}
                  required
                />
              </div>
            </div>
            <div>
              <div className={styles.label}>
                <label>Cost</label>
              </div>
              <div>
                <input
                  type="number"
                  name="cost"
                  value={bookInfo.cost}
                  onChange={handleChange}
                  placeholder="Cost"
                  className={styles.input}
                  required
                />
              </div>
            </div>
          </div>
          <div className={styles.textArea}>
            <div className={styles.label}>
              <label>Description</label>
            </div>
            <div>
              <textarea
                name="description"
                value={bookInfo.description}
                onChange={handleChange}
                className={styles.input}
                rows={5}
                cols={36}
                required
              />
            </div>
          </div>
          <div>
            <button className={styles.btn} type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookEntry;
