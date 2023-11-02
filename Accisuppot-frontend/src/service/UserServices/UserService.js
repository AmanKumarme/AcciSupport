import axios from "axios";

const User_BASE_REST_API_URL="http://localhost:8080/api/v1/users/"
 
 class UserService{
    getAllUsers(){
        return axios.get(User_BASE_REST_API_URL)
    }
    createUSer(user){
        return axios.post(User_BASE_REST_API_URL,user)
    }
    getUserById(userId){
        return axios.get(User_BASE_REST_API_URL+""+userId)
    }
    updateUser  (userId, user)  {
        return axios.put(User_BASE_REST_API_URL +"" +userId, user);
    }
    deleteUser (userId)  {
        return axios.delete(User_BASE_REST_API_URL + '' +userId);

    }
    checkDuplicateEmail(email){
        return axios.post(User_BASE_REST_API_URL,email);
    }
    uploadImage(formData) {
        return axios.post( "http://localhost:8080/api/v1/upload", formData, {
          headers: {
            "Content-Type":  "multipart/form-data", 
          },
        });
      }

      AcciReport(longitude,latitude){
        return axios.get("http://localhost:8080/api/accidents/nearest-hospital",longitude,latitude)

      }

      getUserImages(){
        return axios.get("http://localhost:8080/api/v1/images")

      }


 }
 export default new  UserService;   