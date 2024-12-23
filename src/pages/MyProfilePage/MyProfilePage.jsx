import React, { useState } from "react";
import "./MyProfilePage.css"; // Import custom CSS for styling

import patient from '../../images/testimonials/patient.jpg'
import HeaderContent from "../../Components/HeaderContent/HeaderContent";
import FooterContent from "../../Components/FooterContent/FooterContent";

function MyProfilePage() {

    // State to hold user profile data
    const [userData, setUserData] = useState({
        name: "Satharaka Nilmanta",  // Default user name
        dob: "9/12/2000",  // Default date of birth
        country: "Sri Lanka",  // Default country
        gender: "Male",  // Default gender
    });

    // State to hold the user's profile photo URL
    const [profilePhoto, setProfilePhoto] = useState(
        patient  // Default placeholder image
    );

    // State to control the editing mode (true = editing, false = view-only)
    const [isEditing, setIsEditing] = useState(false);

    // Function to handle changes to user data (name, dob, etc.)
    const handleFieldChange = (field, value) => {
        setUserData((prevData) => ({ ...prevData, [field]: value }));
    };

    // Toggle between edit and view mode
    const handleEditToggle = (e) => {
        e.preventDefault();
        setIsEditing(!isEditing);  // Toggle the editing state
    };

    // Function to save the changes and confirm with the user
    const handleSave = (e) => {
        e.preventDefault();
        const confirmed = window.confirm("Do you want to save the changes?");
        if (confirmed) {
            setIsEditing(false);  // Exit editing mode after saving
        }
    };

    // Function to handle the photo upload (changes the profile photo)
    const handlePhotoUpload = (event) => {
        const file = event.target.files[0];  // Get the uploaded file
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfilePhoto(e.target.result);  // Set the new profile photo
            };
            reader.readAsDataURL(file);  // Read the file as a data URL
        }
    };

    return (

     <>

       <HeaderContent/>
       
        <div className="profile-page scroll-animation">

            {/* Profile Header Card */}
            <div className=" profile-header-card">
                <div className="profile-header">

                    <img className="profile-photo" src={profilePhoto} alt="Profile" /> 

                    <div className="profile-info">
                        <h2>Personalize Your Account</h2>
                        <p>Your profile photo will appear on apps and devices that use your account.</p>

                        <label className="upload-btn"> Change Photo
                            {/* Hidden file input to upload new photo */}
                            <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: "none" }}  />
                        </label>

                    </div>

                </div>
            </div>

            {/* Profile Details Card */}
            <div className=" profile-details-card">
                <h3>Profile Information</h3>

                {/* Name Row */}
                <div className="profile-row">
                    <label className="field-label">Full Name</label>
                    {isEditing ? (
                        <input type="text" className="editable-input" value={userData.name} onChange={(e) => handleFieldChange("name", e.target.value)} required/>
                    ) : (
                        <span className="field-value">{userData.name}</span>
                    )}
                </div>

                {/* Date of Birth Row */}
                <div className="profile-row">
                    <label className="field-label">Date of Birth</label>
                    {isEditing ? (
                        <input type="date" className="editable-input" value={userData.dob} onChange={(e) => handleFieldChange("dob", e.target.value)} />
                    ) : (
                        <span className="field-value">{userData.dob}</span>
                    )}
                </div>

                {/* Gender Row */}
                <div className="profile-row">
                    <label className="field-label">Gender</label>
                    {isEditing ? (
                        <select className="editable-input" value={userData.gender} onChange={(e) => handleFieldChange("gender", e.target.value)}>
                            <option value="Male">Male</option> 
                            <option value="Female">Female</option>  
                            <option value="Other">Other</option>  
                        </select>
                    ) : (
                        <span className="field-value">{userData.gender}</span> 
                    )}
                </div>

                {/* Country Row */}
                <div className="profile-row">
                    <label className="field-label">Country/Region</label>
                    {isEditing ? (
                        <input type="text" className="editable-input" value={userData.country} onChange={(e) => handleFieldChange("country", e.target.value)} required/>
                    ) : (
                        <span className="field-value">{userData.country}</span> 
                    )}
                </div>

                {/* Edit and Save Links */}
                <div className="action-links">
                    {!isEditing ? (
                        <a href="#" className="link edit-link" onClick={handleEditToggle}>Edit</a>  
                    ) : (
                        <a href="#" className="link save-link" onClick={handleSave}>Save</a> 
                    )}
                </div>

            </div>
        </div>

        <FooterContent/>
     </>
        
    );
}

export default MyProfilePage;

