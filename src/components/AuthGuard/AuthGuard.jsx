import React from "react";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const userDetailsString = localStorage.getItem("userDetails");

  if (!userDetailsString) {
    return <Navigate to="/" replace />;
  }

  const userDetails = JSON.parse(userDetailsString);
  const token = userDetails.token;

  console.log("Retrieved token:", token);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthGuard;
