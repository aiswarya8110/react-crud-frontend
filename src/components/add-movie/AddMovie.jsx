import React, { useState } from 'react';
import { BASE_URL } from '../../constants';
import MovieForm from '../movie-form/MovieForm';
const AddMovie = ()=>{
    const [successMsg, setSuccessMsg] = useState(null);
    const addMovieToDB = async(data)=>{

        try{
            const response = await fetch(BASE_URL+"/movies", 
            {
            method: "POST", 
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
            });

            const msg = await response.json();
            console.log(msg.message);
            setSuccessMsg("Movie Added Successfully!");
            
        }
        catch(err){
            console.log(err);
        }
    }

    return (
            <>    
                <h3>Add Movie</h3>   
                <MovieForm handleFormSubmit={addMovieToDB} successMsg={successMsg} setSuccessMsg={setSuccessMsg}/>
            </>
        )
}

export default AddMovie;