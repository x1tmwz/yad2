import React from 'react';
import { Link, useHistory } from 'react-router-dom';
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

        <header className="navbar navbar-light" style={{ background: 'linear-gradient(0deg, rgba(239,250,255,1) 0%, rgba(255,71,71,1) 100%)' }} >
            <div>
                <Link to='/' className="navbar-brand">{language.homePage}</Link>
                <Link to='/realEstate/sale' className="navbar-brand">{language.header.realEstatePage}</Link>
                <Link to='/newAd' className="navbar-brand">{language.header.newAdPage}</Link>
                <Link to="/mySpace" className="navbar-brand">{language.header.personalSpace}</Link>
            </div>
            <div>
                {props.isAuth && <button onClick={logOutHandler} className="navbar-toggler">{language.header.logout}</button>}
            </div>

        </header>
    );
}
const mapStateToProps = (state) => ({
    isAuth: !!state.auth.user
})
const mapStateToDispatch = (dispatch) => ({
    startLogOut: () => dispatch(startLogOut())
})
export default connect(mapStateToProps, mapStateToDispatch)(Header);