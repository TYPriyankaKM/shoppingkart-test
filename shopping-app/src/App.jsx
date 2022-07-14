import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import CustomRoutes from "./routes/CustomRoutes";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";
import SubNavbar from "./components/subnavbar/SubNavbar";
import Footer from "./components/footer/Footer";
import PersistentLogin from "./components/PersistentLogin/PersistentLogin";
import Welcome from "./components/welcomepage/Welcome";
import Signup from "./pages/auth/users/Signup";
import CustomRoutes2 from "./routes/CustomRoutes2";
import { useSelector } from "react-redux";


const App = () => {
    
  

  AOS.init({ once: true });

  return (
    <div>
      <Router>
        <ToastContainer />
        <CustomRoutes2 />
        <PersistentLogin>
          <Navbar />
          <CustomRoutes />
        </PersistentLogin>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
