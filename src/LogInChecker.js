import axios from 'axios';

export default function getSession() {
    console.log('AAAA');
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        console.log(cookie);
        const [name, value] = cookie.trim().split('=');
        if (name === 'JSESSIONID') {
            console.log(name + "AAAAA");
            return value; // Return the token value
        }
    }
    return null; // Return null if not found
    
}