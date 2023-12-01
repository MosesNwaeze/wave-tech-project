import React,{useState,useEffect,useContext} from 'react';
import {useNavigate} from "react-router-dom";
import {Routes, Route, NavLink} from "react-router-dom";
import {BsHouse, BsClipboard2Check, BsCardText, BsClipboardPulse, BsGear} from "react-icons/bs"
import {GiHospitalCross} from "react-icons/gi"
import {IoIosPulse} from "react-icons/io"
import Dashboard from "./dashboard";
import Appointments from "./appointments";
import RequestDoctor from "./request-doctor";
import MedicalHistory from "./medical-history";
import Hospitals from "./hospitals";
import "./dashboard-styles.css";
import {TfiHelpAlt} from "react-icons/tfi";
import {LiaUserFriendsSolid} from "react-icons/lia";
import Settings from "../settings";
import HelpCenter from "../help-center";
import Refers from "../refers";
import AppContext from "../../utils/app-context";


function DashboardComponents(props) {
   const [pathname, setPathname] = useState(localStorage.getItem("tab"));

   const authContext = useContext(AppContext);
   const navigate = useNavigate();

   const userData = authContext[0];

    useEffect(()=>{

        const email = userData.email;
        const token = userData.token;

        if(email === "" && token === ""){
            navigate("/login")
        }


    },[pathname,userData.email,userData.token,navigate,])

    useEffect(()=>{
        navigate("/hospitals")
    },[])

    const activeTab = (path) => {
        localStorage.setItem("tab",path);
        setPathname(path);
    }

    return (
        <div className="container">
            <div className="d-none d-md-block mt-3">

                <div className="row row-cols-2">

                    <div className="col-3 ps-3 sidebar">
                        <div>
                            <div className="my-3">

                                <IoIosPulse className="fw-bolder fs-3 me-1" color="#EB5017"/>  <span className={"fw-bolder fs-3"}>wave-tech </span>

                            </div>
                            <ul className="list-unstyled p-0 ">
                                <li className="mt-3" >

                                    <NavLink to="/dashboard" className="text-decoration-none text-dark px-4 w-100 d-block py-2 item sb-m dashboard" onClick={() =>activeTab("/dashboard")}>
                                       <span><BsHouse fontSize="20"  className="me-2 pb-1"/> </span> <span className="">Dashboard</span>
                                    </NavLink>

                                </li>
                                <li className="mt-3">
                                    <NavLink to="/request-doctor" className="text-decoration-none text-dark px-4 w-100 d-block py-2 item sb-m request-doctor" onClick={() =>activeTab("/request-doctor")}>
                                        <span><BsClipboard2Check fontSize="20"  className="me-2 pb-1"/></span> <span>Consult a Doctor</span>
                                    </NavLink>
                                </li>

                                <li className="mt-3">
                                    <NavLink to="/appointment" className="text-decoration-none text-dark px-4 w-100 d-block py-2 item sb-m appointment" onClick={() =>activeTab("/appointment")}>
                                        <span><BsCardText fontSize="20"  className="me-2 pb-1"/></span> <span>Appointment</span>
                                    </NavLink>
                                </li>
                                <li className="mt-3">
                                    <NavLink to="/medical-history" className="text-decoration-none text-dark px-4 w-100 d-block py-2 item sb-m medical-history" onClick={() =>activeTab("/medical-history")}>
                                        <span><BsClipboardPulse fontSize="20"  className="me-2 pb-1"/> </span><span>Medical History</span>
                                    </NavLink>
                                </li>
                                <li className="mt-3">
                                    <NavLink to="/hospitals" className="text-decoration-none text-dark px-4 w-100 d-block py-2 item sb-m hospitals" onClick={() =>activeTab("/hospitals")}>
                                        <span><GiHospitalCross fontSize="20"  color="#EB5017" className="me-2 pb-1"/></span> <span>My Hospitals</span>
                                    </NavLink>
                                </li>
                            </ul>
                            <hr className="hr"/>

                        </div>



                       <div>

                           <ul className="list-unstyled p-0">
                               <li className="mb-1">
                                   <NavLink to="/settings" className="text-decoration-none text-dark px-4 w-100 d-block py-2 fs-6 interact item settings" onClick={() =>activeTab("/settings")}>
                                       <span className="mt-1"><BsGear fontSize="20"  className="me-2 pb-1"/> </span><span>Settings</span>
                                   </NavLink>
                               </li>
                               <li className="mb-1">
                                   <NavLink to="/help-center" className="text-decoration-none text-dark px-4 w-100 d-block py-2 fs-6 interact item help-center" onClick={() =>activeTab("/help-center")}>
                                       <span><TfiHelpAlt fontSize="20"  className="me-2 pb-1"/> </span><span>Help Center</span>
                                   </NavLink>
                               </li>
                               <li className="mb-1">
                                   <NavLink to="/refers" className="text-decoration-none text-dark px-4 w-100 d-block py-2 fs-6 interact item refers" onClick={() =>activeTab("/refers")}>
                                       <span><LiaUserFriendsSolid fontSize="20"  className="me-2 pb-1"/></span> <span>Refer Family and Friends</span>
                                   </NavLink>
                               </li>

                           </ul>
                       </div>

                    </div>

                    <div className="col-9 p-0 m-0">
                        <Routes>
                            <Route element={<Dashboard/>} path="dashboard" />
                            <Route element={<Appointments/>} path="appointment"/>
                            <Route element={<RequestDoctor/>} path="request-doctor"/>
                            <Route element={<MedicalHistory/>} path="medical-history"/>
                            <Route element={<Hospitals/>} path="hospitals"/>
                            <Route element={<Settings/>} path="settings" />
                            <Route element={<HelpCenter/>} path="help-centers" />
                            <Route element={<Refers/>} path="refers"  />
                        </Routes>
                    </div>
                </div>
            </div>

            <div className="d-md-none">

            </div>
        </div>
    );
}

export default DashboardComponents;