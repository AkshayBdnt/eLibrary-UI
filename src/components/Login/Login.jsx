import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.scss";
import toast from "react-hot-toast";
import elib from "../../assets/elib.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  // Handle form submission (Login)
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form default submission
    try {
      const response = await axios.post(
        `https://library-api-9bac.onrender.com/admin/login`,
        {
          email: userInfo.email,
          password: userInfo.password,
        }
      );

      if (response.status === 200) {
        const { token, name, usertype } = response.data;

        const userDetails = {
          token,
          name,
          usertype,
        };
        localStorage.setItem("userDetails", JSON.stringify(userDetails));

        navigate("/admin-dashboard");
        toast.success("Login successful!");
      } else {
        toast.error("Login failed!");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data?.error || "Login failed!");
      } else if (error.request) {
        toast.error("No response from server. Please try again later.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
      console.error("Login error:", error);
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
        <form className={style.formContainer} onSubmit={handleLogin}>
          <h2>Login</h2>
          <div className={style.inputContainer}>
            <label className={style.label}>Email:</label>
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
          <div className={style.inputContainer}>
            <label className={style.label}>Password:</label>
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
          <div className={style.btnContainer}>
            <button type="submit" className={style.loginBtn}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
