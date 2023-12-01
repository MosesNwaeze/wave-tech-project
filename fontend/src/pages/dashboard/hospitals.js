import React, {useState, useEffect,useRef} from 'react';
import {
    BsSearch,
    BsBell,
    BsClock,
    BsHouse,
    BsFilter,
} from "react-icons/bs";
import "./hospital-styles.css";
import {GiHospitalCross} from "react-icons/gi";
import {RxCaretSort} from "react-icons/rx";
import HospitalList from "./hospitalList";
import RecentlyVisited from "./recentlyVisited";
import Favourite from "./favourite";

function Hospitals(props) {
    const[isLoaded, setIsLoaded] = useState(true)
    const[tabLabel, setTabLabel] = useState("");
    const[hospitalList, setHospitalList] = useState([]);
    const allHospitalRef = useRef(null)
    const recentlyVisitedRef = useRef(null)
    const favouriteRef = useRef(null)
    const btnRef = useRef(null);
    const[activeTab] = useState(localStorage.getItem("activeTab")||"allHospital");


    const map = new Map();
    map.set("allHospital", "All Hospitals");
    map.set("favourite","Favourite");
    map.set("recentlyVisited", "Recently Visited");

    const componentMap = new Map();
    componentMap.set("All Hospitals", (<HospitalList hospitalList={hospitalList}/>));
    componentMap.set("Favourite", (<Favourite/>));
    componentMap.set("Recently Visited", (<RecentlyVisited/>));

    useEffect(()=>{
        if(isLoaded){

            document.querySelector(".allHospital").classList.add("active-x");
        }
    })

    useEffect(()=>{

        if(isLoaded){
            btnRef.current.classList.add("active-x")
            setTabLabel("All Hospitals")
        }else{
            btnRef.current.classList.remove("active-x");
        }

    },[isLoaded]);

    useEffect(()=>{

        switch (activeTab){
            case "recently-visited":{
                document.querySelector(`.${activeTab}`).classList.add("active-x");
                break;
            }
            case "all-hospitals":{
                document.querySelector(`.${activeTab}`).classList.add("active-x");
                break;
            }
            case "favourite":{
                document.querySelector(`.${activeTab}`).classList.add("active-x");
                break;
            }
            default: {
                document.querySelector(`.${activeTab}`).classList.remove("active-x");
                break;
            }
        }

        setHospitalList([]);
    },[activeTab]);
    const tab = (event)=>{
        event.preventDefault();


        // activeTabSetting(event.target.id)

        const id = event.target.id;
        setIsLoaded(false);
        switch (id){
            case "recentlyVisited":{
                const value = recentlyVisitedRef.current.id;
                setTabLabel(map.get(value));
                // activeTabSetting("recently-visited");
                break;
            }
            case "allHospital":{
                const value = allHospitalRef.current.id;
                setTabLabel(map.get(value));
                // activeTabSetting("all-hospitals");
                break;
            }
            case "favourite":{
                const  value = favouriteRef.current.id;
                setTabLabel(map.get(value));
                // activeTabSetting("favourite")
                break;
            }
            default:break;

        }



    }



    return (
        <div className="p-0">
            <div className="ms-3 d-flex justify-content-between mb-3">
                <div className="col-7 border  p-1 search rounded-2 ps-3 ms-2">
                    <BsSearch className="me-2" />
                    <input type="text" placeholder="Search here..." className="border border-0 outline"/>
                </div>
                <div className="col-2 d-flex gap-3 justify-content-end">
                    <div className="rounded-circle notice text-center">
                        <BsBell className=""/>
                    </div>
                    <div className="">
                        <img alt="img" src="https://placehold.co/30x30" className="rounded-circle"/>
                    </div>
                </div>
            </div>

            <div className="content-area">

                <div className="d-flex justify-content-between my-3 ps-3">
                    <div className="fw-bolder fs-4">
                        My Hospitals
                    </div>

                    <div className="">
                        <button type="button" className="find-hospital-btn"><BsSearch/> Find Hospitals near me</button>
                    </div>
                </div>

                <div className="mt-2 col-9 d-flex gap-2 ms-3 mb-4">
                    <div>
                        <button type="button" className="activity link allHospital" onClick={tab} ref={btnRef}>
                            <span className=""><GiHospitalCross fontSize="12"   className="me-2 icon text-secondary"/></span>
                            <span className="item me-2" ref={allHospitalRef} id="allHospital">All Hospitals</span>
                            <span className="badge bg-secondary">0</span>
                        </button>
                    </div>
                    <div>
                        <button type="button" className="activity recentlyVisited" onClick={tab}>
                            <span className=""><BsClock fontSize="12"   className="me-2 icon text-secondary"/></span>
                            <span className="item me-2" ref={recentlyVisitedRef} id="recentlyVisited"> Recently Visited</span>
                            <span className="badge bg-secondary">0</span>
                        </button>
                    </div>
                    <div>
                        <button type="button" className="activity favourite" onClick={tab}>
                            <span><BsHouse fontSize="12"   className="me-2 icon text-secondary"/></span>
                            <span className="item me-2" ref={favouriteRef} id="favourite"> Favourite</span>
                            <span className="badge bg-secondary">0</span>
                        </button>
                    </div>
                </div>
                <div className="content ms-3">
                    <div className="d-flex justify-content-between">
                        <div className="fw-bolder fs-6">{tabLabel}</div>
                        <div className="d-flex justify-content-evenly gap-5">
                            <div>
                                <span className="me-1"><BsSearch/>
                                </span><span className="d-inline">
                                <input type="text" className="user-event" placeholder="Search" /></span>
                            </div>
                            <div>
                                <span className="me-1"><BsFilter/></span><span className="user-event">Filter</span>
                            </div>
                            <div>
                                <span className="me-1">
                                    <RxCaretSort />
                                </span>
                                <span className="user-event">Sort</span>
                            </div>
                        </div>
                    </div>
                </div>
                {
                   componentMap.get(tabLabel)
                }

            </div>

        </div>
    );
}

export default Hospitals;