import React from 'react';
import './MyAppointmentPage.css';
import HeaderContent from '../../Components/HeaderContent/HeaderContent.jsx';
import BodyContent from '../../Components/BoadyContent/BodyContent.jsx'; 
import FooterContent from '../../Components/FooterContent/FooterContent.jsx';

import doctor1 from '../../images/doctors/doctors-1.jpg';

function MyAppointmentPage() {
  return (
    <>
      <HeaderContent />
      <BodyContent>
        <div className="body-content ">
          <h1 className="text-with-underline1 ">Doctors</h1> 

          <div className="appointment-card">
              <img src={doctor1} alt="Doctor" className="doctor-image" />

              <div className="appointment-details">
                <div className="row">
                  <h2>Dr. Richard James</h2>
                </div>

                <div className="row">
                  <p>General Physician</p>
                </div>

                <div className="row">
                  <p><strong>Address:</strong> 24 Main Street <br /> 10 Clause Road</p>
                </div>

                <div className="row">
                  <p><strong>Date & Time:</strong> 5 Oct 2024 | 12:00 PM</p>
                </div>
              </div>

              {/* Wrapper for the buttons */}
              <div className="buttons">
                <button className="pay-online">Pay Online</button>
                <button className="cancel-appointment">Cancel Appointment</button>
              </div>
          </div>

          <div className="appointment-card">
              <img src={doctor1} alt="Doctor" className="doctor-image" />

              <div className="appointment-details">
                <div className="row">
                  <h2>Dr. Richard James</h2>
                </div>

                <div className="row">
                  <p>General Physician</p>
                </div>

                <div className="row">
                  <p><strong>Address:</strong> 24 Main Street <br /> 10 Clause Road</p>
                </div>

                <div className="row">
                  <p><strong>Date & Time:</strong> 5 Oct 2024 | 12:00 PM</p>
                </div>
              </div>

              {/* Wrapper for the buttons */}
              <div className="buttons">
                <button className="pay-online">Pay Online</button>
                <button className="cancel-appointment">Cancel Appointment</button>
              </div>
          </div>

          <div className="appointment-card">
              <img src={doctor1} alt="Doctor" className="doctor-image" />

              <div className="appointment-details">
                <div className="row">
                  <h2>Dr. Richard James</h2>
                </div>

                <div className="row">
                  <p>General Physician</p>
                </div>

                <div className="row">
                  <p><strong>Address:</strong> 24 Main Street <br /> 10 Clause Road</p>
                </div>

                <div className="row">
                  <p><strong>Date & Time:</strong> 5 Oct 2024 | 12:00 PM</p>
                </div>
              </div>

              {/* Wrapper for the buttons */}
              <div className="buttons">
                <button className="pay-online">Pay Online</button>
                <button className="cancel-appointment">Cancel Appointment</button>
              </div>
          </div>

          <div className="appointment-card">
              <img src={doctor1} alt="Doctor" className="doctor-image" />

              <div className="appointment-details">
                <div className="row">
                  <h2>Dr. Richard James</h2>
                </div>

                <div className="row">
                  <p>General Physician</p>
                </div>

                <div className="row">
                  <p><strong>Address:</strong> 24 Main Street <br /> 10 Clause Road</p>
                </div>

                <div className="row">
                  <p><strong>Date & Time:</strong> 5 Oct 2024 | 12:00 PM</p>
                </div>
              </div>

              {/* Wrapper for the buttons */}
              <div>
                <button className="pay-online">Pay Online</button>
                <button className="cancel-appointment">Cancel Appointment</button>
              </div>
          </div>

        </div>
      </BodyContent>
      <FooterContent/>
      
    </>
  );
}

export default MyAppointmentPage;
