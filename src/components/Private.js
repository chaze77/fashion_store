import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Private = ({ children }) => {
  const { authStatus } = useSelector((state) => state.auth);
  console.log(authStatus);

  if (!authStatus) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default Private;
