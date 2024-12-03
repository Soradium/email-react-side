import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SubmitForm() {
    const [CurrentData, setCurrentData] = useState();
    const [currentToken, setCurrentToken] = useState();

    // Fetch the CSRF token when the component mounts
    useEffect(() => {
        const getCsrfToken = async () => {
            try {
                const response = await axios.get("http://localhost:8080/refresh_csrf_token", {
                    withCredentials: true, // Send cookies
                });

                // Store the CSRF token in the state
                const token = response.data;
                setCurrentToken(token);
                // Set the CSRF token in axios default headers
                axios.defaults.headers.common['XSRF-TOKEN'] = token;
                console.log("CSRF Token set:", token);
            } catch (error) {
                console.error("Error fetching CSRF token:", error);
            }
        };

        getCsrfToken();
    }, []); // Empty dependency array ensures it runs only once when the component mounts

    function alertNameSurname(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const usernameInput = formData.get("username");
        const passwordInput = formData.get("password");

        // Get CSRF token from axios default headers
        const csrfToken = axios.defaults.headers.common['XSRF-TOKEN'];
        console.log(csrfToken);
        axios({
            withCredentials: true, // Make sure to send cookies
            method: 'post',
            url: 'http://localhost:8080/login',
            headers: {
                '_csrf': csrfToken,  // Explicitly include CSRF token in request headers
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
