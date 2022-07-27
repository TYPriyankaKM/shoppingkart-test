import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import CustomRoutes from "./routes/CustomRoutes";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer/Footer";
import PersistentLogin from "./components/PersistentLogin/PersistentLogin";
import { useSelector } from "react-redux";

import CustomRoutes2 from "./routes/CustomRoutes2";

const App = () => {
  AOS.init({ once: true });
  let currentUser = useSelector(state => state.user.currentUser);

  return (
    <div>
      <Router>
        <ToastContainer />
        <PersistentLogin>
          <Navbar />

          {Object.keys(currentUser).length == 0 ? (
            <CustomRoutes2 />
          ) : (
            <CustomRoutes />
          )}
        </PersistentLogin>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
