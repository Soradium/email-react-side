import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { IsLoggedContext } from './App';
import { getSession } from './LogInChecker';
import getXsrfToken from './GetXSRFToken';
import { Link, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';


export default function SignInForm(e) {
    
    const [requiresReg, setRequiresReg] = useState(0);
    const {
        isLoggedIn, 
        changeLogInState
    } = useContext(IsLoggedContext);
    useEffect(() => {
        // Отключаем скроллинг при загрузке компонента
        document.body.style.overflow = 'hidden';

        // Включаем скроллинг при размонтировании компонента
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);
    function proceedNameSurname(e) {
        
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const usernameInput = formData.get("email");
        const passwordInput = formData.get("password");
        
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
            console.log("Successfully logged in")
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
    console.log(requiresReg);
    if(requiresReg === 0) {
    return (
            <div className="card d-flex justify-content-center align-items-center" style={{ width: '25rem' }}>

                <form onSubmit={proceedNameSurname}>
                    <div className="input-group mb-3" style={{ width: '20rem', margin: '1rem' }}>
                        <input name="email" className="form-control" placeholder='Your e-mail address' />
                        <span className="input-group-text" id="basic-addon2">@notamail.com</span>
                    </div>
                    <div className="input-group mb-3" style={{ width: '20rem', margin: '1rem'  }}>
                        <input className="form-control" name="password" placeholder='Your password' />
                    </div>
                    <button className="btn btn-outline-secondary" style={{ margin: '1rem' }} type="submit">Log-In</button>

                </form>
                <div style={{ margin: '1rem' }}>
                    Don't have an account?
                    <button className="btn btn-primary" style={{ marginLeft: '1rem' }} onClick={() => {
                        setRequiresReg(1);
                    }}>
                        <Link to="/signup" className="text-white">Sign-Up</Link>
                    </button>
                </div>
                
            </div>
            );
    }
    else {
        return (
            <Navigate to="/signup"/>
        );
    }
}

