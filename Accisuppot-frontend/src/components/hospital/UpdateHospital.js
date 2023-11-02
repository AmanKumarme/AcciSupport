import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import HospitalService from '../../service/HospitalService/HospitalService';
import '../admin/Button.css';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateHospitalComponent = () => {
  const [name, setName] = useState('');
  const [licenceNo, setLicenceNo] = useState('');
  const [emailId, setEmailId] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({
    name: '',
    licenceNo: '',
    emailId: '',
    mobileNo: '',
    city: '',
    pincode: '',
    latitude: '',
    longitude: '',
    password: '',
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const backUser = () => {
    navigate('/hospital-profile');
  };

  const saveOrUpdateHospital = (e) => {
    e.preventDefault();

    const hospital = {
      name,
      licenceNo,
      emailId,
      mobileNo,
      city,
      pincode,
      latitude,
      longitude,
      password,
    };

    const newErrors = validateInputs(hospital);

    if (Object.keys(newErrors).length === 0) {
      console.log(hospital);
      if (id) {
        HospitalService.updateHospital(id, hospital)
          .then((response) => {
            console.log(response.data);
  
            navigate('/hospital-profile');
            Swal.fire("Updated Successfuly")
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        HospitalService.createHospital(hospital)
          .then((response) => {
            console.log(response.data);

            
            navigate('/hospitals');
            Swal.fire("Added Successfuly")
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      setErrors(newErrors);
    }
  };

  useEffect(() => {
    if (id) {
      HospitalService.getHospitalById(id)
        .then((response) => {
          setName(response.data.name);
          setLicenceNo(response.data.licenceNo);
          setEmailId(response.data.emailId);
          setMobileNo(response.data.mobileNo);
          setCity(response.data.city);
          setPincode(response.data.pincode);
          setLatitude(response.data.latitude);
          setLongitude(response.data.longitude);
          setPassword(response.data.password);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const validateInputs = (hospital) => {
    const newErrors = {};

    if (!hospital.name) {
      newErrors.name = 'Hospital name is required';
    }

    if (!hospital.licenceNo) {
      newErrors.licenceNo = 'Licence number is required';
    }

    if (!hospital.emailId) {
      newErrors.emailId = 'Email Id is required';
    } else if (!/\S+@\S+\.\S+/.test(hospital.emailId)) {
      newErrors.emailId = 'Invalid email format';
    }

    if (!hospital.mobileNo) {
      newErrors.mobileNo = 'Mobile No is required';
    } else if (!/^\d{10}$/.test(hospital.mobileNo)) {
      newErrors.mobileNo = 'Invalid mobile number format';
    }

    if (!hospital.city) {
      newErrors.city = 'City is required';
    }

    if (!hospital.pincode) {
      newErrors.pincode = 'Pincode is required';
    }

    if (!hospital.latitude) {
      newErrors.latitude = 'Latitude is required';
    }

    if (!hospital.longitude) {
      newErrors.longitude = 'Longitude is required';
    }

    if (!hospital.password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  const pageTitle = () => {
    if (id) {
      return <h2 className="text-center">Update Hospital</h2>;
    } else {
      return <h2 className="text-center">Add Hospital</h2>;
    }
  };
  

  return (
    <div>
      <br />
      <br />
      <br />

      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3 border-dark p-3 mb-2 bg-transparent text-dark">
            {pageTitle()}
            <div className="card-body">
              <form className="p-3 mb-2 bg-warning text-dark">
                <div className="form-group mb-2">
                  <label className="form-label"> Hospital Name</label>
                  <input
                    type="text"
                    placeholder="Enter Hospital Name"
                    name="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && <div className="error">{errors.name}</div>}
                </div>
                <div className="form-group mb-2">
  <label className="form-label"> Licence No</label>
  <input
    type="text"
    placeholder="Enter Licence NO"
    name="licenceNo"
    className="form-control"
    value={licenceNo}
    onChange={(e) => setLicenceNo(e.target.value)}
  />
  {errors.licenceNo && <div className="error">{errors.licenceNo}</div>}
</div>

<div className="form-group mb-2">
  <label className="form-label"> Email Id</label>
  <input
    type="text"
    placeholder="Enter Email Id"
    name="emailId"
    className="form-control"
    value={emailId}
    onChange={(e) => setEmailId(e.target.value)}
  />
  {errors.emailId && <div className="error">{errors.emailId}</div>}
</div>

<div className="form-group mb-2">
  <label className="form-label"> Mobile No</label>
  <input
    type="text"
    placeholder="Enter Mobile NO"
    name="mobileNo"
    className="form-control"
    value={mobileNo}
    onChange={(e) => setMobileNo(e.target.value)}
  />
  {errors.mobileNo && <div className="error">{errors.mobileNo}</div>}
</div>

<div className="form-group mb-2">
  <label className="form-label"> City</label>
  <input
    type="text"
    placeholder="Enter City"
    name="city"
    className="form-control"
    value={city}
    onChange={(e) => setCity(e.target.value)}
  />
  {errors.city && <div className="error">{errors.city}</div>}
</div>

<div className="form-group mb-2">
  <label className="form-label"> Pincode</label>
  <input
    type="text"
    placeholder="Enter Pincode"
    name="pincode"
    className="form-control"
    value={pincode}
    onChange={(e) => setPincode(e.target.value)}
  />
  {errors.pincode && <div className="error">{errors.pincode}</div>}
</div>

<div className="form-group mb-2">
  <label className="form-label"> Latitude</label>
  <input
    type="text"
    placeholder="Enter Latitude"
    name="latitude"
    className="form-control"
    value={latitude}
    onChange={(e) => setLatitude(e.target.value)}
  />
  {errors.latitude && <div className="error">{errors.latitude}</div>}
</div>

<div className="form-group mb-2">
  <label className="form-label"> Longitude</label>
  <input
    type="text"
    placeholder="Enter Longitude"
    name="longitude"
    className="form-control"
    value={longitude}
    onChange={(e) => setLongitude(e.target.value)}
  />
  {errors.longitude && <div className="error">{errors.longitude}</div>}
</div>

<div className="form-group mb-2">
  <label className="form-label"> Password</label>
  <input
    type="password"
    placeholder="Enter Password"
    name="password"
    className="form-control"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  {errors.password && <div className="error">{errors.password}</div>}
</div>

                <div>
                  <button className="btn btn-success" onClick={saveOrUpdateHospital}>
                    Submit
                  </button>
                  <button className="btn btn-danger sub" onClick={backUser}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default UpdateHospitalComponent;
