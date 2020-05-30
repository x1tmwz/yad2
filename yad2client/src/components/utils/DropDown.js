import React, { useState } from 'react';


const DropDown = (props) => {
    const [isOpen, setOpen] = useState(false);

    const dropDownHandler = () => {
        setOpen(!isOpen);
    }

    return (
        <div>
            <div className="mb-1">
                <label>{props.label}</label>
                <button onClick={dropDownHandler} type="button" className="btn btn-secondary mb-2 ml-2">{props.buttonPlaceHolder}</button>
            </div>
            <div>
                {isOpen && props.component}
            </div>
        </div>
    );
}
export default DropDown;