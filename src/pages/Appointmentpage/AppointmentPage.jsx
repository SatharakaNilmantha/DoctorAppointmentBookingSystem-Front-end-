import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AppointmentPage.css';
import doctor1 from "../../images/doctors/doctors-1.jpg";
import { FaAnglesLeft } from "react-icons/fa6";
import PopupMessage from '../../Components/PopupMessage/popupMessage.jsx'; 

function AppointmentPage() {


    const today = new Date();
    const doctorId = 2; // Static doctor ID
    const patientId = parseInt(localStorage.getItem("patientId")); // Get patientId from localStorage



    // Function to generate the next 7 dates starting from tomorrow
    const generateDates = () => {
        const dates = [];
        for (let i = 1; i <= 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            dates.push(date);
        }
        return dates;
    };


    // Function to generate time slots based on the day of the week
    const generateTimeSlotsForDay = (dayOfWeek) => {
        let start, end, interval = 30;
        switch (dayOfWeek) {
            case 0:
                start = new Date(0, 0, 0, 11, 0);
                end = new Date(0, 0, 0, 15, 0);
                break;
            case 6:
                start = new Date(0, 0, 0, 9, 0);
                end = new Date(0, 0, 0, 12, 0);
                break;
            default:
                start = new Date(0, 0, 0, 10, 0);
                end = new Date(0, 0, 0, 16, 0);
                break;
        }

        const times = [];
        let currentTime = new Date(start);
        while (currentTime < end) {
            times.push(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            currentTime.setMinutes(currentTime.getMinutes() + interval);
        }
        return times;
    };

        const dates = generateDates();
        const [selectedDate, setSelectedDate] = useState(dates[0]);
        const [selectedTime, setSelectedTime] = useState(null);
        const [bookingConfirmation, setBookingConfirmation] = useState({});
        const [bookedAppointments, setBookedAppointments] = useState([]);
        const [patientAppointments, setPatientAppointments] = useState([]);


    // Fetch booked appointments for the doctor and patient appointments
    const fetchBookedAppointments = () => {
        axios.get(`http://localhost:8080/api/appointments/getAppointmentsByDoctor/${doctorId}`)
            .then((res) => setBookedAppointments(res.data))
            .catch((err) => console.error("Doctor appointments fetch error:", err));
    };


    // Fetch appointments booked by the patient
    const fetchPatientAppointments = () => {
        axios.get(`http://localhost:8080/api/appointments/getAppointmentsByPatient/${patientId}`)
            .then((res) => setPatientAppointments(res.data))
            .catch((err) => console.error("Patient appointments fetch error:", err));
    };

    useEffect(() => {
        fetchBookedAppointments();
        fetchPatientAppointments();
    }, []);

    const timeSlots = generateTimeSlotsForDay(selectedDate.getDay());


    // Function to get booked times based on the selected date
    const getTimesByCondition = (appointments, date) => {
        return appointments
            .filter(appt => new Date(appt.appointmentDateTime).toDateString() === date.toDateString())
            .map(appt => new Date(appt.appointmentDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };


    // Get times booked by others for the selected date
    const bookedTimes = getTimesByCondition(bookedAppointments, selectedDate);

    // Get times booked by the patient for the selected doctor
    const patientTimes = getTimesByCondition(
        patientAppointments.filter(appt => parseInt(appt.doctorId) === doctorId),
        selectedDate
    );

    const handleTimeClick = (time) => {
        // Only allow selecting if slot is NOT booked by others (booked by patient is okay)
        if (!bookedTimes.includes(time) || patientTimes.includes(time)) {
            setSelectedTime(time);
        }
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
        setSelectedTime(null);
    };

    // Function to handle booking
    const handleBooking = () => {

        setBookingConfirmation({type: '', message: "" });

        // Check if both date and time are selected
        if (selectedDate && selectedTime) {
            const pad = (num) => num.toString().padStart(2, '0');
            const [hour, minute] = selectedTime.split(':');
            const dt = new Date(selectedDate);
            dt.setHours(parseInt(hour), parseInt(minute), 0, 0);

            const yyyy = dt.getFullYear();
            const mm = pad(dt.getMonth() + 1);
            const dd = pad(dt.getDate());
            const hh = pad(dt.getHours());
            const min = pad(dt.getMinutes());

            const appointmentDateTime = `${yyyy}-${mm}-${dd}T${hh}:${min}:00`;

            const appointmentData = {
                patientId,
                doctorId,
                appointmentDateTime,
                status: "PENDING"
            };

            axios.post("http://localhost:8080/api/appointments/saveAppointment", appointmentData)
                .then((res) => {
                    const formattedDate = dt.toLocaleDateString('en-US', {
                        weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'
                    });
                    const formattedTime = dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                    setBookingConfirmation({type: 'success', message: `Appointment booked on ${formattedDate} at ${formattedTime}`, });

                    fetchBookedAppointments();
                    fetchPatientAppointments();
                    setSelectedTime(null);
                })
                .catch((error) => {
                    setBookingConfirmation({ type: 'error', message: error.response?.data || "Booking failed. Try again.",});
                });
        } else  {
            setBookingConfirmation({type: 'warning',message: "Please select both date and time.",});
        }
    };

    // Function to handle back navigation
    const navigate = useNavigate();
    const handleBackClick = () => navigate(-1);

    return (
        <div className='body'>
            <div className="appointment-container">

                { /* Header Section */} 
                <header className="header">
                    <h1>Appointment Booking</h1>
                </header>

                { /* Doctor Information Section */}
                <div className="doctor-card">
                    <div className="doctor-image">
                        <img src={doctor1} alt="Doctor" />
                    </div>
                    <div className="doctor-details">
                        <h2>Dr. Walter White <span className="verified-badge">✔</span></h2>
                        <p className="specialization">MBBS - General physician | 4 Years</p>
                        <p className="about">Dr. Walter White is committed to delivering comprehensive medical care, focusing on preventive medicine and effective treatment strategies.</p>
                        <p className="fee">Appointment fee: <strong>$50</strong></p>
                    </div>
                </div>

                { /* Booking Section */}
                <div className="booking-section">
                    <h3>Booking Slots</h3>
                    <div className="booking-container">
                        <div className="date-selector">
                            {dates.map((date, index) => (
                                <div
                                    key={index}
                                    className={`date ${selectedDate.toDateString() === date.toDateString() ? 'selected' : ''}`}
                                    onClick={() => handleDateClick(date)}
                                >
                                    {date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
                                    <br />
                                    <span>{date.getDate()}</span>
                                </div>
                            ))}
                        </div>

                        <div className="time-selector">
                            {timeSlots.map((time, index) => {
                                const isBooked = bookedTimes.includes(time);
                                const isMine = patientTimes.includes(time);
                                let className = "time";
                                if (isBooked && !isMine) className += " booked";
                                if (isMine) className += " patient-booked";
                                if (selectedTime === time) className += " selected";

                                return (
                                    <div
                                        key={index}
                                        className={className}
                                        onClick={() => {
                                            if (!isBooked || isMine) {
                                                setSelectedTime(time);
                                            }
                                        }}
                                        title={
                                            isMine ? "You already booked this slot"
                                            : isBooked ? "Already booked"
                                            : "Click to book"
                                        }
                                    >
                                        {time}
                                    </div>
                                );
                            })}
                        </div>

                        <button className="booking-button" onClick={handleBooking}>Book an appointment</button>

                        {/* Status Legend */}
                        <div className="status-legend">
                        <div className="status-item">
                            <span className="status-circle status-available"></span>
                            Available
                        </div>
                        <div className="status-item">
                            <span className="status-circle status-unavailable"></span>
                            Unavailable
                        </div>
                        <div className="status-item">
                            <span className="status-circle status-selected"></span>
                            Selected
                        </div>
                        <div className="status-item">
                            <span className="status-circle status-your-booking"></span>
                            Your Booking
                        </div>
                        </div>


                    </div>
                </div>

                <button className="back-button" onClick={handleBackClick}><FaAnglesLeft /> Back</button>

                {/* Show popup messages */}
                <PopupMessage type={bookingConfirmation.type} message={bookingConfirmation.message} />
            </div>
        </div>
    );
}

export default AppointmentPage;
