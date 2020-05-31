import React from 'react';

const CustomTitle = (props) => {
    
    return (
        <div className="adTitles">
            <h6>{props.title}</h6>
            <label>{props.label}</label>
        </div>
    );
}
export default CustomTitle;