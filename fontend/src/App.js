import React, {useState, useEffect} from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LoginComponent from "./pages/auths/login";
import SignupComponent from "./pages/auths/signup";
import ForgetPasswordComponent from "./pages/auths/forget-password";
import Dashboard from "./pages/dashboard/dashboard";
import Appointments from "./pages/dashboard/appointments";
import RequestDoctor from "./pages/dashboard/request-doctor";
import MedicalHistory from "./pages/dashboard/medical-history";
import Hospitals from "./pages/dashboard/hospitals";
import DashboardComponents from "./pages/dashboard/dashboard-elements";
import Settings from "./pages/settings";
import HelpCenter from "./pages/help-center";
import Refers from "./pages/refers";
import AppContext from "./utils/app-context";
import  "./styles/App.css";

function App() {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const [authenticateUser, setAuthenticateUser] = useState({token,email,rememberMe:false});

    useEffect(() => {
        if(authenticateUser.rememberMe){
            localStorage.setItem("token",authenticateUser.token);
            localStorage.setItem("email", authenticateUser.email);
        }
    }, [authenticateUser,setAuthenticateUser]);

  return (

     <AppContext.Provider value={[authenticateUser,setAuthenticateUser]}>



             <Router>
                 <Routes>
                     <Route element={<LoginComponent/>} path="login"/>
                     <Route element={<SignupComponent/>} path="register"/>
                     <Route element={<ForgetPasswordComponent/>} path="forget-password"/>
                     <Route element={<DashboardComponents/>} path="/*">
                         <Route element={<Dashboard/>} path="dashboard" />
                         <Route element={<Appointments/>} path="appointment"/>
                         <Route element={<RequestDoctor/>} path="request-doctor"/>
                         <Route element={<MedicalHistory/>} path="medical-history"/>
                         <Route element={<Hospitals/>} path="hospitals"/>
                         <Route element={<Settings/>} path="settings" />
                         <Route element={<HelpCenter/>} path="help-centers" />
                         <Route element={<Refers/>} path="refers"  />
                     </Route>

                 </Routes>
             </Router>


     </AppContext.Provider>
  );
}

export default App;
