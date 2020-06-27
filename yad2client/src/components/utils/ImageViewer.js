import React, { useState } from 'react';

const ImageViewer = (props) => {
    const [index, setIndex] = useState(0);
    const rightClickHandler = (e) => {
        e.stopPropagation();
        if (index < props.images.length - 1) {
            setIndex(index + 1);
        }

    }
    const leftClickHandler = (e) => {
        e.stopPropagation();
        if (index > 0) {
            setIndex(index - 1);
        }

    }

    return (
        <div className="imageContanierBlock">
                <img src={props.images.length> 0 ? props.images[index]:"https://yad2pic.s3-eu-west-1.amazonaws.com/defaultImage.jpg"} className="imageSize" alt="" />
            {/* {props.images.length > 1 && (
                <div className="d-flex justify-content-center">
                    <button onClick={rightClickHandler} type="button" className="p-0" style={{ whiteSpace: "normal", border: "none" }} >➡</button>
                    <button onClick={leftClickHandler} type="button" className="p-0" style={{ whiteSpace: "normal", border: "none" }} >⬅</button>
                </div>)} */}
        </div>
    );

}
export default ImageViewer;