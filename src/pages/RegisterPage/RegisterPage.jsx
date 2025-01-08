import React, { useState } from 'react';
import { useNavigate ,Link } from 'react-router-dom';
import './RegisterPage.css';

function RegisterPage() {
    const navigate = useNavigate(); // Initialize the navigate function
    
    const [photo, setPhoto] = useState(null); // State to handle photo upload

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(URL.createObjectURL(file)); // Create a preview of the uploaded photo
        }
    };

    const handleRegister = (e) => {
        e.preventDefault(); // Prevent default form submission
        // Simulate registration process here (e.g., validation, storing user data)
        localStorage.setItem('isRegistered', 'true'); // Simulating user registration
        navigate('/login'); // Navigate to login page after successful registration
    };

    return (
        <div className='register-body'>
            <div className="register-page">
                <div className="register-container">
                    <h1>Register</h1>
                    <form onSubmit={handleRegister}> {/* Attach onSubmit to the form */}
                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" placeholder="Enter your username" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="Enter your email" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder="Enter your password" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="photo">Upload Photo</label>
                            <input type="file" id="photo" accept="image/*" onChange={handlePhotoUpload} />
                        </div>
                        {photo && <div className="photo-preview"><img src={photo} alt="Preview" /></div>} {/* Display preview if photo uploaded */}
                        <button className='register-button' type="submit">Register</button>
                    </form>
                    <p>
                       Already have an account? <Link to="/login">Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
