import React from "react";
import styles from "./Card.module.scss";

function Card() {
  return (
    <div className={styles.main}>
      <span>No. of Librarians</span>
      <h3>5</h3>
    </div>
  );
}

export default Card;
