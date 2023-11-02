import React, { useState, useEffect } from 'react';

function HospitalList() {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    // Fetch hospitals from your API
    fetch('http://localhost:8080/api/') 
      .then(response => response.json())
      .then(data => setHospitals(data))
      .catch(error => console.error('Error fetching hospitals:', error));
  }, []);

  return (
    <div>
      <h1>Hospital List</h1>
      <ul>
        {hospitals.map(hospital => (
          <li key={hospital.id}>
            <strong>{hospital.name}</strong> - {hospital.city}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HospitalList;
