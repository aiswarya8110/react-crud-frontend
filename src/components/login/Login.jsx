import React, { useContext } from 'react';
import UserContext from '../../context/UserContext';
import { BASE_URL } from '../../constants';
import { useNavigate } from 'react-router-dom';
import MovieContext from '../../context/MovieContext';
import UserForm from '../user-form/UserForm';
const Login = ()=>{
    const { updateLoggedIn } = useContext(UserContext);
    const { refreshMovies } = useContext(MovieContext);
    const navigate = useNavigate();
    const submitLoginDetails = async(data)=>{
        try{
            const response = await fetch(BASE_URL+"/auth/login", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(data)
            });

            const { errorMsg, successMsg } = await response.json();
            if(successMsg){
                console.log("login success");
                updateLoggedIn();
                navigate('/');
                refreshMovies();
            }
            else{
                console.log(errorMsg);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    return <UserForm onSubmitHandler={submitLoginDetails}/>
}

export default Login;