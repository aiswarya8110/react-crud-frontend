import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { DevTool } from '@hookform/devtools';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
const UserForm = ({ onSubmitHandler, isRegister })=>{
    const { register, control, handleSubmit, formState: { errors } } = useForm();

    return (
        <Form onSubmit={handleSubmit(onSubmitHandler)}>
            <h3 className="center">{isRegister ? "Register" : "Login"}</h3>
            <Form.Group controlId='email' className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type='text' placeholder="enter email" {...register("email", {required: "email is required"})}/>
            </Form.Group>
            {errors.email && <p className='text-danger'>{errors.email.message}</p>}
            <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder='enter password'  {...register("password", {required: "password is required"})}/>
            </Form.Group>
            {errors.password && <p className='text-danger'>{errors.password.message}</p>}
            {!isRegister && <p>Don't have an account? <Link to="/register">Register here</Link></p>}
            <Button type="submit" className="primary">{isRegister ? "Register" : "Login"}</Button>
            <DevTool control={control}/>
        </Form>
    )
}

export default UserForm;