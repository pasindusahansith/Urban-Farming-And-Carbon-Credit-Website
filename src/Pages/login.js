import React from 'react';
import '../Assest/css/Login.css';
import SignUp from './signup';
import { useNavigate } from 'react-router-dom';
   
const Login = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate("/signup"); 
        };

    return (
        <div className="login-container">
            <div className='containerleftlogin'>
                <h1>
                    GreenCredit.lk
                </h1>
            </div>
            <div className='containerrightlogin'>
                <div className="login-box">
                    <h2>SIGN-IN</h2>
                    <form>
                        <div className="input-field">
                            <label>Email or Username</label>
                            <input type="text" placeholder="Enter your email or username" />
                        </div>
                        <div className="input-field">
                            <label>Password</label>
                            <div className="password-wrapper">
                                <input type="password" placeholder="Enter your password" />
                                <i className="fa-solid fa-eye"></i>
                            </div>
                        </div>
                        <button className="login-button">LOG-IN</button>
                    </form>
                    <p>
                        IF YOU DON'T HAVE AN ACCOUNT? <a onClick={handleLogout}> Sign Up</a>
                    </p>
                </div>
            </div>
            
        </div>
    );
};

export default Login;
