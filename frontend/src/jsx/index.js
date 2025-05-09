import React, { useContext } from "react";

import { Routes, Route, Outlet } from "react-router-dom";

import "./index.css";
import "./chart.css";
import "./step.css";

import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
import ScrollToTop from "./pages/ScrollToTop";

import LockScreen from "./pages/LockScreen";
import Error400 from "./pages/Error400";
import Error403 from "./pages/Error403";
import Error404 from "./pages/Error404";
import Error500 from "./pages/Error500";
import Error503 from "./pages/Error503";
import Setting from "./layouts/Setting";
import { ThemeContext } from "../context/ThemeContext";
import Singlecompany from "../somadome/singleCompany";
import Dashboardview from "../somadome/Dashboard_view";
import Hubspot from "../somadome/Somahome";
import JobLists from "../somadome/JobLists";

const Markup = () => {
  const allroutes = [
    //own
    { url: "job-list", component: <Hubspot /> },
    { url: "", component: <Hubspot /> },
    { url: "dashboard", component: <JobLists /> },
    { url: "dashboard/:id", component: <Singlecompany /> },
    { url: "dashboard/table", component: <Dashboardview /> },
  ];

  return (
    <>
      <Routes>
        <Route path="page-lock-screen" element={<LockScreen />} />
        <Route path="page-error-400" element={<Error400 />} />
        <Route path="page-error-403" element={<Error403 />} />
        <Route path="page-error-404" element={<Error404 />} />
        <Route path="page-error-500" element={<Error500 />} />
        <Route path="page-error-503" element={<Error503 />} />
        <Route element={<MainLayout />}>
          {allroutes.map((data, i) => (
            <Route
              key={i}
              exact
              path={`${data.url}`}
              element={data.component}
            />
          ))}
        </Route>
      </Routes>
      <ScrollToTop />
    </>
  );
};

function MainLayout() {
  const { menuToggle, sidebariconHover } = useContext(ThemeContext);
  return (
    <>
      <div
        id="main-wrapper"
        className={`show ${sidebariconHover ? "iconhover-toggle" : ""} ${
          menuToggle ? "menu-toggle" : ""
        }`}
      >
        <Nav />
        <div
          className="content-body"
          style={{ minHeight: window.screen.height - 45 }}
        >
          <div className="container-fluid">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
      <Setting />
    </>
  );
}

export default Markup;
