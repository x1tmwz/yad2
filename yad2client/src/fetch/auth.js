import customFetch from './fetch';
const loginFetch =(user,password)=> customFetch("http://localhost:3001/users/login","POST",{user,password});
const logoutFetch =(_id,token)=> customFetch("http://localhost:3001/users/logout","POST",{_id},token);

export {loginFetch,logoutFetch};