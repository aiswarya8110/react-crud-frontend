import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserContext from './context/UserContext';
import './App.css'
import Layout from './components/Layout';
import MovieList from './components/movie-list/MovieList';
import { BASE_URL } from './constants';
import MovieContext from './context/MovieContext';
import ErrorPage from './components/ErrorPage/ErrorPage';
import EditMovie from './components/edit-movie/EditMovie';
import AddMovie from './components/add-movie/AddMovie';
import Login from './components/login/Login';
import ProtectedRoute from './components/protected-routes/ProtectedRoute';
import useLocalStorage from './custom-hooks/useLocalStorage';
import Register from './components/register/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <MovieList />
          },
          {
            path: 'add',
            element: <AddMovie/>
          },
          {
            path: 'edit/:id',
            element: <EditMovie />
          },
        ],
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      }
    ],
    errorElement: <ErrorPage />
  }
])

function App() {
  const [ movies, setMovies ] = useState([]);
  const [refresh, setRefresh ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ errorMsg, setErrorMsg ] = useState(null);
  const [ loggedIn , setLoggedIn ] = useLocalStorage("loggedIn");
  useEffect(()=>{
    setErrorMsg(null);
    const getMovies = async()=>{
      setIsLoading(true);
      try{
        const response = await fetch(BASE_URL+"/movies");
        const data = await response.json();

        if(data.errorMsg){
          setErrorMsg(data.message);
        }
        else setMovies(data);

      }catch(err){
        console.log(err);
        setErrorMsg(err.message);
      }
      finally{
        setIsLoading(false);
      }
    };
    getMovies();

  },[refresh]);

  const updateRefresh = ()=>{
    setRefresh((prev)=> !prev);
  }

  const updateLoggedIn = ()=>{
    setLoggedIn((prev)=> !prev);
  }

  return (
    <UserContext.Provider value={{loggedIn, updateLoggedIn}}>
      <MovieContext.Provider value={{movies, refreshMovies: updateRefresh, isLoading, errorMsg}}>
        <RouterProvider router={router}/>
      </MovieContext.Provider>
    </UserContext.Provider>
  )
}

export default App;