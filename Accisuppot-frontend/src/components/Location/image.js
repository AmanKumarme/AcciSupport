import React, { useState, useRef, useEffect} from 'react';
import userService from '../../service/UserServices/UserService';
import { Link } from "react-router-dom"
import axios from 'axios';
import Swal from 'sweetalert2';





const ImageCapture = () => {
  const [cameraStream, setCameraStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const canvasRef = useRef(null);
  const [nearestHospital, setNearestHospital] = useState(null); 
  const[hospitalId,setHospitalId]=useState("");

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream);
      setCapturedImage(null); // Clear any previously captured image
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
      setCapturedImage(null);
    }
  };

  const handleCapture = () => {
    const canvas = canvasRef.current;
    const video = document.querySelector('video');
  
    if (video && canvas) {
      const targetWidth = 200; // Adjust this value as needed
      const targetHeight = (video.videoHeight / video.videoWidth) * targetWidth;
  
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
      canvas.toBlob(blob => {
        setCapturedImage(blob); // Store the Blob directly
      }, 'image/jpeg'); // Convert to Blob with JPEG format
    }
    fetchNearestHospital(); 
    console.log(typeof(hospitalId));
  };

  const currentDate = new Date();
const ISTOptions = {
  timeZone: 'Asia/Kolkata',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
};

const formattedDate = currentDate.toLocaleString('en-IN', ISTOptions);

  

const fetchNearestHospital = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/nearest-hospital?latitude=${currentLocation.latitude}&longitude=${currentLocation.longitude}`);
    setNearestHospital(response.data);
    console.log(response);
    setHospitalId(response.data.id);

  } catch (error) {
    console.error("Error fetching nearest hospital:", error);
  }
};

  const handleUpload = async () => {

    if (capturedImage) {
      const canvas = canvasRef.current;
      const formData = new FormData();
      const userId= localStorage.getItem('Id');
     

      formData.append('image', capturedImage);
      formData.append('date', formattedDate);
      formData.append('latitude', currentLocation.latitude);
      formData.append('longitude', currentLocation.longitude);
      formData.append('city', currentLocation.city);
      formData.append('userId', userId);
      formData.append('hospitalId',hospitalId);
    

      


      try {
    
        await userService.uploadImage(formData);

        console.log('Image uploaded successfully');
        Swal.fire("update Successfully")
        
      
      } catch (error) {
        console.error('Error uploading image:', error.message);
      }
    }
  };

  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
    city: ''
  });


  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      const response = await axios.get("https://ipapi.co/json/");
      setCurrentLocation({
        latitude: response.data.latitude,
        longitude: response.data.longitude,
        city: response.data.city
      });
      
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const handleClearImage = () => {
    setCapturedImage(null);
  };
  const logout =()=>{
    window.localStorage.clear();

    window.location.href="/";
   }

  return (
    <div className="container">
      <nav className="">
      <br/> <br/> <br/>
            <div  style={{ width: "100%" }} className="p-3 mb-2 bg-success text-white " >
    

                <Link to="/user-dash"  className="btn btn btn-primary mb-2 text" >back</Link>

               

                <Link to="/" className="btn btn btn-primary  mb-2 btn-spacing  text " onClick={logout}>Logout</Link>

                <br></br>

            </div>
        </nav>


        {cameraStream ? (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
      <button style={{ backgroundColor: '#3498db', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer', fontSize: '16px', borderRadius: '5px' }} onClick={startCamera}>Start Camera</button>
      <button style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer', fontSize: '16px', borderRadius: '5px' }} onClick={stopCamera}>Stop Camera</button>
      <button style={{ backgroundColor: '#3498db', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer', fontSize: '16px', borderRadius: '5px', margin: '5px 0' }} onClick={handleCapture}>Capture Image</button>
    </div>
    <video autoPlay playsInline ref={video => video && (video.srcObject = cameraStream)} style={{ maxWidth: '30%', height: 'auto', border: '2px solid #3498db', borderRadius: '5px', margin: '10px 0' }} />
    <canvas ref={canvasRef} style={{ display: 'none' }} />
   
    
    {capturedImage && (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
 
  

  
  <button style={{ backgroundColor: '#3498db', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer', fontSize: '16px', borderRadius: '5px' }} onClick={handleClearImage}>Clear Image</button>
  <div style={{ width: '200px' }}></div> {/* This creates a space between the buttons */}
  <button style={{ backgroundColor: '#3498db', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer', fontSize: '16px', borderRadius: '5px' }} onClick={handleUpload}>Upload Image</button>
</div>


        <img src={URL.createObjectURL(capturedImage)} alt="Captured" style={{ maxWidth: '120%', height: 'auto', border: '2px solid #e74c3c', borderRadius: '5px', margin: '10px 0' }} />
        
      </div>
    )}
  </div>
) : (
  <button className="btn btn btn-warning"style={{  color: 'black', border: 'none', padding: '10px 20px', margin: '5px', cursor: 'pointer', fontSize: '16px', borderRadius: '5px' }} onClick={startCamera}>Start Camera</button>
)}


    </div>
  );
};

export default ImageCapture;
