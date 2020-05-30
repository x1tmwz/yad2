const defaultFilterState = {
    sortBy: 'date',
    picture: false,
    price: false
}
export default (state = defaultFilterState, action) => {
    switch (action.type) {
        case "SORT_BY":
            return {
                ...state,
                sortBy: action.sortBy
            }
        case "SORT_BY_PICTURE":
            return {
                ...state,
                picture: !state.picture
            }
        case "SORT_BY_PRICE_TAG":
            return {
                ...state,
                price: !state.price
            }
        default:
            return state;
    }
}
