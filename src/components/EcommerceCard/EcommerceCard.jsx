import React from "react";
import book from "../../assets/book.png";
import book1 from "../../assets/book1.jpg";
import book2 from "../../assets/book2.jpg";
import styles from "./EcommerceCard.module.scss";

export function EcommerceCard({ imageSrc, title, price, description }) {
  return (
    <div className={styles.main}>
      <div className={styles.imageContainer}>
        <img src={book1} alt="book" className={styles.img} />
      </div>
      <div className={styles.textContainer}>
        <div>A Story Of Struggle</div>
        <div>$300</div>
      </div>
      <div className={styles.description}>
      With plenty of talk and listen time, voice-activated Siri access, and an available wireless charging case.
      </div>
      <div className={styles.btnContainer}>
        <button className={styles.btn}>Add To Cart</button>
      </div>
    </div>
  );
}
