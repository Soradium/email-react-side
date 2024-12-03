import SubmitForm from './LogIn.js';
import { createContext, useContext, useState } from 'react';
import RoutesList from './RoutesList.js';
import LogIn from './LogIn.js';
import getSession from './LogInChecker.js';


export const IsLoggedContext = createContext(null);

function App() {
  const [isLoggedIn, ChangeLogInState] = useState(false);  
  getSession();
  if(!isLoggedIn) { 
  return (
    <div>
    <IsLoggedContext.Provider 
        value={{
          isLoggedIn, 
          ChangeLogInState
          }}
      >
        <LogIn/>
      </IsLoggedContext.Provider>
  </div>
);
} else {
    return (
      <div>
        AAAAAAAS
        <RoutesList/> 
      </div>
      
    );
  }
    
  
}

export default App;
