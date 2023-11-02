import axios from 'axios'; 

const User_BASE_REST_API_URL="http://localhost:8080/api/v1/hospitals/"
 
 class HospitalService{
    getAllHospital(){
        return axios.get(User_BASE_REST_API_URL)
    }
    createHospital(hospital){
        return axios.post(User_BASE_REST_API_URL,hospital)
    }
    getHospitalById(hospitalId){
        return axios.get(User_BASE_REST_API_URL+""+hospitalId)
    }
    updateHospital  (hospitalId, hospital)  {
        return axios.put(User_BASE_REST_API_URL + '' +hospitalId, hospital);
    }
    deleteHospital (hospitalId)  {
        return axios.delete(User_BASE_REST_API_URL + '' +hospitalId);
    }
 }
 export default new  HospitalService;   