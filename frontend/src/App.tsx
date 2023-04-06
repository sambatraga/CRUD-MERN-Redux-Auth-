import './App.css';
//import { getAllEmploye, getEmployeByID } from './state/actions/action-creator/employeActions';

import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Employe } from './components/Employe';
import { LoginUser } from './components/User/Login';
import { RequireAuth } from './components/User/RequireAuth';
import { UploadImg } from './components/UploadImage';



function App() {
 
  
  return (

        <BrowserRouter>
            <Routes>
                    <Route path='/' element={<LoginUser/>}></Route>
                    <Route path='/employe' element={<RequireAuth><Employe/></RequireAuth>}></Route>
                    <Route path='/uploadImage' element={<UploadImg/>}></Route>
            </Routes>
        </BrowserRouter>

  );
}

export default App;
