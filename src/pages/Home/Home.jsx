import React, { useState, useEffect } from "react";
import Register from "../../components/Register/Register";
import Login from "../../components/Login/Login";
import style from "./Home.module.scss";
import { useParams } from "react-router-dom";

const Home = () => {
  const { display } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedButton, setSelectedButton] = useState("");
  const [displayComponent, setDisplayComponent] = useState("");

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
      <h2>E-Library</h2>
      <span>Login</span>
      <div className={style.login_main}>
        <form>
          <div>
            <label className={style.label}>Email</label>
            <input
              className={style.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className={style.label}>Password</label>
            <input
              className={style.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={style.btnContainer}>
            <button
              type="button"
              // onClick={handleLogin}
              className={style.login_btn}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
