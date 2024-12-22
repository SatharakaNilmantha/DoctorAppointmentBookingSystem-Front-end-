import React from 'react';
import { useNavigate ,Link } from 'react-router-dom';
import './LoginPage.css';


function LoginPage() {
    const navigate = useNavigate(); // Initialize the navigate function

    const goToHomePage = (e) => {
        e.preventDefault(); // Prevent default form submission
        // Simulate login process here (e.g., validation, setting login state)
        localStorage.setItem('isLoggedIn', 'true'); // Simulating user login
        navigate('/'); // Navigate to home page after successful login
    };

    return (
        <div className='login-body'>
            <div className="login-page">
                <div className="login-container">
                    <h1>Login</h1>
                    <form onSubmit={goToHomePage}> {/* Attach onSubmit to the form */}
                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" placeholder="Enter your username" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder="Enter your password" required />
                        </div>
                        <button className='log-button' type="submit">Login</button>    
                    </form>
                    <p>Create a new account? <Link to='/register'>Click here</Link></p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
