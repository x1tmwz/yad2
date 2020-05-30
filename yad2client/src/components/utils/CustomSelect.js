import React from 'react';

const CustomSelect = (props) => {
    const setOptionHandler = (e) => {
        const value = e.target.value;
        if (!!props.getOption) {
            props.getOption(value);
        }
    }
    return (
        <div>
            <select onChange={setOptionHandler} name={props.name} defaultValue={props.defaultOption}>
                <option defaultValue={""} disabled>{props.defaultOption}</option>
                {props.all && <option value="">{props.all}</option>}
                {props.options.map((asset, index) => {
                    return <option key={asset} value={asset}>{props.optionsNames[index]}</option>
                })}
            </select>
        </div>
    );
}
export default CustomSelect;