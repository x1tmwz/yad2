import React, { useEffect } from 'react';

const CheckBoxList = (props) => {

    const changeHandler = (e) => {
        const box = document.getElementById("checkBox");
        if (box) {
            const boxArray = Array.from(box.childNodes);
            const checkOptions = [];
            for (let i = 0; i < boxArray.length; i++) {
                const rowArray = Array.from(boxArray[i].childNodes);
                rowArray.forEach(label => {
                    if (label.firstChild.checked) {
                        return checkOptions.push(label.firstChild.value)
                    }
                    return label;
                })
            }
            if (props.getValue) {
                props.getValue(checkOptions);
            }
        }
    }
    const setValues = () => {
        const box = document.getElementById("checkBox");
        if (box && props.values) {
            const boxArray = Array.from(box.childNodes);
            for (let i = 0; i < boxArray.length; i++) {
                const rowArray = Array.from(boxArray[i].childNodes);
                rowArray.forEach(label => {
                    if (props.values.includes(label.lastChild.value)) {
                        label.lastChild.checked = true;
                    }
                })
            }
        }
    }
    useEffect(setValues, [props.values])
    const createMatrixFromOptions = (itemInRow = 5) => {
        const matrix = [];
        for (let i = 0; i < props.options.length; i++) {
            const row = [];
            for (let j = 0; j < itemInRow; j++) {
                const option = props.options[i]
                row.push(
                    <label key={i} className={"mr-5"}>
                        <input type="checkbox" value={option} name={option} key={i} className={"mr-1"}/>
                        {props.optionsNames[i]}
                    </label>
                )
                i++;
            }
            matrix.push(row);
        }
        return matrix;
    }



    return (
        <div onChange={changeHandler} id="checkBox" className="d-flex flex-column">

            {createMatrixFromOptions().map((row, index) => {
                return (
                    <div className="flexResponsive" key={index}>
                        {row}
                    </div>
                );


            })}

        </div>
    );
}
export default CheckBoxList;