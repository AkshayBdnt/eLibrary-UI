import React, { useState } from "react";
import axios from "axios";
import styles from "./EcommerceCard.module.scss";

export function EcommerceCard({ id, title, cost, image, description }) {
  const [openModal, setOpenModal] = useState(false);
  const [returnDate, setReturnDate] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleOpenModal = (e) => {
    e.preventDefault();
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    const userDetailsString = localStorage.getItem("userDetails");
    if (userDetailsString) {
      const userDetails = JSON.parse(userDetailsString);
      const token = userDetails.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `https://library-api-9bac.onrender.com/books/issue`,
        {
          bookId: id,
          estimatedReturnDate: returnDate,
        },
        config
      );
      console.log(response);
      console.log("Return Date:", returnDate);
      console.log("Quantity:", quantity);
      handleCloseModal();
    } else {
      console.error("No user details found");
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.img} />
      </div>
      <div className={styles.textContainer}>
        <div>{title}</div>
        <div className={styles.text}>${cost}</div>
      </div>
      <div className={styles.description}>{description}</div>
      <div className={styles.btnContainer}>
        <button onClick={handleOpenModal} className={styles.btn}>
          Borrow Book
        </button>
      </div>

      {openModal && (
        <div className={styles.modalBackground}>
          <div className={styles.modalContent}>
            <h2>Borrow Book</h2>
            <div className={styles.formGroup}>
              <label>Return Book Date</label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className={styles.input}
                min="1"
              />
            </div>
            <div className={styles.modalActions}>
              <button onClick={handleSubmit} className={styles.submitBtn}>
                Submit
              </button>
              <button onClick={handleCloseModal} className={styles.cancelBtn}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
