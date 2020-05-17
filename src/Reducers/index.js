import * as types from '../Constants';

const initState =
{
    user:
    {
        name: null,
        id: null
    },
    rooms: [],
    activeGame:
    {
        room: null,
        conStatus: null
    }
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case types.SET_USERNAME:
            return { ...state, user: { ...state.user, name: action.value } }
        case types.SET_USERID:
            return { ...state, user: { ...state.user, id: action.value } }
        case types.SET_ROOMS:
            return { ...state, rooms: action.value }
        case types.ADD_ROOM:
            return { ...state, rooms: [...state.rooms, action.value] }
        case types.JOIN_ROOM:
            return { ...state, activeGame: {...state.activeGame, room: action.value} }
        default:
            return state
    }
}

export default rootReducer;