import React, { useState } from "react";
import style from "./Register.module.scss";
import elib from "../../assets/elib.jpg";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    userType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");
  
      // Set up the Axios request headers to include the token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      // Make the POST request with the token in headers and userInfo as data
      const response = await axios.post(
        `https://e-library-api-x6jh.onrender.com/admin/register`,
        userInfo,  // Data payload
        config     // Configuration object with headers
      );
  
      if (response.status === 201) {
        console.log("User registered successfully");
        toast.success("Registered Successfully!");
      } else {
        console.log("Registration failed");
        toast.error("Registration Failed!");
      }
    } catch (error) {
      toast.error("Registration Failed!");
      console.error(error);
    }
  };
  

  return (
    <div className={style.main}>
      <div className={style.leftContainer}>
        <div className={style.imgContainer}>
          <img src={elib} alt="E-Library" />
        </div>
      </div>
      <div className={style.rightContainer}>
        <h1>Welcome to E-Library</h1>
        <form className={style.formContainer}>
          <h2>Register</h2>
          <div className={style.inputContainer}>
            <div>
              <label className={style.label}>Name:</label>
            </div>
            <div>
              <input
                className={style.input}
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleChange}
                placeholder="Name"
              />
            </div>
          </div>
          <div className={style.inputContainer}>
            <div>
              <label className={style.label}>Email:</label>
            </div>
            <div>
              <input
                className={style.input}
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>
          </div>
          <div className={style.inputContainer}>
            <div>
              <label className={style.label}>Password:</label>
            </div>
            <div>
              <input
                className={style.input}
                type="password"
                name="password"
                value={userInfo.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </div>
          </div>
          <div className={style.inputContainer}>
            <div>
              <label className={style.label}>User Type:</label>
            </div>
            <div>
              <select
                className={style.select}
                name="userType"
                value={userInfo.userType}
                onChange={handleChange}
              >
                <option value="" disabled>
                  User Type
                </option>
                <option value="librarian">Librarian</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>
          <div className={style.btnContainer}>
            <button
              type="button"
              onClick={handleRegister}
              className={style.loginBtn}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
