
import './App.css';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import FooterComponent from './components/Header-Footer/FooterComponenet';
import HeaderComponent from './components/Header-Footer/HeaderComponent';
import ListUserComponent from './components/admin/ListUserComponent';
import AddUserComponent from './components/admin/AddUserComponent';
import ListHospitalComponent from './components/admin/ListHospitalComponent';
import AddHospitalComponent from './components/admin/AddHospitalComponent';

import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login/Login';
import RegisterUserComponent from './components/Login/Register';

import ImageCapture from './components/Location/image';
import ImageViewer from './components/Location/new';
import UserDash from './components/user/UserDash';
import HospitalDash from './components/hospital/HospitalDash';
import HospitalLogin from './components/Login/HospitalLogin';
import UserProfile from './components/user/UserProfile';
import UpUserComponent from './components/user/UpdateUser';
import HospitalProfileComponent from './components/hospital/HospitalProfile';
import UpdateHospitalComponent from './components/hospital/UpdateHospital';
import ForgotPassword from './components/Login/ForgotPassword';



function App() {
  return (
    <div style={{ width: "100%" }} className="">
      <BrowserRouter>
        <HeaderComponent/>
            
          <div className= "container" style={{ minHeight: "82vh"}}>
            <switch>

                <Routes>

                  <Route path = "/" element = { <Login/> }></Route>
                  <Route path = "/forgot-password" element = { <ForgotPassword/> }></Route>
                  <Route path = "/hospital-login" element = { <HospitalLogin/> }></Route>
                  <Route path = "/hospital-profile" element = { <HospitalProfileComponent/> }></Route>
                  <Route path = "/update-hospital/:id" element = { <UpdateHospitalComponent/> }></Route>
                  <Route path = "/user-dash" element = { <UserDash/> }></Route>
                  <Route path = "/user-profile" element = { <UserProfile/> }></Route> 
                  <Route path = "/image" element = { <ImageCapture/> }></Route>
                  <Route path = "/new" element = { <UserDash/> }></Route>
                  <Route path = "/hospital-dash" element = { <HospitalDash/> }></Route>
                  <Route path = "/update-user/:id" element = { <UpUserComponent/> }></Route>
                 
                  <Route path = "/user-register" element = { <RegisterUserComponent/> }></Route>
                      
                  <Route path = "/users" element = { <ListUserComponent/> }></Route>
                  <Route path = "/add-user" element = { <AddUserComponent/> }></Route>
                  <Route path = "/edit-user/:id" element = { <AddUserComponent/> }></Route>
                  <Route path = "/hospitals" element = { <ListHospitalComponent/> }></Route>
                  <Route path = "/add-hospital" element = { <AddHospitalComponent/> }></Route>
                  <Route path = "/edit-hospital/:id" element = { <AddHospitalComponent/> }></Route>

                </Routes>
            </switch>    
          </div>

        <FooterComponent/>
      </BrowserRouter>
    </div>
  );
}

export default App;
