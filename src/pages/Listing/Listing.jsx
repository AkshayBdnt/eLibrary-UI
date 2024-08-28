import React from 'react'
import styles from "./Listing.module.scss";
import { EcommerceCard } from '../../components/EcommerceCard/EcommerceCard';
// import Card from "../../components/Card/Card";

function Listing() {
  return (
    <div className={styles.main}>
      <EcommerceCard />
    </div>
  )
}

export default Listing
