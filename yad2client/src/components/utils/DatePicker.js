import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/he';
import { SingleDatePicker } from 'react-dates';

const DatePicker = (props) => {
    const [date, setDate] = useState(props.date ? moment(new Date(props.date)) : null);
    const [calendarFocused, SetCalendarFocused] = useState(false);
    const [isCheck, setIsCheck] = useState(false);

    const onDateChange = (date) => {
        if (date) {
            setDate(date);
            if (props.getDate) {
                props.getDate(date);
            }
            setIsCheck(false);
        }

    }
    const onFocusChange = ({ focused }) => {
        SetCalendarFocused(focused);
    }
    const clickHandler = async (e) => {
        setIsCheck(!isCheck);

    }
    const clearDateHandler = (e) => {
        setDate(null)
        if (props.getDate) {
            props.getDate("");
        }
    }
    useEffect(() => {
        // isCheck && setDate(moment())
        // if (props.getDate) {
        //     props.getDate(moment());
        // }
        if (isCheck) {
            setDate(moment())
            if (props.getDate) {
                props.getDate(moment());
            }
        }
    }, [isCheck])


    return (
        <div className="d-flex flex-column ml-5">
            <label>{props.label}</label>
            <div className="flexResponsive">
                <SingleDatePicker
                    date={date}
                    onDateChange={onDateChange}
                    placeholder={props.placeHolder}
                    focused={calendarFocused}
                    onFocusChange={onFocusChange}
                    numberOfMonths={1}
                    displayFormat={"DD/MM/YYYY"}
                    required={props.required}
                    anchorDirection="right"
                    showDefaultInputIcon
                    isRTL
                />
                <div className="ml-4">
                    <input type="checkbox" onChange={clickHandler} checked={isCheck}  />
                    <label>{props.todayCheckBoxTitle}</label>
                </div>

                {props.clearDateButton && <button onClick={clearDateHandler} className="btn btn-success buttonSize-xl mr-2 ml-2" type="button">נקה תאריך</button>}
            </div>
        </div>
    );
}
export default DatePicker;