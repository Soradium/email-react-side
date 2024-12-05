import { Route, Routes } from 'react-router-dom';
import SendMessageBox from './SendMessage';

const RoutesList = () => {
    return (
        <Routes>
          <Route path='/send_message' element={<SendMessageBox />}/>
          <Route path='/projects' element={<div>project placeholder</div>} />

      </Routes>  
    );
}
export default RoutesList;