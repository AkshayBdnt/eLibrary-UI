import React, { useState, useEffect } from "react";
import style from "./Register.module.scss";
import { useParams } from "react-router-dom";

const Register = () => {
  const { display } = useParams();
  const [selectedButton, setSelectedButton] = useState("");
  const [displayComponent, setDisplayComponent] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  useEffect(() => {
    if (display === "login") {
      setDisplayComponent("login");
      setSelectedButton("login");
    } else {
      setDisplayComponent("signup");
      setSelectedButton("signup");
    }
  }, [display]);

  const handleButtonClick = (component) => {
    setDisplayComponent(component);
    setSelectedButton(component);
  };

  return (
    <div className={style.container}>
      {/* <h2>E-Library</h2> */}
      <span>Register</span>
      <div className={style.login_main}>
        <form>
        <div>
            <label className={style.label}>Name</label>
            <input
              className={style.input}
              type="text"
              value={data.name}
              onChange={(e) => setData(e.target.value)}
            />
          </div>
          <div>
            <label className={style.label}>Email</label>
            <input
              className={style.input}
              type="email"
              value={data.email}
              onChange={(e) => setData(e.target.value)}
            />
          </div>
          <div>
            <label className={style.label}>Password</label>
            <input
              className={style.input}
              type="password"
              value={data.password}
              onChange={(e) => setData(e.target.value)}
            />
          </div>
          <div>
            <label className={style.label}>Confirm Password</label>
            <input
              className={style.input}
              type="password"
              value={data.confirmPassword}
              onChange={(e) => setData(e.target.value)}
            />
          </div>
          <div className={style.btnContainer}>
            <button
              type="button"
              // onClick={handleLogin}
              className={style.login_btn}
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
