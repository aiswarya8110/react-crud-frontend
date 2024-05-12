import React, { useContext, useEffect } from 'react';
import { Form, Button} from 'react-bootstrap';
import { DevTool } from '@hookform/devtools';
import MovieContext from '../../context/MovieContext';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
const MovieForm = ({ handleFormSubmit, successMsg, setSuccessMsg, movie })=>{
    const { refreshMovies } = useContext(MovieContext);
    const navigate = useNavigate();
    const { register, control, reset, formState: { errors }, handleSubmit } = useForm();
    const { title, release_year, director, _id } = movie || {};

    useEffect(()=>{
        reset({title, release_year, director});  
    },[movie]);
    
    const onSubmitHandler = (data)=>{
        if(movie){
            // Edit movie
            handleFormSubmit({data, id: _id});
            setTimeout(()=>{
                setSuccessMsg(null);
                refreshMovies();
                navigate("/");
            }, 2000);
        }
        else{
            // Add Movie
            handleFormSubmit(data);
            setTimeout(()=>{
                setSuccessMsg(null); 
                reset();
                refreshMovies();
                navigate("/");
            }, 2000)
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmitHandler)}>
                {successMsg && <h3 className='success-msg'>{successMsg}</h3>}
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="enter movie title" {...register("title", { required: "please provide movie title"})}/>
                </Form.Group>
                {errors?.title && <p className='error-msg'>{errors?.title?.message}</p>}
                <Form.Group className="mb-3" controlId="release-year">
                    <Form.Label>Release Year</Form.Label>
                    <Form.Control type="text" placeholder="enter release year" {...register("release_year", {required: "please provide release year"})}/>
                </Form.Group>
                {errors?.release_year && <p className='error-msg'>{errors?.release_year?.message}</p>}
                <Form.Group className="mb-3" controlId="director" >
                    <Form.Label>Director</Form.Label>
                    <Form.Control type="text" placeholder="enter director" {...register("director", {required: "please provide director"})}/>
                </Form.Group>
                {errors?.director && <p className='error-msg'>{errors?.director?.message}</p>}
                <Button className="primary" type="submit">{movie ? "Update movie" : "Add movie"}</Button>
            </Form>
            <DevTool control={control}/>
        </>
        
    )
}

export default MovieForm;









/*

function addForm(submitHandler){
    setSuccess
    submitHandler();
}

function AddMovie(){
    const submitHandler= ()=>{
        setSucess()
    }

    addForm(submitHandler)
}



*/