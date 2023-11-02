import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';

const HospitalDash = () => {

  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const id = localStorage.getItem('id');
      const response = await fetch(`http://localhost:8080/api/v1/hospitals/Acci/${id}`);
      const data = await response.json();

      setImages(data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const logout = () => {
    window.localStorage.clear();
    window.location.href = "/";
  }

  const handleFlagClick = async (imageId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/${imageId}/flag`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(true),
      });

      const updatedImages = images.map(image => {
        if (image.id === imageId) {
          return {
            ...image,
            flag: true,
          };
        }
        return image;
      });

      setImages(updatedImages);
    } catch (error) {
      console.error('Error flagging image:', error);
    }
  };

  return (
    <div className="container">
       <nav className="">
        <div style={{ width: "100%" }} className="p-3 mb-2 bg-success text-white " >
          <Link to="/hospital-profile" className="btn btn btn-warning mb-2  text">View profile  </Link>
          <Link to="/" className="btn btn btn-primary  mb-2 btn-spacing  text " onClick={logout}>Logout</Link>
        </div>
      </nav>
      <div className="container mt-5">
        <h2 className="mb-4 text-center">Accident Request</h2>
        <div className="table-responsive">
          <table className="table table-bordered table-dark table-striped">
            <thead className="thead-dark">
              <tr>
                <th className="text-center">#</th>
                <th className="text-center">Date</th>
                <th className="text-center">City</th>
                <th className="text-center">Latitude</th>
                <th className="text-center">Longitude</th>
                <th className="text-center">Image</th>
                <th className="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {images.map((image) => (
                <tr key={image.id}>
                  <td className="text-center">{image.id}</td>
                  <td className="text-center">{image.date}</td>
                  <td className="text-center">{image.city}</td>
                  <td className="text-center">{image.latitude}</td>
                  <td className="text-center">{image.longitude}</td>
                  <td className="text-center">
                    <img
                      src={`data:image/jpeg;base64,${image.imageData}`}
                      className="img-thumbnail"
                      style={{ maxWidth: '100px' }}
                    />
                  </td>
                  <td>
                    <button
                      className='btn btn-success btn-center'
                      onClick={() => handleFlagClick(image.id)}
                      disabled={image.flag}
                    >
                      {image.flag ? "Accepted" : "Accept"}
                    </button>
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

export default HospitalDash;
