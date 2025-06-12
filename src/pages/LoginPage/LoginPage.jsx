import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';
import PopupMessage from '../../Components/PopupMessage/popupMessage.jsx'; // Adjust path if needed

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [popup, setPopup] = useState({ type: '', message: '' });

    const handleLogin = async (e) => {
        e.preventDefault();


        // Reset popup message before making the request
        setPopup({ type: '', message: '' });

        try {
            const response = await axios.post('http://localhost:8080/api/patient/login', {
                email,
                password
            });

            const data = response.data;

            if (response.status === 200 && data.patientId) {
                // Save session data
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('patientId', data.patientId);
                localStorage.setItem('loginMessage', data.message);

                console.log('Login successful:', data.patientId); // Log patientId for debugging

                // Show success popup
                setPopup({ type: 'success', message: data.message });

                // Delay navigation to allow message to show
                setTimeout(() => navigate('/'), 1500);
            } else {
                setPopup({ type: 'error', message: data.message  });
            }

        } catch (err) {
            if (err.response && err.response.data) {
            setPopup({ type: 'error', message: err.response.data });
        } else {
        setPopup({ type: 'warning', message: "Please check your internet connection." });
       }
    }

    };

    return (
        <div className='login-body'>
            <PopupMessage type={popup.type} message={popup.message} />

            <div className="login-page">
                <div className="login-container">
                    <h1>Login</h1>

                    <form onSubmit={handleLogin} className="login-form">
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input type="email"id="email"placeholder="Enter your email"value={email}onChange={(e) => setEmail(e.target.value)}required/>
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        </div>

                        <button className='log-button' type="submit">Login</button>
                    </form>

                    <p>Don't have an account? <Link to='/register'>Register here</Link></p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
