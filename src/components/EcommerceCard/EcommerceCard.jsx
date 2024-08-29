import React from "react";
import book from "../../assets/book.png";
import book1 from "../../assets/book1.jpg";
import book2 from "../../assets/book2.jpg";
import styles from "./EcommerceCard.module.scss";

export function EcommerceCard({ title, cost, image, description }) {
  return (
    <div className={styles.main}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.img} />
      </div>
      <div className={styles.textContainer}>
        <div>{title}</div>
        <div>${cost}</div>
      </div>
      <div className={styles.description}>
      {description}
      </div>
      <div className={styles.btnContainer}>
        <button className={styles.btn}>Add To Cart</button>
      </div>
    </div>
  );
}
