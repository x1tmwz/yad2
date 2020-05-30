import React from 'react';

const CustomField = (props) => {
    
    return (
        <div className="form-group">
            <label className="ml-1">{props.label}</label>
            {props.component}
            
        </div>
    );
}
export default CustomField;