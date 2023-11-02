import { useEffect, useState } from "react"
import UserService from "../../service/UserServices/UserService"
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import "../admin/Button.css"
import Swal from "sweetalert2"

const ListUserComponent = () => {
    const [users, setUsers]=useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        UserService.getAllUsers().then((Response)=>{
            setUsers(Response.data)
           
        }).catch(error =>{
            console.log(error);
        })
    })
    const updateUser = (id) => {
        navigate(`/edit-user/${id}`)
    }
    const deleteUser =(id) =>{
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
                UserService.deleteUser(id).then((response) =>{
                    UserService.getAllUsers();
             
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
        <br/> <br/> 
        
        <br/>
        <nav className="">



        <div  style={{ width: "100%" }} className="p-3 mb-2 bg-success text-white " >
            

        <Link to="/add-user"  className="btn btn btn-warning mb-2 text" >Add New User</Link>
       
        <Link to="/hospitals" className="btn btn btn-warning mb-2 btn-spacing  text">List Hospital</Link>
        <Link to="/" className="btn btn btn-primary  mb-2 btn-spacing  text "  onClick={logout}>Logout</Link>
        <br></br>
        
        </div>
        </nav>
        <br></br>
        <table className="table table-bordered table-dark table-striped">

            <thead>
             <tr>
                <th>User Id</th>
                <th>Name </th>
                <th>Mobile No</th>
                <th>Email Id </th>
                <th>Role</th>
                <th>Update</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>{
                users.map(
                    user =>
                    <tr key ={user.id}>
                        <td>{user.id}</td>
                        <td>{user.firstName+" "+ user.lastName}</td>
                        <td>{user.mobileNo}</td>
                        <td>{user.emailId}</td>
                        <td>{user.role}</td>
                        <td>  <button className="btn btn-info" onClick={() => updateUser(user.id)} >Update</button></td>
                        <td>  <button className="btn btn-danger" onClick={() => deleteUser(user.id)} >Delete</button></td>
                    </tr>)
                
                }
            </tbody>


        </table>
      
    </div>
  )
}

export default ListUserComponent
