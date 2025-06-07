import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import PopupMessage from '../../Components/PopupMessage/popupMessage.jsx';
import './RegisterPage.css';

function RegisterPage() {
    const navigate = useNavigate();
    const [toastData, setToastData] = useState({ type: "", message: "" });
    const [passwordStrengthMessage, setPasswordStrengthMessage] = useState("");
    const [passwordStrengthMessageColour, setPasswordStrengthMessageColour] = useState("red");
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatchMessage, setPasswordMatchMessage] = useState('');
    const [profileImage, setProfileImage] = useState(null);


    // Function to validate password strength
    function validatePassword(password) {
        if (!password) {
            setPasswordStrengthMessage('');
            setIsPasswordValid(false);
            return;
        }

        const minLength = password.length >= 8;
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (!minLength) {
            setPasswordStrengthMessage("❌ Password must be at least 8 characters long.");
            setPasswordStrengthMessageColour("red");
            setIsPasswordValid(false);
        } else if (!hasNumber) {
            setPasswordStrengthMessage("❌ Password must contain at least one number.");
            setPasswordStrengthMessageColour("red");
            setIsPasswordValid(false);
        } else if (!hasSpecialChar) {
            setPasswordStrengthMessage("❌ Password must contain at least one special character.");
            setPasswordStrengthMessageColour("red");
            setIsPasswordValid(false);
        } else {
            setPasswordStrengthMessage("✅ Strong Password");
            setPasswordStrengthMessageColour("green");
            setIsPasswordValid(true);
        }
    }

    // Function to handle confirm password change
    function handleConfirmPasswordChange(value) {
        setConfirmPassword(value);
        const password = document.getElementById('password').value;
        if (!value || !password) {
            setPasswordMatchMessage('');
        } else if (password !== value) {
            setPasswordMatchMessage("❌ Passwords do not match.");
        } else {
            setPasswordMatchMessage("✅ Passwords match.");
        }
    }

    // Function to handle image change
    function handleImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
        }
    }

    // Function to validate Sri Lankan phone numbers
    function isValidSriLankanPhoneNumber(phone) {
        const normalizedPhone = phone.replace(/\s|-/g, '');
        const patternWithCountryCode = /^\+947\d{8}$/;
        const patternLocal = /^07\d{8}$/;
        return patternWithCountryCode.test(normalizedPhone) || patternLocal.test(normalizedPhone);
    }


    // Function to handle registration
    function handleRegister(e) {
        e.preventDefault();
        setToastData({ type: "hidden", message: "Processing your registration..." });

        if (!isPasswordValid) {
            setToastData({ type: "error", message: "Please enter a strong password before registering." });
            return;
        }

        if (document.getElementById('password').value !== confirmPassword) {
            setToastData({ type: "error", message: "Passwords do not match." });
            return;
        }

        const phoneNumber = document.getElementById('phonenumber').value;
        if (!isValidSriLankanPhoneNumber(phoneNumber)) {
            setToastData({ type: "error", message: "Please enter a valid Sri Lankan phone number." });
            return;
        }

      
       // Create patient object with form data
        const patient = {
            fullName: document.getElementById('fullname').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            phoneNumber: phoneNumber,
            gender: document.getElementById('gender').value,
            dob: document.getElementById('dob').value,
            address: document.getElementById('address').value
        };

        // Create FormData object to handle file upload
        const formData = new FormData();
        formData.append('patient', JSON.stringify(patient));
        if (profileImage) {
            formData.append('image', profileImage);
        }

        axios.post('http://localhost:8080/api/patient/savePatient', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(response => {
            setToastData({ type: "success", message: "Registration Successful!" });
            setTimeout(() => navigate('/login'), 2000);
        })
        .catch(error => {
            if (error.response) {
                setToastData({ type: "error", message: error.response.data });
            } else {
                setToastData({ type: "warning", message: "Please check your internet connection." });
            }
        });
    }

    return (
        <div className='register-body'>
            <div className="register-page">
                <div className="register-container">
                    <h1>Register</h1>
                    <form onSubmit={handleRegister} className="register-form">
                        <div className="input-group">
                            <label htmlFor="fullname">Full Name</label>
                            <input type="text" id="fullname" placeholder="Enter your full name" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="Enter your email" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder="Enter your password" required onChange={(e) => { validatePassword(e.target.value); handleConfirmPasswordChange(confirmPassword);}}/>
                            <small className="password-message" style={{ color: passwordStrengthMessageColour }}>{passwordStrengthMessage}</small>
                        </div>

                        <div className="input-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" id="confirmPassword" placeholder="Re-enter your password" onChange={(e) => handleConfirmPasswordChange(e.target.value)}/>
                            {passwordMatchMessage && (
                                <small className="password-message" style={{ color: passwordMatchMessage.includes("✅") ? "green" : "red" }}>{passwordMatchMessage}</small>
                            )}
                        </div>
                        <div className="form-columns">
                            <div className="input-group">
                                <label htmlFor="phonenumber">Phone Number</label>
                                <input type="text" id="phonenumber" placeholder="e.g., +94771234567 or 0771234567" required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="gender">Gender</label>
                                <select id="gender" required>
                                    <option value="" disabled selected>Select your gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="input-group">
                            <label htmlFor="dob">Date of Birth</label>
                            <input type="date" id="dob" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="address">Address</label>
                            <textarea id="address" placeholder="Enter your address" required rows="2"></textarea>
                        </div>
                        <div className="input-group">
                            <label htmlFor="profileImage">Profile Image</label>
                            <input type="file" accept="image/*" onChange={handleImageChange} />
                        </div>
                        <button className='register-button' type="submit">Register</button>
                    </form>
                    <p>
                        Already have an account? <Link to="/login">Login here</Link>
                    </p>
                </div>
            </div>
            <PopupMessage type={toastData.type} message={toastData.message} />
        </div>
    );
}

export default RegisterPage;
