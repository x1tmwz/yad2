import React from 'react';

const fromBufferToImage = (file) => {
    if(typeof file === "string"){
        return file;
    }else{
        const src = `data:${file.type};base64,${file.image.toString('base64')}`
        return src
    }
}

const FileHandler = (props) => {
    const imageHandler = (e) => {
        const file = e.target.files[0];
        const regEx = /^image\/(png|jpeg)$/;
        if (!!file && file.type.match(regEx) && file.size <= 100000) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (props.setImage) {
                    props.setImage({ image: Buffer.from(reader.result), name: file.name, type: file.type })
                }
            }
            reader.readAsArrayBuffer(file);
        } else {
            if (props.setImage) {
                props.setImage("")
            }
        }
    }
    return (
        <div>
            <input onChange={imageHandler} type='file' accept="image/*" placeholder='Image' name='image' />
            <div>
                <img src={props.file ? fromBufferToImage(props.file) : ""} alt="" />
            </div>
        </div>

    );
}
export default FileHandler;