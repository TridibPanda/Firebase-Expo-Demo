import { SIGNUP, LOGIN, LOGOUT, UPDATE, GET } from '../actions/Auth';
const initialState = {
    uid: '',
    data: {},
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP:
            return { ...state, uid: action.uid };
        case LOGIN:
            return { ...state, uid: action.uid };
        case LOGOUT:
            return { ...state, uid: action.uid };
        case UPDATE:
            return { ...state, data: action.details };
        case GET:
            return { ...state, data: action.details };
        default:
            return state;
    }
};

export default AuthReducer;