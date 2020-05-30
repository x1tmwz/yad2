// const defaultAd = {
//     assetType: "",
//     location: "",
//     floor: 0,
//     floorsInBuilding: 0,
//     rooms: 0,
//     apartmentProperties: [],
//     description: "",
//     houseSize: 0,
//     gardenSize: 0,
//     price: 0,
//     date: "",
//     image1: "",
//     image2: "",
//     image3: "",
//     phoneNumber: "",
//     contact: ""
// }

export default (state = [], action) => {
    switch (action.type) {
        case "ADD_AD":
            return [...state, action.ad];
        case "REMOVE_AD":
            return state.filter((ad) => ad.id !== action.id);
        case "EDIT_AD":
            return state.map((ad) => {
                if (ad.id === action.id)
                    return {
                        ...ad,
                        ...action.updates
                    }
                else {
                    return ad;
                }
            })
        case 'SET_ADS':
            return action.ads
        default:
            return state;

    }
}