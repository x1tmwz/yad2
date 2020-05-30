
export default (state = {}, action) => {
    switch (action.type) {
        case "LOG_IN":
            return {
                user:action.user,
                token:action.token
            }
        case "LOG_OUT":
            return {};
        default:
            return state;

    }
}