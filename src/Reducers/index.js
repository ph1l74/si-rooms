import * as types from '../Constants';

const rootReducer = (state = { userName: "" }, action) => {
    switch (action.type) {
        case types.SET_USERNAME: 
            return {...state, userName: action.value}
        default:
            return state
    }
} 

export default rootReducer;