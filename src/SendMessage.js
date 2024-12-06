import getXSRFToken from "./GetXSRFToken";
import axios from "axios";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SendMessageBox(e) {
    const [alertMessage, setAlertMessage] = useState(null);
    const [alertType, setAlertType] = useState('success'); // Default to success
    useEffect(() => {
        // Отключаем скроллинг при загрузке компонента
        document.body.style.overflow = 'hidden';

        // Включаем скроллинг при размонтировании компонента
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);
    function sendMessage(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const receiver = formData.get("receiver");
        const message = formData.get("message");

        axios({
            withCredentials: true, 
            method: 'post',
            url: 'http://localhost:8080/send_message', 
            headers:{
                "X-XSRF-TOKEN": getXSRFToken()
            },
            data: {
                "id": 0,
                "userSender": { "username": getUsername() },
                "userReceiver": { "username": receiver },
                "content": message,
                "sentAt": 0
            }
        }).then(function (response) {
            setAlertMessage("Message sent successfully!");
            setAlertType("success"); // Success alert
            setTimeout(() => setAlertMessage(null), 5000); // Dismiss alert after 5 seconds
            console.log("Successfully sent message");
        })
        .catch(function (error) {
            setAlertMessage("Error sending message: " + error.message);
            setAlertType("danger"); // Error alert
            setTimeout(() => setAlertMessage(null), 5000); // Dismiss alert after 5 seconds
        });
    }

    return (
        <>
        <div className="card d-flex justify-content-center align-items-center" style={{ width: '25rem' }}>
            {alertMessage && (
                <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
                    {alertMessage}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}

            <form onSubmit={sendMessage}>
                <div className="input-group mb-3" style={{ width: '20rem', margin: '1rem' }}>
                    <input name="receiver" className="form-control" placeholder='E-mail of receiver' />
                    <span className="input-group-text" id="basic-addon2">@notamail.com</span>
                </div>
                <div className="input-group mb-3" style={{ width: '20rem', margin: '1rem' }}>
                    <input name="message" className="form-control" placeholder='Message to be sent' />
                </div>
                <button className="btn btn-outline-secondary" style={{ margin: '1rem' }} type="submit">Send</button>
            </form>
        </div>
        </>
    );
}

function getUsername() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'USERNAME') {
            console.log("Username retrieved "+value);
            return value; // Return the username value
        }
    }
    console.log("Username not available");
    return null; // Return null if not found
}
