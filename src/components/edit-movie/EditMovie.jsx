import React, { useEffect, useState } from 'react';
import { BASE_URL } from "../../constants"
import MovieForm from "../movie-form/MovieForm";
import { useParams } from "react-router-dom";
const EditMovie = ()=>{
    const { id } = useParams();
    const [ movie, setMovie ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ successMsg, setSuccessMsg ] = useState(null);
    const getSingleMovie = async()=>{
      try{
        const response = await fetch(`${BASE_URL}/movies/${id}`);
        const data = await response.json();
        setMovie(data);
      }catch(err){
        console.log(err);
      }
      finally{
        setIsLoading(false);
      }
    }

    useEffect(()=>{
      getSingleMovie();
    },[]);
    const editMovie = async(data)=>{
      try{
        const response = await fetch(`${BASE_URL}/movies/${data.id}`, 
            {
                method: "PATCH",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data.data)
            }
            );
        console.log(response);
        setSuccessMsg("Movie Updated Successfully!!")
      }catch(err){
        console.log(err);
      }
    }

    if(isLoading) return <h4 className="center">Loading..</h4>

    return <>
                <h3>Edit Movie</h3>
                <MovieForm handleFormSubmit={editMovie} movie={movie} successMsg={successMsg} setSuccessMsg={setSuccessMsg}/>
            </>
}

export default EditMovie;