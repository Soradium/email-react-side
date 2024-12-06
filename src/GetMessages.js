import { useState, useEffect } from "react";
import getXSRFToken from "./GetXSRFToken";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function GetMessages() {
  const [currentMessages, setCurrentMessages] = useState(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    axios({
      withCredentials: true,
      method: 'get',
      url: 'http://localhost:8080/get_all_received_messages',
      headers: {
        "X-XSRF-TOKEN": getXSRFToken()
      }
    })
    .then(function (response) {
      console.log(response.status);
      setCurrentMessages(response.data); // Directly set the response data
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []); // Empty dependency array ensures this only runs once when the component mounts

  if (currentMessages === null) {
    return (<div>Loading...</div>);
  }

  return (
    <>
    <div>
      <div 
        className="accordion overflow-y-auto" 
        id="accordionExample" 
        style={{ marginLeft: "1vw", width: "55vw", height: "60vh"}} // Height and overflow added
      >
        {currentMessages.map((message, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header" id={`heading-${index}`}>
              <button 
                className="accordion-button" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target={`#collapse-${index}`} 
                aria-expanded="false" 
                aria-controls={`collapse-${index}`}>
                <strong>From:</strong> {message.userSender}
              </button>
            </h2>
            <div 
              id={`collapse-${index}`} 
              className="accordion-collapse collapse" 
              aria-labelledby={`heading-${index}`}>
              <div className="accordion-body text-wrap">
                <strong>To: {message.userReceiver}</strong><br />
                {message.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
