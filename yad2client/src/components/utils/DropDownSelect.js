import React, { useState } from 'react';


const DropDownSelect = (props) => {
    const [isOpen, setOpen] = useState(false);

    const dropDownHandler = () => {
        setOpen(!isOpen);
    }

    return (
        <div>
            <div className="d-flex flex-column">
                <label className="mr-5 ml-5">{props.label}</label>
                <div onClick={dropDownHandler} className="d-flex flex-row">
                    <input className={props.inputClassName} placeholder={props.defaultOption}  disabled/>
                    <button className={props.buttonClassName}>˅</button>
                </div>
            </div>
            <div>
                {isOpen && props.component}
            </div>
        </div>
    );
}
export default DropDownSelect;