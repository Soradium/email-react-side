import { Route, Routes } from 'react-router-dom';

const RoutesList = () => {
    return (
        <Routes>
          <Route path='/' element={<div/>}/>
          <Route path='/projects' element={<div>project placeholder</div>} />
          <Route path='/sertificates' element={<div>sertificates placeholder</div>} />
          <Route path='/contacts' element={<div>contacts placeholder</div>}/>        
      </Routes>  
    );
}
export default RoutesList;