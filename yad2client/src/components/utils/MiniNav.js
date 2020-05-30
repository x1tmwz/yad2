import React from 'react';
import { Link } from 'react-router-dom';

const MiniNav = (props) => {

    return (
        <div className="navbar navbar-light">
            <div>
                {props.links.map((link) => {
                    return <Link className="navbar-brand" to={link.path} key={link.name}>{link.name}</Link>
                })}
            </div>
            <div></div>
        </div>
    );

}
export default MiniNav