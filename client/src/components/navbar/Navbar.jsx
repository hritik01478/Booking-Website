import './navbar.css'
import { Link, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
    const { user } = useContext(AuthContext);
    const { dispatch } = useContext(AuthContext);
    const [logFeature, setLogFeature] = useState(false);

    const navigate = useNavigate();


    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/");
    }

    return (
        <div className='navbar'>
            <div className="navContainer">
                <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                    <span className="logo">AgrawalBooking</span>
                </Link>
                {user ? (<div className="navItems">
                    <div className="profile">
                        <span onClick={() => setLogFeature(!logFeature)}>{user.username}</span>
                        <div className={logFeature ? "options" : "option"}>
                            <span onClick={handleLogout}>Log Out</span>
                        </div>
                    </div>
                    <img src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" />

                </div>) : (<div className="navItems">
                    <Link to="/register">
                        <button className="navButton">Register</button>
                    </Link>
                    <Link to="/login">
                        <button className="navButton">Login</button>
                    </Link>
                </div>)}
            </div>
        </div>
    )
}

export default Navbar