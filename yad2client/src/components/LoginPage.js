import React, { useState, useEffect, useRef } from 'react';
import { connect } from "react-redux";
import { startLoginIn } from "../actions/auth";
import language from '../language/hebrew.json'
import CustomError from './utils/CustomError';
import errorHandler from '../utils/statusHandler';




const LoginPage = (props) => {
    const isInitialMount = useRef(true)
    const [error, setError] = useState("");
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const userHandler = (e) => {
        setUser(e.target.value);
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            (!!user && !!password) && setError("");
        }

    }, [user, password]
    )

    const submitHandler = (e) => {
        e.preventDefault();
        if (!user || !password) {
            return setError(language.loginPage.error.valuesMissing);
        }
        setLoading(true);
        props.startLoginIn(user, password).then((err) => {
            if (err !== 200) {
                return setError(language.loginPage.error.wrongUserValues);
            }
            if (props.match.params) {
                props.history.push("/" + props.match.params.to);

            }

        }).catch((e)=>{
            alert(errorHandler());
        })
    }
    return (
        <div className='container login-container'>

            <form onSubmit={submitHandler}>
                <div className="row justify-content-center">
                    <div className="col-md-6 login-form-1">
                        <div className="form-group mt-5">
                            <input
                                className="form-control"
                                type="text"
                                minLength="3"
                                maxLength="50"
                                name="user"
                                onChange={userHandler}
                                placeholder={language.loginPage.user}
                                style={{textAlign:'right'}}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="password"
                                minLength="6"
                                maxLength="50"
                                name="password"
                                onChange={passwordHandler}
                                placeholder={language.loginPage.password}
                                required
                            />
                        </div>
                        {(loading && !!!error) && <p>Loading...</p>}
                        <CustomError error={error}/>
                        <button>{language.loginPage.login}</button>
                    </div>
                </div>
            </form>
        </div>


    );
}
const mapDispatchToProps = (dispatch) => ({
    startLoginIn: (user, password) => dispatch(startLoginIn(user, password))

})


export default connect(undefined, mapDispatchToProps)(LoginPage);