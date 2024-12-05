import { useState, useEffect } from "react";
import getXSRFToken from "./GetXSRFToken";
import axios from "axios";

export default function GetMessages() {
  const [currentMessages, setCurrentMessages] = useState(null);

  useEffect(() => {
    // Perform the axios call when the component mounts
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
  }, []); // Empty dependency array ensures this only runs once when the component mounts

  if (currentMessages === null) {
    return (<div>Loading...</div>);
  }

  return (
    <div>
      <ul>
        {currentMessages.map((message, index) => (
          <li key={index}>
            <p><strong>Sender:</strong> {message.userSender}</p>
            <p><strong>Receiver:</strong> {message.userReceiver}</p>
            <p><strong>Content:</strong> {message.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
