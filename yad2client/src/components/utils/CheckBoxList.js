import React, { useEffect } from 'react';

const CheckBoxList = (props) => {

    const changeHandler = (e) => {
        const box = document.getElementById("checkBox");
        if (box) {
            const boxArray = Array.from(box.childNodes);
            const checkOptions = [];
            boxArray.forEach(label => {
                if (label.firstChild.checked) {
                    return checkOptions.push(label.firstChild.value)
                }
                return label;
            })
            if (props.getValue) {
                props.getValue(checkOptions);
            }
        }
    }
    const setValues =()=>{
        const box = document.getElementById("checkBox");
        if (box && props.values) {
            const boxArray = Array.from(box.childNodes);
            boxArray.forEach(label => {
                if (props.values.includes(label.lastChild.value)) {
                    label.lastChild.checked = true;
                }
            })
        }
    }
    useEffect(setValues,[props.values])
   
    return (
        <div onChange={changeHandler} id="checkBox" className="d-flex flex-column">
            {props.options.map((option, index) => {
                return (
                    <label key={index}>
                        <input type="checkbox" value={option} name={option} key={index}/>
                        {props.optionsNames[index]}
                    </label>
                )

            })}
        </div>
    );
}
export default CheckBoxList;