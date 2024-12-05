export default function getXSRFToken() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'XSRF-TOKEN') {
            console.log("XSRF retrieved");
            return value; // Return the token value
        }
    }
    console.log("XSRF not available");
    return null; // Return null if not found
}