import getXSRFToken from "./GetXSRFToken";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SendMessageBox(e) {
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
            console.log("Successfully sent message")
        })
        .catch(function (error) {
            alert(error);
        });
    }
    return (
        <div>
            <form onSubmit={sendMessage}>
                <input name="receiver" placeholder='E-mail address of receiver' />
                <input name="message" placeholder='Your message' />
                <button type="submit">Submit</button>
            </form>
        </div>
    );

}

function getUsername() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'USERNAME') {
            console.log("Username retrieved "+value);
            return value; // Return the token value
        }
    }
    console.log("Username not available");
    return null; // Return null if not found
}