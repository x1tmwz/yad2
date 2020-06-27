import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import language from '../language/hebrew.json'
import { connect } from 'react-redux';
import { startLogOut } from '../actions/auth';



const Header = (props) => {
    const history = useHistory();

    const logOutHandler = () => {
        props.startLogOut().then((err) => {
            if (!err) {
                history.push("");
            }
        })

    }

    return (
        <div className="orangeTopBorder">
            <header className="navbar navbar-light whiteBackground greyBottomBorder pb-0 pt-0"  >
                <div className="d-flex flex-row align-items-center">
                    <NavLink to='/' className="navbar-brand" exact={true}><img className="imageIcon" src="https://dev-assets.yad2.co.il/yad2site/y2assets/images/header/yad2Logo.png" /></NavLink>
                    <NavLink to='/realEstate/sale' activeClassName="activeLinkBold" className="navbar-brand">{language.header.realEstatePage}</NavLink>
                    <NavLink to='/newAd' activeClassName="activeLinkBold" className="navbar-brand">{language.header.newAdPage}</NavLink>
                    <NavLink to="/mySpace" activeClassName="activeLinkBold" className="navbar-brand">{language.header.personalSpace}</NavLink>
                </div>
                <div>
                    {props.isAuth && <button onClick={logOutHandler} className="navbar-toggler">{language.header.logout}</button>}
                </div>
            </header>
        </div>


    );
}
const mapStateToProps = (state) => ({
    isAuth: !!state.auth.user
})
const mapStateToDispatch = (dispatch) => ({
    startLogOut: () => dispatch(startLogOut())
})
export default connect(mapStateToProps, mapStateToDispatch)(Header);