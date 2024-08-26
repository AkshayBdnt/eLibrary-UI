import React from "react";
import styles from "./BookEntry.module.scss";
import MenuBookTwoToneIcon from "@mui/icons-material/MenuBookTwoTone";
import book from "../../assets/book.png"

function BookEntry() {
  return (
    <div className={styles.main}>
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <div className={styles.imgContainer}>
            {/* <MenuBookTwoToneIcon fontSize="large" /> */}
            <img src={book} />
          </div>
          <div className={styles.headerText}>Book Entry</div>
        </div>
        <form className={styles.form}>
          <div className={styles.outerDiv}>
            <div>
              <div className={styles.label}>
                <label>Book Title</label>
              </div>
              <div>
                <input type="text" placeholder="Book Title" className={styles.input} />
              </div>
            </div>
            <div>
              <div className={styles.label}>
                <label>Author's Name</label>
              </div>
              <div>
                <input type="text" placeholder="Author's Name" className={styles.input} />
              </div>
            </div>
          </div>
          <div className={styles.outerDiv}>
            <div>
              <div className={styles.label}>
                <label>Book Type</label>
              </div>
              <div>
                <input type="text" placeholder="Type" className={styles.input} />
              </div>
            </div>
            <div>
              <div className={styles.label}>
                <label>Book's Image</label>
              </div>
              <div>
                <input type="file" className={styles.input} />
              </div>
            </div>
          </div>
          <div className={styles.outerDiv}>
            <div>
              <div className={styles.label}>
                <label>Count</label>
              </div>
              <div>
                <input placeholder="Count" className={styles.input} />
              </div>
            </div>
            <div>
              <div className={styles.label}>
                <label>Cost</label>
              </div>
              <div>
                <input placeholder="Cost" className={styles.input} />
              </div>
            </div>
          </div>
          <div className={styles.textArea}>
            <div className={styles.label}><label>Description</label></div>
            <div><textarea className={styles.input} rows={5} cols={36}/></div>
          </div>
          <div><button className={styles.btn}>Submit</button></div>
        </form>
      </div>
    </div>
  );
}

export default BookEntry;
