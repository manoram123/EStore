import { parseJwt } from '../../utils/parseJWT';

const loggedReducer = (state = {logged: false}, action) => {
    switch (action.type){
        case "SIGN_IN":
            return state;
        case "GET_LOGGED_DATA":
            const token = localStorage.getItem('token')
            if(token){
                const user = parseJwt(token)
                state.logged = true;
                state.user = user
                return state;
            }
        default:
            return state;
    }
}

export default loggedReducer;