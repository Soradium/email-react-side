import SignInForm from './LogIn.js';
import { createContext, useContext, useState } from 'react';
import RoutesList from './RoutesList.js';
import LogIn from './LogIn.js';
import axios from 'axios';
import getXsrfToken from './GetXSRFToken.js';
import { Link, Route, Routes }from 'react-router-dom';
import SignUp from './SignUp.js';
import GetMessages from './GetMessages.js';

export const IsLoggedContext = createContext(null);


function App() {

  const [isLoggedIn, changeLogInState] = useState(false);  
  const [requiresReg, changeRegState] = useState(false);  
  if(!isLoggedIn) { 
    axios({
      withCredentials: true, 
      method: 'get',
      url: 'http://localhost:8080/fetch', 
      headers: {
        "X-XSRF-TOKEN": "fetch"
      }
    }).then(function (response) {
      console.log(response.status);
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
  return (
    <div>
    <IsLoggedContext.Provider 
        value={{
          isLoggedIn, 
          changeLogInState
          }}
      >
        <Routes>
          <Route path='/signup' element={<SignUp />}/>   
        </Routes>  
        <LogIn/>
      </IsLoggedContext.Provider>
  </div>
);
} else {
    return (
      <div>
        <GetMessages/>
        <Link to="/send_message">Write a message!</Link>
        <RoutesList/> 
      </div>
      
    );
  }
    
  
}

export default App;
