import { createContext,useReducer } from "react";
import AppReducer from './AppReducer';

const initialState={
    currentUser:null,
    userDetails:null,
    userRole:""
}

export const globalContext = createContext(initialState)

export const GlobalProvider = ({children}) => {
    const [state,dispatch] = useReducer(AppReducer,initialState)

    const saveUserOnLogin = (user) => {
        dispatch({
            type:"SAVE_USER_LOGIN",
            payload:user
        })
    }

    const saveUserDetails = (user) => {
        dispatch({
            type:"SAVE_USER_LOGIN",
            payload:user
        })
    }

    return (
    <globalContext.Provider value={{ currentUser:state.currentUser,saveUserOnLogin,saveUserDetails }}>
        {children}
    </globalContext.Provider>
    )
}

