import * as types from '../Constants';

const rootReducer = (state = { user: { name: null, id: null } }, action) => {
    switch (action.type) {
        case types.SET_USERNAME:
            return { ...state, user: { ...state.user, name: action.value } }
        case types.SET_USERID:
            return { ...state, user: { ...state.user, id: action.value } }
        default:
            return state
    }
}

export default rootReducer;