import { loginFetch, logoutFetch } from '../fetch/auth';
const login = ({ user, token } = {}) => ({
    type: "LOG_IN",
    user,
    token
})
const startLoginIn = (user = "", password = "") => {
    return async (dispatch) => {
        try {
            const res = await loginFetch(user, password);
            const status =await res.status;
            if (status === 200){
                const userData = await res.json();
                dispatch(login(userData));
            }else{
                dispatch(login());
            }
            return status;
        } catch (e) {
            dispatch(login())
            return 500;
        }
    };
}
const logout = () => ({
    type:"LOG_OUT"

})
const startLogOut =()=>{
    return async (dispatch,getState) => {
        const auth = getState().auth
        try {
            const status = await (await logoutFetch(auth._id, auth.token)).status;
            if (status === 200){
                dispatch(logout());
            }
            return status
        } catch (e) {
            return 500;
        }
    };
}

export {startLoginIn,startLogOut}