import customFetch from './fetch';
const postNewAd = (data,token) => customFetch("/newAd", "POST", data,token);
const getAllAds = (params) => customFetch("/ads","GET",undefined,undefined,params);
const getAllMatchAds=(data,params)=>customFetch("/ads","POST",data,undefined,params)
const getMyAds = (token) => customFetch("/myAds","GET",undefined,token);
const editAd = (data,token,_id)=>customFetch(`/editAd/${_id}`,"PATCH",data,token);
const removeAd = (token,_id)=>customFetch(`/removeAd/${_id}`,"DELETE",undefined,token);



export { getAllAds, postNewAd, getMyAds,editAd,removeAd,getAllMatchAds}