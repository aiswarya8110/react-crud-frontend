import React from 'react';
import { NavLink, useNavigate} from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import { Button } from 'react-bootstrap';
import './Header.css';
import { BASE_URL } from '../../constants';
const Header = ()=>{
    const { loggedIn, updateLoggedIn } = useContext(UserContext);
    const navigate = useNavigate();
    const handleLoginLogout = async()=>{
        try{
            await fetch(BASE_URL+"/auth/logout", 
            {
                method: "POST",
                headers: {
                    "Accept": "application/json"
                }
            }
        )

        updateLoggedIn();
        navigate('/');

        }catch(err){
            console.log(err);
        }
    }

    return (
        <header className='header'>
            <h2 className='title'>Movie Listing App</h2>
            {
                loggedIn && (
                    <ul className="menu-items">
                        <li>
                            <NavLink to="/" className={({ isActive })=> isActive ? "link-active": "link-inactive"}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/add" className={({ isActive })=> isActive ? "link-active": "link-inactive"}>Add Movie</NavLink>
                        </li>
                        <li>
                            <Button onClick={handleLoginLogout}>Logout</Button>
                        </li>
                    </ul>
                )
            }
        </header>
    )
}

export default Header;