import React from 'react';


const InputFromTo = (props) => {

    const fromChangeHandler = (e) => {
        const value = e.target.value;
        if (props.setFrom) {
            if (value === "") {
                return props.setFrom(0)
            }
            props.setFrom(value)
        }

    }
    const toChangeHandler = (e) => {
        const value = e.target.value;
        if (props.setTo) {
            if (value === "") {
                return props.setTo(0)
            }
            props.setTo(value)
        }
    }
    return (
        <div>

            <label>{props.fromLabel}</label>
            <input
                type="number"
                name={props.name}
                placeholder={props.fromPlaceHolder}
                min={0}
                onChange={fromChangeHandler}
                value={props.fromValue === 0 ? "" : props.fromValue}
            />
            <label>{props.toLabel}</label>
            <input
                type="number"
                name={props.name}
                placeholder={props.toPlaceHolder}
                min={props.fromValue}
                onChange={toChangeHandler}
                value={props.toValue === 0 ? "" : props.toValue}
            />

        </div>
    );
}
export default InputFromTo;