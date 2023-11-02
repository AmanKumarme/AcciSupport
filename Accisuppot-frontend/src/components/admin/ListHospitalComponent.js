import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import "../admin/Button.css"
import HospitalService from "../../service/HospitalService/HospitalService"
import Swal from "sweetalert2"

const ListHospitalComponent = () => {
    const [hospitals, setHospitals]=useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        HospitalService.getAllHospital().then((Response)=>{
            setHospitals(Response.data)
            console.log(Response.data);
        }).catch(error =>{
            console.log(error);
        })
    })
    const updateHospital = (id) => {
        navigate(`/edit-hospital/${id}`)
    }
    const deleteHospital =(id) =>{
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
            HospitalService.deleteHospital(id).then((response) =>{
                HospitalService.getAllHospital();
         
                }).catch(error =>{
                    console.log(error);
                });
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                }


          })
        console.log(id);

      
        
    }
    const logout =()=>{
        window.localStorage.clear();

        window.location.href="/";
       }
  return (
    <div className="container">

        <br></br>
        <br></br>
        <nav className="">

        <div  style={{ width: "100%" }} className="p-3 mb-2 bg-success text-white " >


        <Link to="/add-hospital" className="btn btn btn-warning mb-2  text">Add New Hospital</Link>

        <Link to="/users"  className="btn btn btn-warning mb-2 btn-spacing  text" >List User</Link>
        
        <Link to="/"   className="btn btn btn-primary  mb-2 btn-spacing  text " onClick={logout}>Logout</Link>
        
        
        
        </div>
        </nav>
        <br></br>
        <table className="table table-bordered table-dark table-striped">

            <thead>
             <tr>
                <th>Hospital Id</th>
                <th>Name </th>
                <th>Licence No </th>
                <th>Mobile No</th>
                <th>Email Id </th>
                <th>Address</th>
                <th>Latitude </th>
                <th>Longitude </th>
                <th>Update</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>{
                hospitals.map(
                    hospital =>
                    <tr key ={hospital.id}>
                        <td>{hospital.id}</td>
                        <td>{hospital.name}</td>
                        <td>{hospital.licenceNo}</td>
                        <td>{hospital.mobileNo}</td>
                        <td>{hospital.emailId}</td>
                        <td>{hospital.city+" "+hospital.pincode}</td>
                        <td>{hospital.latitude}</td>
                        <td>{hospital.longitude}</td>
                        
                       
                        <td>  <button className="btn btn-info" onClick={() => updateHospital(hospital.id)} >Update</button></td>
                        <td>  <button className="btn btn-danger" onClick={() => deleteHospital(hospital.id)} >Delete</button></td>
                    </tr>)
                
                }
            </tbody>


        </table>
        <br></br> <br></br>
    </div>
   
  )
}

export default ListHospitalComponent
