import React from 'react';

const Pagination = ({ adsPerPage, totalAds, paginate }) => {
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(totalAds / adsPerPage); i++) {
        pageNumber.push(i);
    }
    const clickHandler =(e)=>{
        paginate(e.target.value)

    }

    return (
        <nav className="d-flex flex-row-reverse">
            {pageNumber.map(number => (
                <button key={number} value={number} onClick={clickHandler}>{number}</button>
            ))}
        </nav>
    );
}
export default Pagination