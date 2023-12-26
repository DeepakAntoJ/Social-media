import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer.js";

const INITIAL_STATE = {
    user: {
        
_id:"653d248aee2f23d2b74c0cec",
username :"arjun",
email : "arjun@gmail.com",
profilePicture : "1/cr7.jpeg",
coverPicture : "",
followers : [],
following : [],
isAdmin : false,
    },
    isFetching: false,
    error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    
    return (
        <AuthContext.Provider
        value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch,
        }}
        >
        {children}
        </AuthContext.Provider>
    );
};