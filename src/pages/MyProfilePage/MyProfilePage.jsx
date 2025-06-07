import React, { useState, useEffect } from "react";
import axios from "axios";

import "./MyProfilePage.css";
import HeaderContent from "../../Components/HeaderContent/HeaderContent";
import FooterContent from "../../Components/FooterContent/FooterContent";
import PopupMessage from "../../Components/PopupMessage/popupMessage.jsx";
import defaultPatientImage from '../../images/testimonials/patient.jpg';


// Function to validate Sri Lankan phone numbers
function isValidSriLankanPhoneNumber(phone) {
  const normalizedPhone = phone.replace(/\s|-/g, '');
  const patternWithCountryCode = /^\+947\d{8}$/;
  const patternLocal = /^07\d{8}$/;
  return patternWithCountryCode.test(normalizedPhone) || patternLocal.test(normalizedPhone);
}

// Main component for the MyProfilePage
function MyProfilePage() {

// State to manage user data 
  const [userData, setUserData] = useState({
    name: "",
    dob: "",
    phoneNumber: "",
    gender: "",
    address: ""
  });

  const [profilePhoto, setProfilePhoto] = useState(defaultPatientImage);
  const [isEditing, setIsEditing] = useState(false);
  const [popup, setPopup] = useState({ type: "", message: "" });

  
  const patientId = localStorage.getItem("patientId");


  useEffect(() => {

    // Fetch patient data when component mounts
    if (!patientId) return;

    axios.get(`http://localhost:8080/api/patient/${patientId}`)
      .then((res) => {
        const patient = res.data;
        setUserData({
          name: patient.fullName || "",
          dob: patient.dob || "",
          phoneNumber: patient.phoneNumber || "",
          gender: patient.gender || "",
          address: patient.address || ""
        });
      });

    fetchPatientImage();
  }, [patientId]);

  // Function to fetch patient image
  const fetchPatientImage = () => {
    axios.get(`http://localhost:8080/api/patient/image/${patientId}`, {
      responseType: "blob",
    })
    .then((res) => {
      const imageUrl = URL.createObjectURL(res.data);
      setProfilePhoto(imageUrl);
    })
    .catch(() => {
      setProfilePhoto(defaultPatientImage);
    });
  };

  // Function to handle field changes
  // Updates the userData state with the new value for the specified field
  const handleFieldChange = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  // Function to toggle edit mode
  // Switches between viewing and editing mode for the profile
  const handleEditToggle = (e) => {
    e.preventDefault();
    setIsEditing(!isEditing);
  };

  // Function to handle saving changes
  // Validates the phone number and sends a PUT request to update the patient data
  const handleSave = (e) => {
    e.preventDefault();

    setPopup({ type: "hidden", message: "Processing your registration..." });

    if (!isValidSriLankanPhoneNumber(userData.phoneNumber)) {
      setPopup({type: "error",message: "Invalid phone number.enter a valid Sri Lankan phone number."});
      return;
    }


    const confirmed = window.confirm("Do you want to save the changes?");
    if (confirmed && patientId) {
      axios
        .put(`http://localhost:8080/api/patient/${patientId}`, {
          fullName: userData.name,
          dob: userData.dob,
          phoneNumber: userData.phoneNumber,
          gender: userData.gender,
          address: userData.address
        })
        .then((response) => {
          setPopup({ type: "success", message: response.data || "Profile updated successfully." });
          setIsEditing(false);
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 404) {
              setPopup({ type: "error", message: error.response.data || "Patient not found." });
            } else {
              setPopup({ type: "error", message: error.response.data || "An unexpected error occurred." });
            }
          } else {
            setPopup({ type: "error", message: "Network error. Please try again." });
          }
        });
    }
  };

  // Function to handle photo upload
  // Uploads the selected image file to the server and updates the profile photo
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (!file || !patientId) return;

    const formData = new FormData();
    formData.append("image", file);

    axios
      .put(`http://localhost:8080/api/patient/update/${patientId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        fetchPatientImage(); // Refresh image after upload
        alert("Profile photo updated.");
      })
      .catch(() => {
        alert("Failed to update profile image. File size exceeds 10MB limit.");
      });
  };



// -------------------------------------------password section validation and its funtionality-----------------------------------------//

 // State variables for password change functionality
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordStrengthMessage, setPasswordStrengthMessage] = useState('');
  const [passwordStrengthMessageColour, setPasswordStrengthMessageColour] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');
  const [confirmPasswordMessageColour, setConfirmPasswordMessageColour] = useState('');

 


// Function to validate password strength  // Checks if the password meets the criteria: at least 8 characters, contains a number, and a special character
  const validatePassword = (password) => {
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
  };

  const validateConfirmPassword = (newPwd, confirmPwd) => {
    if (!confirmPwd) {
      setConfirmPasswordMessage('');
      setConfirmPasswordMessageColour('');
      return;
    }
    if (newPwd !== confirmPwd) {
      setConfirmPasswordMessage("❌ Passwords do not match.");
      setConfirmPasswordMessageColour("red");
    } else {
      setConfirmPasswordMessage("✅ Passwords match.");
      setConfirmPasswordMessageColour("green");
    }
  };

  const handleupdate = async (e) => {
    e.preventDefault();

    setPopup({ type: '', message: '' });

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPopup({ type: 'warning', message: 'Please fill all fields.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPopup({ type: 'error', message: 'New Password and Confirm Password do not match.' });
      return;
    }

    if (!isPasswordValid) {
      setPopup({ type: 'warning', message: 'Password is not strong enough.' });
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/api/patient/changePassword/${patientId}`,
        {
          currentPassword: currentPassword,
          password: newPassword
        }
      );

      setPopup({ type: 'success', message: response.data });

      // Reset form fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordStrengthMessage('');
      setConfirmPasswordMessage('');
      setConfirmPasswordMessageColour('');
      setPasswordStrengthMessageColour('');
    } catch (error) {
      setPopup({
        type: 'error',
        message: error.response?.data || 'Error updating password.'
      });
    }
  };


  return (
    <>
      <HeaderContent />

      <div className="profile-page scroll-animation">

        {/* Profile Header Section */}
        <div className="profile-header-card">
          <div className="profile-header">
            <img className="profile-photo" src={profilePhoto} alt="Profile" />
            <div className="profile-info">
              <h2>Personalize Your Account</h2>
              <p>Your profile photo will appear on apps and devices that use your account.</p>
              <label className="upload-btn">
                Change Photo
                <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: "none" }}/>
              </label>
            </div>
          </div>
        </div>

        {/* profile information */}
        <div className="profile-details-card">
          <h3>Profile Information</h3>

          <div className="profile-row">
            <label className="field-label">Full Name</label>
            {isEditing ? (
              <input type="text" className="editable-input"  value={userData.name}  onChange={(e) => handleFieldChange("name", e.target.value)}  required/>
            ) : (
              <span className="field-value">{userData.name}</span>
            )}
          </div>

          <div className="profile-row">
            <label className="field-label">Date of Birth</label>
            {isEditing ? (
              <input type="date" className="editable-input" value={userData.dob} onChange={(e) => handleFieldChange("dob", e.target.value)}/>
            ) : (
              <span className="field-value">{userData.dob}</span>
            )}
          </div>

          <div className="profile-row">
            <label className="field-label">Gender</label>
            {isEditing ? (
              <select className="editable-input" value={userData.gender} onChange={(e) => handleFieldChange("gender", e.target.value)} required >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <span className="field-value">{userData.gender}</span>
            )}
          </div>

          <div className="profile-row">
            <label className="field-label">Mobile Number</label>
            {isEditing ? (
              <input type="text"className="editable-input" value={userData.phoneNumber} onChange={(e) => handleFieldChange("phoneNumber", e.target.value)} required />
            ) : (
              <span className="field-value">{userData.phoneNumber}</span>
            )}
          </div>

          <div className="profile-row">
            <label className="field-label">Address</label>
            {isEditing ? (
              <input type="text" className="editable-input" value={userData.address} onChange={(e) => handleFieldChange("address", e.target.value)} required/>
            ) : (
              <span className="field-value">{userData.address}</span>
            )}
          </div>

          <div className="action-links">
            {!isEditing ? (
              <a href="#" className="link edit-link" onClick={handleEditToggle}>
                Edit
              </a>
            ) : (
              <a href="#" className="link save-link" onClick={handleSave}>
                Save
              </a>
            )}
          </div>

        </div>


        {/* Change Password Section */}
        <div className="profile-details-card">
          <h3>Change Password</h3>
          <form onSubmit={handleupdate}>
            <div className='profilerow1'>
              <div className="profilerow">
                <label className="field-label">Current Password</label>
                <input type="password" className="editable-input" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}  required/>
              </div>
            </div>

            <div className='profilerow1'>
              <div className="profilerow">
                <label className="field-label">New Password</label>
                <input  type="password" className="editable-input" value={newPassword} onChange={(e) => { const value = e.target.value; setNewPassword(value); validatePassword(value);  validateConfirmPassword(value, confirmPassword);}} required />
              </div>
              <p className="field-message" style={{ color: passwordStrengthMessageColour }}> {passwordStrengthMessage}</p>
            </div>

            <div className='profilerow1'>
              <div className="profilerow">
                <label className="field-label">Confirm Password</label>
                <input type="password" className="editable-input" value={confirmPassword} onChange={(e) => { const confirmValue = e.target.value; setConfirmPassword(confirmValue);  validateConfirmPassword(newPassword, confirmValue); }} required />
              </div>
              <p className="field-message" style={{ color: confirmPasswordMessageColour }}>{confirmPasswordMessage} </p>
            </div>

            <div className="update-links">
              <button type="submit" className="link save-link"> Update</button>
            </div>
          </form>
        </div>

      </div>
      <PopupMessage type={popup.type} message={popup.message} />
      <FooterContent />
    </>
  );
}

export default MyProfilePage;
