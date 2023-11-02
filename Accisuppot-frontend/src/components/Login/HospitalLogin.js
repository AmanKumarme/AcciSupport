import React, { useState, useEffect } from 'react';

import { Link } from "react-router-dom"
import Swal from 'sweetalert2';



function HospitalLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const[id,setId]=useState("")

 
  const [user, setUser] = useState({ email: '', role: '',hospitalId: "" });


  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
      id: id
    };

    try {
      const response = await fetch('http://localhost:8080/api/v1/login/hospital', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        const user = await response.json();
        setUser(user);
        localStorage.setItem('email', email);
       
        localStorage.setItem('id', id);
        
        window.location.href = '/hospital-dash';
        Swal.fire("login successfuly")


      } else {
        
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Wrong Credentials Entered or You Have Not Registered Yet.",
          background: "black",
        });
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  // Redirect after successful login
  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        // Redirect admin to admin dashboard
        window.location.href = '/hospitals';
      } else if (user.role === 'user') {
        // Redirect regular user to user dashboard
        window.location.href = '/user-dashboard';
      }
    }
  }, );
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '5vh',
  };
  
  

  return (
    <div ><br/><br/><br/>
      <div className='container' >
      <br></br><br></br>
      <div className='row '  >
            <div className='card col-md-6 offset-md-3 offset-md-3 border-dark p-3 mb-2 bg-transparent text-dark' >   
      <h2  class="text-center"> Hospital Login</h2>
      <div className='card-body'>
      <form onSubmit={handleSubmit} className='p-3 mb-2 bg-warning text-dark"'>
      <div className='form-group mb-2'>
              <label  fontWeight="bold" className='form-lable text-center'><h5>Hospital Id:</h5></label>
              <input type="number" 
              placeholder='Enter User Id' 
              min={1}
              required
            
              className='form-control' 
              value={id} onChange={(e) => setId(e.target.value)} />
        </div>
        <div className='form-group mb-2'>
          <label  fontWeight="bold" className='form-lable text-center'><h5>Email:</h5></label>
          <input type="email" 
          placeholder='Enter Email Id' 
         
          className='form-control' 
          value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        
        <div className='form-group mb-2'>
          <label  fontWeight="bold" className='text-center'><h5>Password:</h5></label>
          <input type="password" placeholder='Enter Password' 
         
         className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        
        <div  style={containerStyle}>
        <button className='btn btn-success 'type="submit">Login</button>
        </div>
        <div className="col-md-12 mt-5 text-center">
        <h5 className="fs-5">
        <Link
                        to="/"
                        className="text-decoration-none fs-5"
                      >
                        &nbsp; &nbsp;                User Login
                      </Link></h5></div>
      </form>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
      </div>
      </div>
      </div>
    </div>
  );
}

export default HospitalLogin;
