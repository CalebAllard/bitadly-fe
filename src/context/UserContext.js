import React, { createContext, useReducer } from 'react';
import UserReducer from './UserReducer';
// initial state
const initialState = {
    user: {
        
    }

}

// create context
export const UserContext = createContext(initialState);

// provider component
export const UserProvider = ({children}) => {
    const [state,dispatch] = useReducer(UserReducer, UserContext);


    //actions
    function addUser(user){
        dispatch({
            type:'ADD_USER',
            payload:user
        })
    }


    return (
        <UserContext.Provider value={{
            user:state.user,
            addUser,
        }}>
            {children}
        </UserContext.Provider>
    );

}