import customFetch from './fetch';
const loginFetch =(user,password)=> customFetch("/users/login","POST",{user,password});
const logoutFetch =(_id,token)=> customFetch("/users/logout","POST",{_id},token);

export {loginFetch,logoutFetch};