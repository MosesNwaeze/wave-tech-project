import React, {useState, useContext,useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import "./auth.css";
import {IoIosPulse} from "react-icons/io";
import {CiMail} from "react-icons/ci";
import {AiOutlineEyeInvisible} from "react-icons/ai";
import {NavLink} from "react-router-dom";
import axios from "axios";
import AppContext from "../../utils/app-context";
import {MdOutlineVisibility} from "react-icons/md";

function LoginComponent(props) {
    const [isShowPasswordOn, setIsShowPasswordOn] = useState(false);
    const [passwordType, setPasswordType] = useState("password");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const appContext = useContext(AppContext);
    const navigate = useNavigate();
    const [data,setAuth] = appContext;


    const setPasswordHidden = () => {
        setPasswordType("text");
        setIsShowPasswordOn(true)
    }

    const setPasswordShow = () =>{
        setPasswordType("password");
        setIsShowPasswordOn(false);
    }


    const handleLogin = async (event) =>{
        event.preventDefault();
        try{
          const response  = await axios({
                method: 'post',
                url: 'http://localhost:5000/api/v1/login',
                data: {
                    email: email,
                    password: password
                },
               headers:{
                    "Content-Type": "application/json"
               }
            });

            const token = response.data.data.token;
            const emai = response.data.data.email;
            setAuth({...data,email: emai,token,rememberMe})
            navigate("/");
        }catch(error){
            console.log(error.message)
            navigate("/login");
        }

    }

    useEffect(()=>{
        if(rememberMe){
          setAuth({...data,rememberMe: true});
        }
    },[rememberMe])

    useEffect(()=>{
        const {token, email} = data;
        if(token && email){
            navigate("/")
        }
    },[data])



    const visibilityElement = isShowPasswordOn?
        (<span className="text-end visible" onClick={setPasswordShow}><MdOutlineVisibility fontSize="20" /></span>):
        (    <span className="text-end visible" onClick={setPasswordHidden}><AiOutlineEyeInvisible fontSize="20"/></span>);

    return (
        <div className="text-center main-auth-container">

            <div className="d-none d-lg-block mt-3">

                <div className="d-flex align-items-center justify-content-center flex-column gap-2 py-5">

                    <div>
                <span>
                    <IoIosPulse className="fw-bolder fs-3 me-1" color="#EB5017"/>
                </span>
                        <span className={"fw-bolder fs-3"}>wave-tech </span>


                    </div>

                    <form className="w-50 bg-light text-center p-3 mb-5">
                        <h3>Login</h3>
                        <small>Enter your credential to access your account</small>

                        <div className="mt-4" >

                            <label htmlFor="email" className="form-label text-start w-100 fw-bold">Email Address</label>
                            <div className="bg-white p-2 text-start d-flex justify-content-between input">
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Email Address"
                                    className="border-0 m-0 w-100"
                                    defaultValue={email}
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
                                    defaultValue={password}
                                    onChange={(event)=>{setPassword(event.target.value)}}
                                    autoComplete="password"
                                />

                                {
                                    visibilityElement
                                }
                            </div>

                        </div>

                        <div className="mt-3 d-flex justify-content-between text-start">
                            <div>

                                <input
                                    type="checkbox"
                                    onChange={(event)=>setRememberMe(event.target.checked)}
                                />
                                <label className="form-label fw-bold checkbox-text">
                                    Remember me for 30 days
                                </label>
                            </div>
                            <div>
                                <NavLink to="/forget-password">
                                    Forget Password?
                                </NavLink>
                            </div>
                        </div>

                        <div className="mt-3">
                            <button type="submit" className="btn w-100" onClick={handleLogin}>Log into account</button>
                        </div>

                        <div className="my-3">
                            <h6>Are you new here? <NavLink to="/register" className="ms-2">Create account</NavLink></h6>
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

export default LoginComponent;