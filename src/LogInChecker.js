import axios from 'axios';

export function getSession() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        console.log(cookie);
        const [name, value] = cookie.trim().split('=');
        if (name === 'JSESSIONID') {
            console.log("Current JSESSIONID = "+value);
            return value; // Return the token value
        }
    }
    console.log("No JSESSIONID yet");
    return null; // Return null if not found
    
}