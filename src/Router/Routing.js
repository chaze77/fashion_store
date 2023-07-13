import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Registration from "../components/Registration";
// import Main from "../components/Main";
import Details from "../components/Details";
import Cart from "../components/Cart";
import Layout from "../components/Layout";
import HistoryOfShopping from "../components/HistoryOfShopping";
import Private from "../components/Private";

const Routing = () => {
  const Main = lazy(() => import("../components/Main"));
  return (
    <>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        {/* <Route element={<Layout />}> */}
        <Route
          path="/main"
          element={
            <Private>
              <Layout />
            </Private>
          }
        >
          <Route
            path="/main"
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <Private>
                  {" "}
                  <Main />{" "}
                </Private>
              </Suspense>
            }
          />

          <Route
            path="/main/:id"
            element={
              <Private>
                {" "}
                <Details />{" "}
              </Private>
            }
          />
          <Route
            path="/main/cart"
            element={
              <Private>
                <Cart />
              </Private>
            }
          />
          <Route
            path="/main/history"
            element={
              <Private>
                <HistoryOfShopping />
              </Private>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default Routing;
