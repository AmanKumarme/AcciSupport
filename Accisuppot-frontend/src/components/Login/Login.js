import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom"


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState(null); // State to store user data
  const [role, setRole] = useState('');
  const [id, setId]=useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      id:id,
      email: email,
      password: password,
      role: role,
      
    };

    try {
      const response = await fetch('http://localhost:8080/api/v1/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        const user = await response.json();
        setUser(user); // Store user data in state
        
        console.log(email);
        localStorage.setItem('email', email);
        localStorage.setItem('role', role);
        localStorage.setItem('Id', id);
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
     
      console.log("Selected Role:", role); // Add this line for debugging
      if (role === "User") {
        
         window.location.href = '/user-dash';
        
      } else if (role === "Admin") {
        window.location.href = '/hospitals';
      } else {
        // Handle other cases or display an error message
        console.log("Invalid Role:", role);
          window.location.href = '/hospitals';
      }
    }
  }, [user, role]);
  
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '5vh',
  };
  

  return (
    <div ><br/>
      <div className='container' >
      <br></br><br></br>
      <div className='row '  >
            <div className='card col-md-6 offset-md-3 offset-md-3 border-dark p-3 mb-2 bg-transparent text-dark' >   
      <h2  class="text-center">Login</h2>
      <div className='card-body'>
      <form onSubmit={handleSubmit} className='p-3 mb-2 bg-warning text-dark"'>
          <div className='form-group mb-2'>
                <label  fontWeight="bold" className='form-lable text-center'><h5>UserId:</h5></label>
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
        <label className='form-label text-center'>
          <h5>Role</h5>
        </label>
        <select
          name='role'
          className='form-select'
          value={role}
          required
          onChange={(e) => setRole(e.target.value)}
        >
          < option value=""  disabled selected>Select Role</option>
          < option value="User">User</option>
          < option value="Admin">Admin</option>
          
        </select>

                            
                        </div>
        <div className='form-group mb-2'>
          <label  fontWeight="bold" className='text-center'><h5>Password:</h5></label>
          <input type="password" placeholder='Enter Password' 
         
         className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="col-md-12 mt-5 text-center">
                    <h5 className="fs-5">
                      Not Registered Yet ??
                      <Link
                        to="/user-register"
                        className="text-decoration-none fs-5"
                      >
                        &nbsp; &nbsp;Register Here
                      </Link>
                    </h5>
                  </div>
                  <br></br>
        <div  style={containerStyle}>
        <button className='btn btn-success ' type="submit">Login</button>
        </div>
        <div className="col-md-12 mt-5 text-center">
        <h5 className="fs-5">
        <Link to="/forgot-password" className="text-decoration-none fs-5">
    Forgot Password
</Link>
        <Link
                        to="/hospital-login"
                        className="text-decoration-none fs-5"
                      >
                        &nbsp; &nbsp;                Hospital Login
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

export default Login;
