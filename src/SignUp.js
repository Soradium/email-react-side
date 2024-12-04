import React, { useState, useContext } from 'react';
import axios from 'axios';
import { IsLoggedContext } from './App';
import { getSession } from './LogInChecker';
import getXsrfToken from './GetXSRFToken';
import { Link } from 'react-router-dom';

export default function SignUp(e) {
    return (<div>BBBBB</div>);
    // const [CurrentData, setCurrentData] = useState();
    // const [currentToken, setCurrentToken] = useState();
    // const {
    //     isLoggedIn, 
    //     ChangeLogInState
    // } = useContext(IsLoggedContext);
    
    // function proceedNameSurname(e) {
        
    //     e.preventDefault();
    //     const form = e.target;
    //     const formData = new FormData(form);

    //     const usernameInput = formData.get("email");
    //     const passwordInput = formData.get("password");
        
    //     axios({
    //         withCredentials: true, 
    //         method: 'post',
    //         url: 'http://localhost:8080/signup', 
    //         headers:{
    //             "X-XSRF-TOKEN": getXsrfToken()
    //         },
    //         data: {
    //             username: usernameInput,
    //             password: passwordInput
    //         }
    //     })
    //     .then(function (response) {
    //         console.log("Successfully logged in")
    //         ChangeLogInState(1);
    //     })
    //     .catch(function (error) {
    //         alert(error);
    //     });
    // }
    // if(getSession()) {
    //     ChangeLogInState(1);
    //     console.log("LoginState="+isLoggedIn);
    //     return;
    // }
    // return (
    //     <div>
    //         <form onSubmit={proceedNameSurname}>
    //             <input name="email" placeholder='Your e-mail address' />
    //             <input name="password" placeholder='Your password' />
    //             <button type="submit">Create account</button>
    //         </form>
    //     </div>
    // );
}

