import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.scss";
import toast from "react-hot-toast";
// import { server } from "../../App";
import elib from "../../assets/elib.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `https://e-library-api-x6jh.onrender.com/admin/login`,
        {
          email: userInfo.email,
          password: userInfo.password,
        }
      );
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        navigate("/admin-dashboard");
        toast.success("Login successful!");
      } else {
        toast.error("Login failed!");
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        toast.error(error.response.data?.error || "Login failed!");
      } else if (error.request) {
        // Request was made but no response was received
        toast.error("No response from server. Please try again later.");
      } else {
        // Something happened in setting up the request that triggered an error
        toast.error("An unexpected error occurred. Please try again.");
      }
      console.error(error);
    }
  };
  

  return (
    <div className={style.main}>
      <div className={style.leftContainer}>
        <div className={style.imgContainer}>
          <img src={elib} />
        </div>
      </div>
      <div className={style.rightContainer}>
        <h1>Welcome to E-Library</h1>
        <form className={style.formContainer}>
          <h2>Login</h2>
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
          <div className={style.btnContainer}>
            <button
              type="button"
              onClick={handleLogin}
              className={style.loginBtn}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
