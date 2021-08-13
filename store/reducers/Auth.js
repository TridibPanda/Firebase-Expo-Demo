import { LOCAL, SIGNUP, LOGIN, LOGOUT, UPDATE, GET } from '../actions/Auth';
const initialState = {
    uid: '',
    data: {},
    isloggedIn: false
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOCAL:
            return { ...state, uid: action.uid, isloggedIn: true };
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