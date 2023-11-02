import React, { useState, useEffect } from 'react'; 
import UserService from '../../service/UserServices/UserService';
import "../admin/Button.css"
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';



import {useNavigate, useParams } from 'react-router-dom';


const UpUserComponent = () => {
    const [firstName,setFirstName]=useState("")
    const [lastName,setLastName]=useState("")
    const [emailId,setEmailId]=useState("")
    const [mobileNo,setMobileNo]=useState("")
    const [role,setRole]=useState("")
    const [password,setPassword]=useState("")

    // Add validation states
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailIdError, setEmailIdError] = useState('');
    const [mobileNoError, setMobileNoError] = useState('');
    const [roleError, setRoleError] = useState('');
    const [passwordError,setPasswordError]=useState("")

   
    const navigate = useNavigate();
    const {id} = useParams();

    const backUser=(u)=>{
        navigate("/user-profile")
    }


    const saveOrUpdateUser =(u)=>{
        u.preventDefault();
        // Validation logic
    let isValid = true;

    if (!firstName) {
        setFirstNameError('First name is required');
        isValid = false;
    } else {
        setFirstNameError('');
    }

    if (!lastName) {
        setLastNameError('Last name is required');
        isValid = false;
    } else {
        setLastNameError('');
    }

    if (!emailId) {
        setEmailIdError('Email Id is required');
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(emailId)) {
        setEmailIdError('Invalid email format');
        isValid = false;
    } else {
        setEmailIdError('');
    }

    if (!mobileNo) {
        setMobileNoError('Mobile No is required');
        isValid = false;
    } else if (!/^\d{10}$/.test(mobileNo)) {
        setMobileNoError('Invalid mobile number format');
        isValid = false;
    } else {
        setMobileNoError('');
    }

    if (!role) {
        setRoleError('Role is required');
        isValid = false;
      } else if (role !== 'User') {
        setRoleError('Role must be "User"');
        isValid = false;
      } else {
        setRoleError('');
      }
      
    if(!password){
        setPasswordError("Password is Required")
    }else{
        setPasswordError("")
    }

    if (isValid) {
        const user = { firstName, lastName, emailId, mobileNo, role };

        //   code for saving/updating user 
    

       

        console.log(user)
        if(id){
            UserService.updateUser(id,user).then((Response)=>{
                console.log(Response.data)
                
                navigate("/user-profile")
                Swal.fire("update Successfully")
                

            } 
            ).catch(error =>{
                console.log(error)

            })
        }else{UserService.createUSer(user).then((Response)=>{
            console.log(Response.data)
            navigate("/users")
            Swal.fire("Added Successfully")
        }).catch(error =>{
            console.log(error)
        })}}}

        useEffect(() => {
            if(id){UserService.getUserById(id).then((response) =>{
                setFirstName(response.data.firstName)
                setLastName(response.data.lastName)
                setEmailId(response.data.emailId)
                setMobileNo(response.data.mobileNo)
                setRole(response.data.role)

            }).catch(error => {
                console.log(error)
            })

            }
            
        },[id])

        const pageTitle = () => {

            if(id){
                return <h2 className = "text-center">Update User</h2>
            }else{
                return <h2 className = "text-center">Add User</h2>
            }
    }

  return (
    <div><br/><br/><br/>
      <div className='container' >
        <br></br><br></br>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3 border-dark p-3 mb-2 bg-transparent text-dark' >   
            {pageTitle() }
                <div className='card-body'>
                    <form className='p-3 mb-2 bg-warning text-dark"'> 

                        <div className='form-group mb-2'>
                            <label className='form-lable'> First Name</label>
                            <input type ="text" 
                            placeholder='Enter First Name' 
                            name='firstName' 
                            className='form-control' 
                            value={firstName}
                            onChange={(u)=>setFirstName(u.target.value)}></input>
                            {firstNameError && <div className='error'>{firstNameError}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-lable'> Last Name</label>
                            <input type ="text" 
                            placeholder='Enter Last Name' 
                            name='lastName' 
                            className='form-control' 
                            value={lastName}
                            onChange={(u)=>setLastName(u.target.value)}></input>
                             {lastNameError && <div className='error'>{lastNameError}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-lable'> Email Id</label>
                            <input type ="text" 
                            placeholder='Enter Email Id' 
                            name='emailId' 
                            className='form-control' 
                            value={emailId}
                            onChange={(u)=>setEmailId(u.target.value)}></input>
                            {emailIdError && <div className='error'>{emailIdError}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-lable'> Mobile No</label>
                            <input type ="text" 
                            placeholder='Enter Mobile NO' 
                            name='mobileNo' 
                            className='form-control' 
                            value={mobileNo}
                            onChange={(u)=>setMobileNo(u.target.value)}></input>
                            {mobileNoError && <div className='error'>{mobileNoError}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-lable'> Role</label>
                            <input type ="text" 
                            placeholder='Enter Role' 
                            name='rolr' 
                            className='form-control' 
                            value={role}
                            onChange={(u)=>setRole(u.target.value)}></input>
                            {roleError && <div className='error'>{roleError}</div>}
                        </div>
                        <div className="form-group mb-2">
                            <label className="form-label"> Password</label>
                                 <input
                                     type="password"
                                    placeholder="Enter Password"
                                    name="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(u) => setPassword(u.target.value)}
                                />
                            {passwordError && <div className='error'>{passwordError}</div>}
                        </div>
                        <div>
                        <button className='btn btn-success' onClick={(u)=>saveOrUpdateUser(u)}>Submit</button>

                        <button className='btn btn-danger sub ' onClick={(u)=>backUser(u)}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default UpUserComponent
