import axios from 'axios';
import getXsrfToken from './GetXSRFToken';
export default function proceedNameSurname(e, changeLogInState) {

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
        console.log("Successfully logged in")
        changeLogInState(1);
    })
    .catch(function (error) {
        alert(error);
    });
}