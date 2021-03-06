import React, { useState } from 'react';


const DropDown = (props) => {
    const [isOpen, setOpen] = useState(false);

    const dropDownHandler = () => {
        setOpen(!isOpen);
    }

    return (
        <div>
            <div className="d-flex flex-column">
                <label className="mr-5 ml-5">{props.label}</label>
                <button onClick={dropDownHandler} type="button" className={props.buttonClassName} >{props.buttonPlaceHolder}</button>
            </div>
            <div>
                {isOpen && props.component}
            </div>
        </div>
    );
}
export default DropDown;