import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Login from "../components/Login";
import Registration from "../components/Registration";
import Main from "../components/Main";
import Details from "../components/Details";
import Cart from "../components/Cart";
import Layout from "../components/Layout";
import HistoryOfShopping from "../components/HistoryOfShopping";

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Layout />}>
          {/* <Route index element={<HomePage />} /> */}
          <Route index element={<Main />} />
          <Route path="/main/:id" element={<Details />} />
          <Route path="/main/cart" element={<Cart />} />
          <Route path="/main/history" element={<HistoryOfShopping />} />
        </Route>
      </Routes>
    </>
  );
};

export default Routing;
