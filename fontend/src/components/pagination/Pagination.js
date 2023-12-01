import React, {useEffect, useRef, useState,} from 'react';
import "./pagination.css"

function Pagination({dataset,pageItem, setCurrentPage} ) {
    const totalPages = dataset.length;
    let currentPage = 1;

    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [pageNo, setPageNo] = useState(currentPage);



    const next = () =>{
        if(totalPages >= pageNo * pageItem){
          currentPage += 1;
          setPageNo((prevState)=> prevState+1);
        }else{
          return false;
        }
    }

    const previous = () => {
        if(pageNo >= 1){
            currentPage -= 1;
            setPageNo((prevState)=>prevState - 1);
        }else{
            return false;
        }
    }

    useEffect(() => {

        if(pageNo > 1){
            prevRef.current.classList.remove("disabled");
        }else{
            prevRef.current.classList.add("disabled");
        }

        if(totalPages >= pageNo * pageItem){
            nextRef.current.classList.remove("disabled")
        }else{
            nextRef.current.classList.add("disabled");
        }

        setCurrentPage(pageNo);

    }, [pageNo,pageItem,totalPages,setCurrentPage]);


    return (
        <div>
            <nav aria-label="Hospital pagination">
                <ul className="pagination justify-content-center">
                    <li className="page-item" ref={prevRef}>
                        <button className="page-link" role="link"  tabIndex="-1" onClick={previous}>Previous</button>
                    </li>
                    <li className="page-item"><button className="page-link" role="link">{pageNo}</button></li>
                    <li className="page-item" ref={nextRef}>
                        <button className="page-link" role="link" onClick={next}>Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Pagination;