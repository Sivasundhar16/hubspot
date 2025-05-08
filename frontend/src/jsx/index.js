import React, { useContext } from "react";

/// React router dom
import { Routes, Route, Outlet } from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
import ScrollToTop from "./pages/ScrollToTop";
/// Dashboard
import Home from "./components/Dashboard/Home";
// import DashboardDark from "./components/Dashboard/DashboardDark";
// import Jobs from "./components/Dashboard/Jobs";
// import Applications from "./components/Dashboard/Applications";
// import MyProfile from "./components/Dashboard/MyProfile";
// import Statistics from "./components/Dashboard/Statistics";
// import Companies from "./components/Dashboard/Companies";
// import Task from "./components/Dashboard/Task";

//Jobs
import JobLists from "./components/Jobs/JobLists";
// import JobView from "./components/Jobs/JobView";
// import JobApplication from "./components/Jobs/JobApplication";
// import ApplyJob from "./components/Jobs/ApplyJob";
// import NewJob from "./components/Jobs/NewJob";
// import UserProfile from "./components/Jobs/UserProfile";

//CMS
// import Content from "./components/Cms/Content";
// import Menu from "./components/Cms/Menu";
// import EmailTemplate from "./components/Cms/EmailTemplate";
// import Blog from "./components/Cms/Blog";
//CMS Linking Pages
// import ContentAdd from "./components/Cms/ContentAdd";
// import AddMail from "./components/Cms/AddMail";
// import AddBlog from "./components/Cms/AddBlog";
// import BlogCategory from "./components/Cms/BlogCategory";

/// App
// import AppProfile from "./components/AppsMenu/AppProfile/AppProfile";
// import Compose from "./components/AppsMenu/Email/Compose/Compose";
// import Inbox from "./components/AppsMenu/Email/Inbox/Inbox";
// import Read from "./components/AppsMenu/Email/Read/Read";
// import Calendar from "./components/AppsMenu/Calendar/Calendar";
// import PostDetails from "./components/AppsMenu/AppProfile/PostDetails";

/// Product List
// import ProductGrid from "./components/AppsMenu/Shop/ProductGrid/ProductGrid";
// import ProductList from "./components/AppsMenu/Shop/ProductList/ProductList";
// import ProductDetail from "./components/AppsMenu/Shop/ProductGrid/ProductDetail";
// import Checkout from "./components/AppsMenu/Shop/Checkout/Checkout";
// import Invoice from "./components/AppsMenu/Shop/Invoice/Invoice";
// import ProductOrder from "./components/AppsMenu/Shop/ProductOrder";
// import Customers from "./components/AppsMenu/Shop/Customers/Customers";

/// Charts
// import SparklineChart from "./components/charts/Sparkline";
// import ChartJs from "./components/charts/Chartjs";
//import Chartist from "./components/charts/chartist";
// import RechartJs from "./components/charts/rechart";
// import ApexChart from "./components/charts/apexcharts";

/// Bootstrap
// import UiAlert from "./components/bootstrap/Alert";
// import UiAccordion from "./components/bootstrap/Accordion";
// import UiBadge from "./components/bootstrap/Badge";
// import UiButton from "./components/bootstrap/Button";
// import UiModal from "./components/bootstrap/Modal";
// import UiButtonGroup from "./components/bootstrap/ButtonGroup";
// import UiListGroup from "./components/bootstrap/ListGroup";
// import UiCards from "./components/bootstrap/Cards";
// import UiCarousel from "./components/bootstrap/Carousel";
// import UiDropDown from "./components/bootstrap/DropDown";
// import UiPopOver from "./components/bootstrap/PopOver";
// import UiProgressBar from "./components/bootstrap/ProgressBar";
// import UiTab from "./components/bootstrap/Tab";
// import UiPagination from "./components/bootstrap/Pagination";
// import UiGrid from "./components/bootstrap/Grid";
// import UiTypography from "./components/bootstrap/Typography";

/// Plugins
// import Select2 from "./components/PluginsMenu/Select2/Select2";
//import Nestable from "./components/PluginsMenu/Nestable/Nestable";
//import MainNouiSlider from "./components/PluginsMenu/NouiSlider/MainNouiSlider";
// import MainSweetAlert from "./components/PluginsMenu/SweetAlert/SweetAlert";
// import Toastr from "./components/PluginsMenu/Toastr/Toastr";
// import JqvMap from "./components/PluginsMenu/JqvMap/JqvMap";
// import Lightgallery from "./components/PluginsMenu/Lightgallery/Lightgallery";

//Redux
// import Todo from "./pages/Todo";

/// Widget
// import Widget from "./pages/Widget";

/// Table
// import SortingTable from "./components/table/SortingTable/SortingTable";
// import FilteringTable from "./components/table/FilteringTable/FilteringTable";
// import DataTable from "./components/table/DataTable";
// import BootstrapTable from "./components/table/BootstrapTable";

/// Form
// import Element from "./components/Forms/Element/Element";
// import Wizard from "./components/Forms/Wizard/Wizard";
// import CkEditor from "./components/Forms/CkEditor/CkEditor";
// import Pickers from "./components/Forms/Pickers/Pickers";
// import FormValidation from "./components/Forms/FormValidation/FormValidation";

import LockScreen from "./pages/LockScreen";
import Error400 from "./pages/Error400";
import Error403 from "./pages/Error403";
import Error404 from "./pages/Error404";
import Error500 from "./pages/Error500";
import Error503 from "./pages/Error503";
import Setting from "./layouts/Setting";
import { ThemeContext } from "../context/ThemeContext";
import Singlecompany from "./components/Dashboard/singleCompany";

const Markup = () => {
  const allroutes = [
    //own
    { url: "job-list", component: <Home /> },
    { url: "", component: <Home /> },
    { url: "dashboard", component: <JobLists /> },
    { url: "dashboard/:id", component: <Singlecompany /> },
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
