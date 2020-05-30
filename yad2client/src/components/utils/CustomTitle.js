import React from 'react';

const CustomTitle = (props) => {
    
    return (
        <div className="d-flex flex-column align-items-center justify-content-center mr-3">
            <h6>{props.title}</h6>
            <label>{props.label}</label>
        </div>
    );
}
export default CustomTitle;