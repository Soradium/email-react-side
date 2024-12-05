import { useState } from "react";
import getXSRFToken from "./GetXSRFToken";
import axios from "axios";

export default function GetMessages(e) {
    const [currentMessages, setCurrentMessages] = useState(null);
    axios({
        withCredentials: true, 
        method: 'get',
        url: 'http://localhost:8080/get_all_received_messages', 
        headers: {
          "X-XSRF-TOKEN": getXSRFToken()
        }
      }).then(function (response) {
        console.log(response.status);
        setCurrentMessages(JSON.stringify(response.data));
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
      if(currentMessages === null) {
        return (<div>Loading</div>);
      }
      return(
        <div>
            {currentMessages}
        </div>
    );
}