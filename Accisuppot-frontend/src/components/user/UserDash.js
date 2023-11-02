
import { Link } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const UserDash = () => {

  const [images, setImages] = useState([]);
  

  useEffect(() => {
    fetchImages();
  }, []);

  

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/images');
      setImages(response.data);
      
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };
  
  const logout =()=>{
    window.localStorage.clear();

    window.location.href="/";
   }
 
  return (
    <div className="container">
        <br/> <br/> <br/>
        <nav className="">
            <div  style={{ width: "100%" }} className="p-3 mb-2 bg-success text-white " >
    

                <Link to="/image"  className="btn btn btn-warning mb-2 text" >Report Accident </Link>

                <Link  to="/user-profile"  className="btn btn btn-warning mb-2 btn-spacing  text">view Profile</Link>

                <Link to="/" className="btn btn btn-primary  mb-2 btn-spacing  text " onClick={logout}>Logout</Link>

                <br></br>

            </div>
        </nav>
        <div className="container mt-5">
      <h2 className="mb-4 text-center">Reported Accident</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-dark table-striped">
          <thead className="thead-dark">
            <tr>
              <th className="text-center">#</th>
              <th>Date</th>
              <th>City</th>
              <th>Latitude</th>
              <th>Longitude</th>  
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {images.map((image, index) => (
              <tr key={index}>
                <td className="text-center">{image.id}</td>
                <td>{image.date}</td>
                <td>{image.city}</td>
                <td>{image.latitude}</td>
                <td>{image.longitude}</td>
                <td>
                  <img
                    src={`data:image/jpeg;base64,${image.imageData}`}
                    alt={`Image ${index}`}
                    className="img-thumbnail"
                    style={{ maxWidth: '100px' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>


        
    </div>
  )
}

export default UserDash
