import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./LibrarianDashboard.module.scss";
import ReactTable from "../../components/ReactTable/ReactTable";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";

function LibrarianDashboard() {
  const navigate = useNavigate();
  const userColumns = [
    {
      Header: "User ID",
      accessor: "id",
    },
    {
      Header: "User Name",
      accessor: "username",
    },
    {
      Header: "Mail Address",
      accessor: "email",
    },
    {
      Header: "User Type",
      accessor: "user_type",
    },
    {
      Header: "Created Date",
      accessor: "createDate",
    },
  ];

  const data = [
    {
      id: "1",
      username: "john_doe",
      email: "john.doe@example.com",
      user_type: "Librarian",
      createDate: "2024-08-01",
    },
    {
      id: "2",
      username: "jane_smith",
      email: "jane.smith@example.com",
      user_type: "Librarian",
      createDate: "2024-08-02",
    },
    {
      id: "3",
      username: "alice_johnson",
      email: "alice.johnson@example.com",
      user_type: "Librarian",
      createDate: "2024-08-03",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <>
      <Navbar />

      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.heading}>Admin Dashboard</div>

          <div>
            <button className={styles.btn} onClick={handleSubmit}>
              Create New Account
            </button>
          </div>
        </div>
        <div className={styles.cardContainer}>
          <Card />
          <Card />
        </div>
        <ReactTable columns={userColumns} data={data} />
      </div>
    </>
  );
}

export default LibrarianDashboard;
