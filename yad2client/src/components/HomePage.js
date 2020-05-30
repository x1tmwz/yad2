import React from "react";
import language from '../language/hebrew.json'




const HomePage = () => {

    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <h1>{language.homePage}</h1>
            <p>{language.info}</p>

        </div>
    );
}

export default HomePage;