export default (state = {}, action) => {
    switch (action.type) {
        case "SET_ADVANCE_FILTERS":
            return {
                ...action.advanceFilters
            }
        default:
            return state;
    }
}

