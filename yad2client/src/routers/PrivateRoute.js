import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


export const PrivateRoute = ({
    isAuth,
    component: Component,
    ...rest
}) => (<Route {...rest} component={(props) => {
    return (
        isAuth ? (
                <Component {...props} />
        ) : (
                <Redirect to={`/login${rest.path}`} />
            )

    )
}} />);

const mapStateToProps = (state) => ({
    isAuth: !!state.auth.user
})
export default connect(mapStateToProps)(PrivateRoute);