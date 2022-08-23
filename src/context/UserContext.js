import { useState, createContext, useEffect } from 'react';
import { parseJwt } from '../utils/parseJWT';

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const parseToken = parseJwt(token);
        // console.log(parseToken)
        setUser(parseToken)
    }, [])

    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    )
}