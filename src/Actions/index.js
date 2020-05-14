import * as types from '../Constants';

export const setUserName = (value) => {
    return {
        type: types.SET_USERNAME,
        value
    }
}


export const setUserId = (value) => {
    return {
        type: types.SET_USERID,
        value
    }
}
