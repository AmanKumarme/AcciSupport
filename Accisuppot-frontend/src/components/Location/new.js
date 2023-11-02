import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageViewer = () => {
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

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Your Uploaded Images</h2>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Image ID</th>
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
                <td>{image.id}</td>
                <td>{image.date}</td>
                <td>{image.city}</td>
                <td>{image.latitude}</td>
                <td>{image.longitude}</td>
                <td>
                  <img
                    src={`data:image/jpeg;base64,${image.imageData}`}
                    alt={`Image ${index}`}
                    className="img-thumbnail"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ImageViewer;
