import React, { useContext } from 'react';
import MovieContext from '../../context/MovieContext';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import { BASE_URL } from '../../constants';
const MovieList = ()=>{
    const {movies, isLoading, refreshMovies, errorMsg } = useContext(MovieContext);
    const navigate = useNavigate();
    console.log(movies);
    const deleteMovie = async(id)=>{
        try{
            const response = await fetch(`${BASE_URL}/movies/${id}`, 
            {
            method: "DELETE",
            headers: {
            "Accept": "application/json"
            }});

            const data = await response.json();
            console.log("deleted movie", data);
            refreshMovies();
        }catch(err){
            console.log(err);
        }
    }

    const handleDelete = (movieId)=>{
       const confirm = window.confirm("Are You sure you want to delete this movie?");

       if(confirm){
         deleteMovie(movieId);
       }
    }

    
    if(isLoading) return <h4 className='center'>Loading..</h4>

    if(errorMsg){
        return <h4 className='center'>{errorMsg}</h4>
    }

    if(movies.length === 0) return <h4 className='center'>No Movies found, click Add Movie</h4>

    return (
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Movie Name</th>
                    <th>Release Year</th>
                    <th>Director</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {movies?.map((movie, index)=> (
                    <tr key={movie._id}>
                        <td>{index + 1}</td>
                        <td>{movie.title}</td>
                        <td>{movie.release_year}</td>
                        <td>{movie.director}</td>
                        <td>
                            <Button variant="primary" onClick={()=> navigate(`/edit/${movie._id}`)}>Edit</Button>
                        </td>
                        <td>
                            <Button variant="danger" onClick={()=>handleDelete(movie._id)}>Delete</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default MovieList;