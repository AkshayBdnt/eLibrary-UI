import React, {useState, useEffect} from 'react'
import styles from "./Listing.module.scss";
import { EcommerceCard } from '../../components/EcommerceCard/EcommerceCard';
import axios from 'axios';

function Listing() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    
    const userDetailsString = localStorage.getItem("userDetails");
  
    if (userDetailsString) {
      const userDetails = JSON.parse(userDetailsString);
      const token = userDetails.token;
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      axios.get('https://library-api-9bac.onrender.com/books/viewbooks/', config)
        .then(response => {
          setBooks(response.data);  
        })
        .catch(error => console.error("Error fetching data:", error));
    } else {
      console.error("No user details found");
    }
  }, []);

  return (
    <div className={styles.main}>
      {books.length > 0 ? (
        books.map(book => (
          <EcommerceCard
            key={book._id}
            id={book._id}
            title={book.title}
            cost={book.cost}
            image={book.bookImage}
            description={book.description}
          />
        ))
      ) : (
        <p>Loading books...</p>
      )}
    </div>
  )
}

export default Listing
