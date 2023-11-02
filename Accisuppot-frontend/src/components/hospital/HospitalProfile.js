import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "../admin/Button.css";
import HospitalService from "../../service/HospitalService/HospitalService";
import Swal from "sweetalert2";

const HospitalProfileComponent = () => {
    const [hospital, setHospital] = useState({});
    const navigate = useNavigate();
    const Hid = localStorage.getItem('id');

    useEffect(() => {
        HospitalService.getHospitalById(Hid)
            .then((response) => {
                const data = response.data;
                if (typeof data === "object" && !Array.isArray(data)) {
                    setHospital(data);
                    console.log(data);
                } else {
                    console.error("Response is not a single object:", data);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [Hid]);

    const updateHospital = (id) => {
        navigate(`/update-hospital/${id}`);
    };

    const deleteHospital = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                HospitalService.deleteHospital(id)
                    .then(() => {
                        // Reload the hospital data after deletion
                        HospitalService.getHospitalById(Hid)
                            .then((response) => {
                                const data = response.data;
                                if (typeof data === "object" && !Array.isArray(data)) {
                                    setHospital(data);
                                } else {
                                    console.error("Response is not a single object:", data);
                                }
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                );
            }
        });
    };

    const logout = () => {
        window.localStorage.clear();
        window.location.href = "/";
    };

    return (
        <div className="container">
            <br></br>
            <br></br>
            <nav className="">
                <div style={{ width: "100%" }} className="p-3 mb-2 bg-success text-white ">
                    
                    <Link to="/hospital-dash" className="btn btn-primary mb-2 btn-spacing text">Back</Link>
                    <Link to="/" className="btn btn btn-primary mb-2 btn-spacing text" onClick={logout}>Logout</Link>
                </div>
            </nav>
            <br></br>
            <table className="table table-bordered table-dark table-striped">
                <thead>
                    <tr>
                        <th>Hospital Id</th>
                        <th>Name</th>
                        <th>Licence No</th>
                        <th>Mobile No</th>
                        <th>Email Id</th>
                        <th>Address</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={hospital.id}>
                        <td>{hospital.id}</td>
                        <td>{hospital.name}</td>
                        <td>{hospital.licenceNo}</td>
                        <td>{hospital.mobileNo}</td>
                        <td>{hospital.emailId}</td>
                        <td>{hospital.city + " " + hospital.pincode}</td>
                        <td>{hospital.latitude}</td>
                        <td>{hospital.longitude}</td>
                        <td><button className="btn btn-info" onClick={() => updateHospital(hospital.id)}>Update</button></td>
                    </tr>
                </tbody>
            </table>
            <br></br> <br></br>
        </div>
    );
};

export default HospitalProfileComponent;
