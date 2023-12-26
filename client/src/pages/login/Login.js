import "./login.css";
import {  useContext,useRef } from "react";
import { loginCall } from "../../apiCalls.js";
import { AuthContext } from "../../context/AuthContext.js";
import CircularProgress from '@mui/material/CircularProgress';

function Login() {

    const email = useRef();
    const password = useRef();
    const { user ,isFetching, dispatch } = useContext(AuthContext);

    const handleClick = (e) => {
    e.preventDefault();
    loginCall(
        { email: email.current.value, password: password.current.value },
        dispatch
    );
    
    };
    console.log(user);
    return (  
        <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
            <h3 className="loginLogo">Media-social</h3>
            <span className="loginDesc">
                Connect with friends and the world around you on Media-social.
            </span>
            </div>
            <div className="loginRight">
            <form className="loginBox" onSubmit={handleClick}>
                <input placeholder="Email" type="email" className="loginInput"  required ref={email}/>
                <input placeholder="Password" type="password" className="loginInput" required minLength="6" ref={password}/>
                <button className="loginButton" type="submit" disabled={isFetching}>
                    {isFetching ? (
                    <CircularProgress size='25px'  color="inherit"/>
                    ) : (
                    "Log In"
                    )}
                </button>
                <span className="loginForgot">Forgot Password ?</span>
                <button className="loginRegisterButton">
                    {isFetching ? (
                    <CircularProgress size='25px' color="inherit"/>
                    ) : (
                    "Create New Account"
                    )}
                </button>
            </form>
            </div>
        </div>
    </div>
    );
}

export default Login;