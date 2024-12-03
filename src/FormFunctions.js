import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

    function alertNameSurname(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const usernameInput = formData.get("username");
        const passwordInput = formData.get("password");
        console.log(document.cookie.substring(10,1000));
        // Get CSRF token from axios default headers
        axios({
            withCredentials: true, // Make sure to send cookies
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
        })
        .catch(function (error) {
            alert(error);
        });
    }

    return (
        <div>
            <form onSubmit={alertNameSurname}>
                <input name="username" placeholder='username' />
                <input name="password" placeholder='password' />
                <button type="submit">Submit</button>
            </form>
            Current people available for fetching:
            {CurrentData}
        </div>
    );
}
