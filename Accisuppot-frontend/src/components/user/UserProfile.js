import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const UserProfile = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate()


  const updateUser = (id) => {
    navigate(`/update-user/${id}`)
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const id = localStorage.getItem('Id');
        console.log(id);

        const response = await axios.get(`http://localhost:8080/api/v1/users/${id}`);
        setUser(response.data);
        console.log(response);
      } catch (error) {
        console.error('Error fetching user:', error);
        // Handle the error as needed
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    window.localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className="container">
      <br /> <br />
      <br />
      <nav className="">
        <div style={{ width: '100%' }} className="p-3 mb-2 bg-success text-white">
          
        <Link to="/image"  className="btn btn btn-warning mb-2 text" >Report Accident </Link>

        <Link  to="/user-dash"  className="btn btn btn-warning mb-2 btn-spacing  text">view Report</Link>

        <Link to="/" className="btn btn btn-primary  mb-2 btn-spacing  text " onClick={logout}>Logout</Link>

        <br></br>
        </div>
      </nav>
      <br></br>
      <table className="table table-bordered table-dark table-striped">
        <thead>
          <tr>
            <th>User Id</th>
            <th>Name</th>
            <th>Mobile No</th>
            <th>Email Id</th>
            <th>Role</th>
            <th>Update</th>
            
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user.id}</td>
            <td>{user.firstName + ' ' + user.lastName}</td>
            <td>{user.mobileNo}</td>
            <td>{user.emailId}</td>
            <td>{user.role}</td>
            <td>  <button className="btn btn-info" onClick={() => updateUser(user.id)} >Update</button></td>
           
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserProfile;
