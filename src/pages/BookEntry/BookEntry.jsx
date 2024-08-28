import React, { useState } from "react";
import styles from "./BookEntry.module.scss";
import MenuBookTwoToneIcon from "@mui/icons-material/MenuBookTwoTone";
import book from "../../assets/book.png";
import axios from "axios";
import { toast } from "react-hot-toast"; // Ensure you have this installed for notifications

function BookEntry() {
  const [bookInfo, setBookInfo] = useState({
    title: "",
    author: "",
    count: "",
    cost: "",
    bookType: "",
    description: "",
    bookImage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookInfo((prevBookInfo) => ({
      ...prevBookInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      for (const key in bookInfo) {
        formData.append(key, bookInfo[key]);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "multipart/form-data", 
        },
      };

      const response = await axios.post(
        `https://library-api-9bac.onrender.com/books/addbook`,
        formData,
        config
      );
      if (response.status === 201) {
        console.log("Book Added successfully");
        toast.success("Book Added Successfully!");
      } else {
        console.log("Book Submission failed");
        toast.error("Book Submission Failed!");
      }
    } catch (error) {
      toast.error("Book Submission Failed!");
      console.error(error);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <div className={styles.imgContainer}>
            {/* <MenuBookTwoToneIcon fontSize="large" /> */}
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
                <label>Book's Image URL</label>
              </div>
              <div>
                <input
                  type="text"
                  name="bookImage"
                  value={bookInfo.bookImage}
                  onChange={handleChange}
                  className={styles.input}
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
