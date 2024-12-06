import SignInForm from './LogIn.js';
import { createContext, useContext, useState, useEffect } from 'react';
import RoutesList from './RoutesList.js';
import LogIn from './LogIn.js';
import axios from 'axios';
import getXsrfToken from './GetXSRFToken.js';
import { Link, Route, Routes }from 'react-router-dom';
import SignUp from './SignUp.js';
import GetMessages from './GetMessages.js';
import SendMessageBox from './SendMessage.js';

export const IsLoggedContext = createContext(null);


function App() {

  const [isLoggedIn, changeLogInState] = useState(false);  
  const [requiresReg, changeRegState] = useState(false);  
  useEffect(() => {
    // Отключаем скроллинг при загрузке компонента
    document.body.style.overflow = 'hidden';

    // Включаем скроллинг при размонтировании компонента
    return () => {
        document.body.style.overflow = 'auto';
    };
}, []);
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
    <div className="p-3 mb-2 bg-dark text-white d-flex justify-content-center align-items-center vh-100">
    <IsLoggedContext.Provider 
        value={{
          isLoggedIn, 
          changeLogInState
          }}
      >
        <RoutesList/> 
        <LogIn/>
      </IsLoggedContext.Provider>
  </div>
);
} else {
  return (
    <div className='p-3 mb-2 bg-dark text-white d-flex justify-content-start align-items-start vh-100 overflow-hidden' style={{}}>
        <SendMessageBox />
        <GetMessages/>
    </div>
  );
  }
    
  
}

export default App;
