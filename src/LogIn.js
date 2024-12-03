import React, { useState, useContext } from 'react';
import axios from 'axios';
import { IsLoggedContext } from './App';
import getSession from './LogInChecker';

function getXsrfToken() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'XSRF-TOKEN') {
            return value; // Return the token value
        }
    }
    return null; // Return null if not found
}

export default function SubmitForm() {
    const [CurrentData, setCurrentData] = useState();
    const [currentToken, setCurrentToken] = useState();
    const {
        isLoggedIn, 
        ChangeLogInState
    } = useContext(IsLoggedContext);
    function alertNameSurname(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const usernameInput = formData.get("username");
        const passwordInput = formData.get("password");
        console.log(document.cookie.substring(10,1000));
        axios({
            withCredentials: true, 
            method: 'post',
            url: 'http://localhost:8080/login', 
            headers:{
                "X-XSRF-TOKEN": getXsrfToken()
            },
            data: {
                username: usernameInput,
                password: passwordInput
            }
        })
        .then(function (response) {
            alert(response.statusText);
            ChangeLogInState(1);
        })
        .catch(function (error) {
            alert(error);
        });
    }
    if(getSession()) {
        ChangeLogInState(1);
        console.log(isLoggedIn + " LoginState");
        return (<div></div>);
    }
    return (
        <div>
            <form onSubmit={alertNameSurname}>
                <input name="username" placeholder='username' />
                <input name="password" placeholder='password' />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
    
}
