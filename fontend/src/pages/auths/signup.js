import React, {useContext, useState} from 'react';
import AppContext from "../../utils/app-context";
import {NavLink, useNavigate} from "react-router-dom";
import axios from "axios";
import {IoIosPulse} from "react-icons/io";
import {CiMail} from "react-icons/ci";
import {AiOutlineEyeInvisible} from "react-icons/ai";
import {MdOutlineVisibility} from "react-icons/md";

function SignupComponent(props) {
    const [isShowPasswordOn, setIsShowPasswordOn] = useState(false);
    const [isShowPasswordOnConfirm, setIsShowPasswordOnConfirm] = useState(false);
    const [passTypeConfirm, setPasswordTypeConfirm] = useState("password")
    const [email, setEmail] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [passwordType, setPasswordType] = useState("password");
    const [password, setPassword] = useState("");
    const [userData,userAction] = useContext(AppContext);
    const navigate = useNavigate();


    const setPasswordHidden = () => {
        setPasswordType("text");
        setIsShowPasswordOn(true)
    }

    const setPasswordShow = () =>{
        setPasswordType("password");
        setIsShowPasswordOn(false);
    }


    const setPasswordConfirmHidden = () => {
        setPasswordTypeConfirm("text");
        setIsShowPasswordOnConfirm(true)
    }

    const setPasswordConfirmShow = () =>{
        setPasswordTypeConfirm("password");
        setIsShowPasswordOnConfirm(false);
    }


    const visibilityElement = isShowPasswordOn?
        (<span className="text-end visible" onClick={setPasswordShow}><MdOutlineVisibility fontSize="20" /></span>):
        (    <span className="text-end visible" onClick={setPasswordHidden}><AiOutlineEyeInvisible fontSize="20"/></span>);

    const visibilityConfirmElement = isShowPasswordOnConfirm?
        (<span className="text-end visible" onClick={setPasswordConfirmShow}><MdOutlineVisibility fontSize="20" /></span>):
        (    <span className="text-end visible" onClick={setPasswordConfirmHidden}><AiOutlineEyeInvisible fontSize="20"/></span>);


    const handleSignup = async (event) =>{
        event.preventDefault();
        if(password === confirmPassword){
            try{
                const response = await axios
                    .post("http://localhost:5000/api/v1/register", {email,password});
                userAction((prev)=>({...prev,email:response.data.data?.email,token: response.data.data?.token}));
                navigate("/");
            }catch(error){
                console.log(error)
                navigate("/register");
            }
        }else{
            return false;
        }


    }


    return (
        <div className="main-auth-container text-center">

            <div className="d-none d-md-block mt-3">

                <div className="d-flex align-items-center justify-content-center flex-column gap-2 py-5">

                    <div>
                <span>
                    <IoIosPulse className="fw-bolder fs-3 me-1" color="#EB5017"/>
                </span>
                        <span className={"fw-bolder fs-3"}>wave-tech </span>

                    </div>

                    <form className="w-50 bg-light text-center px-3 py-2 mb-4">
                        <h3>Create an account</h3>
                        <small>Enter your details to create account</small>

                        <div className="mt-4" >

                            <label htmlFor="email" className="form-label text-start w-100 fw-bold">Email Address</label>
                            <div className="bg-white p-2 text-start d-flex justify-content-between input">
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Email Address"
                                    className="border-0 m-0 w-100"
                                    value={email}
                                    onChange={(event)=>{setEmail(event.target.value)}}
                                    autoComplete="email"
                                />
                                <span className="text-end"><CiMail fontSize="20"/></span>
                            </div>

                        </div>
                        <div className="mt-3" >

                            <label htmlFor="password" className="form-label text-start w-100 fw-bold">Password</label>
                            <div className="bg-white p-2 text-start d-flex justify-content-between input">
                                <input
                                    type={passwordType}
                                    id="password"
                                    placeholder="Password"
                                    className="border-0 m-0 w-100"
                                    value={password}
                                    onChange={(event)=>{setPassword(event.target.value)}}
                                    autoComplete="password"
                                />
                                {
                                    visibilityElement
                                }
                            </div>

                        </div>

                        <div className="mt-3" >

                            <label htmlFor="password" className="form-label text-start w-100 fw-bold">Confirmed Password</label>
                            <div className="bg-white p-2 text-start d-flex justify-content-between input">
                                <input
                                    type={passTypeConfirm}
                                    id="confirmPassword"
                                    placeholder="Confirm password"
                                    className="border-0 m-0 w-100"
                                    value={confirmPassword}
                                    onChange={(event)=>{setConfirmPassword(event.target.value)}}
                                    autoComplete="password"
                                />
                                {visibilityConfirmElement}
                            </div>

                        </div>

                        <div className="mt-3">
                            <button type="submit" className="btn w-100" onClick={handleSignup}>Create an account</button>
                        </div>

                        <div className="my-3">
                            <h6>Login instead? <NavLink to="/login" className="ms-2">Login</NavLink></h6>
                        </div>
                    </form>

                    <div className="mt-5">
                <span>
                    <IoIosPulse className="fw-bolder fs-3 me-1" color="#EB5017"/>
                </span>
                        Powered by<span className={"fw-bolder fs-6"}> wavyhealth</span>


                    </div>

                </div>
            </div>

            <div className="d-md-none">

            </div>
        </div>
    );
}

export default SignupComponent;