import {postNewAd,getAllAds,getMyAds,editAd,removeAd,getAllMatchAds} from '../fetch/ads';


const startAddAd = (adData = {}) => {
    return  (dispatch, getState) => {
        const token = getState().auth.token;
        const {
            assetType = "",
            assetStatus="",
            city="",
            street="",
            floor = 0,
            floorsInBuilding = 0,
            rooms = 0,
            apartmentProperties = [],
            description = "",
            houseSize = 0,
            gardenSize = 0,
            price = 0,
            date = "",
            image1 = "",
            image2 = "",
            image3 = "",
            phoneNumber = "",
            contact = ""
        } = adData;
        const ad = {
            assetType,
            assetStatus,
            city,
            street,
            floor,
            floorsInBuilding,
            rooms,
            apartmentProperties,
            description,
            houseSize,
            gardenSize,
            price,
            date,
            image1,
            image2,
            image3,
            phoneNumber,
            contact
        };
        return postNewAd(ad,token).then((res)=>{
            return res.status
        }).catch((e)=>{
            return 500
        })
    };
}
const startRemoveAd = (_id) => {
    return (dispatch,getState) => {
        const token = getState().auth.token
        return removeAd(token,_id).then((res)=>{
            if(res.status=== 200){
                return
            }else{
                return res.status
            }
        })
        
    }
}

const startEditAd = (_id,updates) => {
    return async(dispatch,getState) => {
        const token = getState().auth.token
        try{
            const res = await editAd(updates,token,_id);
            return res.status
        }catch(e){
            return 500;
        }
    }
}

const setAds = (ads) => ({
    type: 'SET_ADS',
    ads

})
const startSetAllAds = (params) => {
    return async (dispatch) => {
        try{
            const res = await getAllAds(params);
            const ads = await res.json();
            if(res.status=== 200){
                dispatch(setAds(ads));
            }
            return res.status;
            
        }catch(e){
            return 500;
        }
    
    }
}
const startSetAllMatchAds = (filterOptions,params) => {
    return async (dispatch) => {
        try{
            const res = await getAllMatchAds(filterOptions,params);
            const ads = await res.json();
            if(res.status=== 200){
                dispatch(setAds(ads));
            }
            return res.status
        }catch(e){
            return 500;
        }
    
    }
}
const startSetMyAds = () => {
    return async (dispatch,getState) => {
        const token = getState().auth.token;
        try{
            const res = await getMyAds(token);
            if(res.status=== 200){
                const ads = await res.json();
                dispatch(setAds(ads));

            }
            return res.status;
        }catch(e){
            return 500;
        }
    
    }

}





export {
    startAddAd,
    startSetAllAds,
    startSetMyAds,
    startEditAd,
    startRemoveAd,
    startSetAllMatchAds
};