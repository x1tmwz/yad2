import React from 'react';
import { NavLink } from 'react-router-dom';

const MiniNav = (props) => {
    

    return (
        <div className="navbar navbar-light mb-5 shadowBoxContainer-s pl-5">
            <div>
                {props.links.map((link) => {
                    return <NavLink className="navbar-brand" to={link.path} key={link.name} activeClassName="activeLink"><span>{link.name}</span></NavLink>
                })}
            </div>
            <div></div>
        </div>
    );

}
export default MiniNav