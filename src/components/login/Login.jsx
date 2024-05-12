import React, { useContext } from 'react';
import UserContext from '../../context/UserContext';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { BASE_URL } from '../../constants';
import { useNavigate } from 'react-router-dom';
import MovieContext from '../../context/MovieContext';
const Login = ()=>{
    const { register, control, handleSubmit, formState: { errors } } = useForm();
    const { updateLoggedIn } = useContext(UserContext);
    const { refreshMovies } = useContext(MovieContext);
    const navigate = useNavigate();
    const onSubmitHandler = async(data)=>{
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

    return (
        <Form onSubmit={handleSubmit(onSubmitHandler)}>
            <h3 className="center">Login</h3>
            <Form.Group controlId='email' className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type='text' placeholder="enter email" value="jerry@gmail.com" {...register("email", {required: "email is required"})}/>
            </Form.Group>
            {errors.email && <p className='text-danger'>{errors.email.message}</p>}
            <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder='enter password' value="123456s"  {...register("password", {required: "password is required"})}/>
            </Form.Group>
            {errors.password && <p className='text-danger'>{errors.password.message}</p>}
            <Button type="submit" className="primary">Login</Button>
            <DevTool control={control}/>
        </Form>
    )
}

export default Login;