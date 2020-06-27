import React from 'react';

const CustomField = (props) => {
    
    return (
        <div className="form-group">
            <label className={props.labelClassName} >{props.label}</label>
            {props.component}
        </div>
    );
}
export default CustomField;