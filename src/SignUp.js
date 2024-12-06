import React, { useState, useContext } from 'react';
import axios from 'axios';
import { IsLoggedContext } from './App';
import { getSession } from './LogInChecker';
import getXsrfToken from './GetXSRFToken';
import { Link } from 'react-router-dom';

export default function SignUp(e) {

    const [CurrentData, setCurrentData] = useState();
    const [currentToken, setCurrentToken] = useState();
    const {
        isLoggedIn, 
        changeLogInState
    } = useContext(IsLoggedContext);
    
    function proceedNameSurname(e) {
        
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const usernameInput = formData.get("email");
        const passwordInput = formData.get("password");
        
        axios({
            withCredentials: true, 
            method: 'post',
            url: 'http://localhost:8080/signup', 
            headers:{
                "X-XSRF-TOKEN": getXsrfToken()
            },
            data: {
                username: usernameInput,
                password: passwordInput
            }
        })
        .then(function (response) {
            console.log("Successfully created new account")
            changeLogInState(1);
        })
        .catch(function (error) {
            alert(error);
        });
    }
    if(getSession()) {
        changeLogInState(1);
        console.log("LoginState="+isLoggedIn);
        return;
    }
    return (
        <div className="card d-flex justify-content-center align-items-center" style={{ width: '25rem' }}>
            <form  onSubmit={proceedNameSurname}>
            <div className="input-group mb-3" style={{ width: '20rem', margin: '1rem' }}>
                    <input name="email" className="form-control" placeholder='New e-mail address' />
                    <span className="input-group-text" id="basic-addon2">@notamail.com</span>
                </div>
                <div className="input-group mb-3" style={{ width: '20rem', margin: '1rem' }}>
                    <input name="password" className="form-control" placeholder='Your new password' />
                </div>
                <button className="btn btn-outline-secondary" style={{ margin: '1rem' }} type="submit">Create account</button>
            </form>
        </div>
    );
}

