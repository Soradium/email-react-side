import { Route, Routes } from 'react-router-dom';
import SendMessageBox from './SendMessage';
import SignUp from './SignUp';


const RoutesList = () => {
    return (
      <Routes>
          <Route path='/signup' element={<SignUp />}/>
      </Routes>  
    );
}
export default RoutesList;