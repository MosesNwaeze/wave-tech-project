import React, {useEffect, useState} from 'react';
import {RxCaretSort} from "react-icons/rx";
import { IoStar } from "react-icons/io5";
import "./hospital-list.css";
import Pagination from "../../components/pagination/Pagination";
import {paginate} from "../../components/pagination/paginate";
import axios from "axios";

const itemsPerPage = 5;
function HospitalList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [requestedData, setRequestedData] = useState([]);

    useEffect( ()=>{
        axios.get("http://localhost:5000/api/v1/hospital")
            .then((response)=>{
                setRequestedData(response.data.data);
            })
            .catch((e)=>console.log(e))

    },[])



    useEffect(()=>{
        const dataSet = paginate(requestedData,itemsPerPage,currentPage);
        setData(dataSet);

    },[currentPage,requestedData]);




    return (
        <div className="ps-3">
         <table className="mt-4 w-100 px-2 mb-5 bg-white">
             <thead>
               <tr className="header-row">
                   <th className="py-2 ps-2">
                       <span className="fw-normal">Name</span>
                       <span className="float-end me-3"><RxCaretSort/></span>
                   </th>
                   <th className="py-2 ">
                       <span className="fw-normal">Address</span>
                       <span className="float-end me-3"><RxCaretSort/></span>
                   </th>
                   <th className="py-2">
                       <span className="fw-normal">Phone no</span>
                       <span className="float-end me-3"><RxCaretSort/></span>
                   </th>
                   <th className="py-2">
                       <span className="fw-normal">Ratings</span>
                       <span className="float-end me-3"><RxCaretSort className="fw-bold"/></span>
                   </th>
               </tr>
             </thead>
             <tbody className="w-100 bg-white">
             {
                 data.map((item,index) => (

                     <tr className="p-2" key={index}>
                         <td className="py-3 ps-2">
                             {item?.name.substring(0,20)}
                         </td>
                         <td className="py-3">
                             {item?.address.trim()}
                         </td>
                         <td className="py-3">
                             {item['phone_no']}
                         </td>
                         <td className="py-3 d-flex">
                             {
                                 Array(item['rating']).fill(0).map((rating,idx)=>(
                                     <span key={idx}><IoStar color="#ffd700" /></span>
                                 ))
                             }
                         </td>
                     </tr>

                 ))
             }

             </tbody>
         </table>
            <Pagination  dataset={requestedData} setCurrentPage={setCurrentPage} pageItem={itemsPerPage}/>
        </div>
    );
}

export default HospitalList;