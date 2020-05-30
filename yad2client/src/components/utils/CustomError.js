import React from 'react';

const CustomError = (props) => {
    return (
        <div>
            {!!props.error && <p className="bg-danger">{props.error}</p>}
        </div>
    );
}
export default CustomError;