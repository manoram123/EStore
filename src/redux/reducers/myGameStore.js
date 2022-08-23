import axios from "axios"

const myGameStoreReducer = (state = {}, action) => {
    switch (action.type){
        case "GET_DATA":
            const res = axios.get('/my-store').then((res)=>{
                state.games = res.data
                return state;
            })
        default:
            return state;
    }
}

export default myGameStoreReducer;