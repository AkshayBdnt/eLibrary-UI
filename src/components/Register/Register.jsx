import React, { useState } from "react";
import style from "./Register.module.scss";
import elib from "../../assets/elib.jpg";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const userDetailsString = localStorage.getItem("userDetails");

  const userDetails = JSON.parse(userDetailsString);
  const token = userDetails?.token;
  const userType = userDetails?.usertype;

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

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    try {
      if (!userDetailsString) {
        toast.error("User not logged in or missing token.");
        return;
      }

      if (!token) {
        toast.error("Token is missing.");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `https://library-api-9bac.onrender.com/admin/register`,
        userInfo,
        config
      );

      if (response.status === 201) {
        console.log("User registered successfully");
        toast.success("Registered Successfully!");
        if (userType === "librarian") {
          navigate("/lib-dashboard");
        } else {
          navigate("/admin-dashboard");
        }
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
        <form className={style.formContainer} onSubmit={handleRegister}>
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
                required
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
                required
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
                required
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
                required
              >
                <option value="" disabled>
                  User Type
                </option>
                {userType === "administrator" ? (
                  <option value="librarian">Librarian</option>
                ) : (
                  <option value="user">User</option>
                )}
              </select>
            </div>
          </div>
          <div className={style.btnContainer}>
            <button type="submit" className={style.loginBtn}>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
