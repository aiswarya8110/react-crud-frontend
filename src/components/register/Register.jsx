import React, { useContext } from 'react';
import { BASE_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
import UserForm from "../user-form/UserForm";
import UserContext from "../../context/UserContext";
import MovieContext from "../../context/MovieContext";
const Register = ()=>{
    const { updateLoggedIn } = useContext(UserContext);
    const { refreshMovies } = useContext(MovieContext);
    const navigate = useNavigate();
    const submitRegisterDetails = async(data)=>{
       try{
            const response = await fetch(BASE_URL+'/auth/register', 
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })

            const { errorMsg, successMsg } = await response.json();

            if(successMsg){
                updateLoggedIn();
                navigate('/');
                refreshMovies();
            }
            else console.log(errorMsg);

        }catch(err){
            console.log(err);
        }
    }

    return <UserForm onSubmitHandler={submitRegisterDetails} isRegister/>
}

export default Register;