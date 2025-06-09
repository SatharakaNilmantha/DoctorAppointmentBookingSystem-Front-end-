import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AppointmentPage.css';
import doctor1 from "../../images/doctors/doctors-1.jpg";
import { FaAnglesLeft } from "react-icons/fa6";
import PopupMessage from '../../Components/PopupMessage/popupMessage.jsx';

function AppointmentPage() {
    // Constants for doctor and patient IDs
    const doctorId = 2;
    const patientId = parseInt(localStorage.getItem("patientId"));

    // Generate 7 upcoming dates (excluding today)
    const generateDates = () => {
        const dates = [];
        for (let i = 1; i <= 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            dates.push(date);
        }
        return dates;
    };

    // Generate time slots depending on day of week
    const generateTimeSlotsForDay = (dayOfWeek) => {
        let start, end, interval = 30;

        // Sunday: 11am to 3pm
        if (dayOfWeek === 0) {
            start = new Date(0, 0, 0, 11, 0);
            end = new Date(0, 0, 0, 15, 0);
        }
        // Saturday: 9am to 12pm
        else if (dayOfWeek === 6) {
            start = new Date(0, 0, 0, 9, 0);
            end = new Date(0, 0, 0, 12, 0);
        }
        // Weekdays: 10am to 4pm
        else {
            start = new Date(0, 0, 0, 10, 0);
            end = new Date(0, 0, 0, 16, 0);
        }

        const times = [];
        let currentTime = new Date(start);

        // Generate slots every 30 minutes
        while (currentTime < end) {
            times.push({
                label: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
                value: currentTime.toTimeString().slice(0, 5) // "HH:mm" 24-hour format
            });
            currentTime.setMinutes(currentTime.getMinutes() + interval);
        }
        return times;
    };


    const dates = generateDates();

    // States
    const [selectedDate, setSelectedDate] = useState(dates[0]);
    const [selectedTime, setSelectedTime] = useState(null);
    const [bookingConfirmation, setBookingConfirmation] = useState({});
    const [bookedAppointments, setBookedAppointments] = useState([]);
    const [patientAppointments, setPatientAppointments] = useState([]);

    // Fetch doctor and patient appointment data on mount
    useEffect(() => {
        fetchBookedAppointments();
        fetchPatientAppointments();
    }, []);

    // Fetch all booked appointments for the doctor
    const fetchBookedAppointments = () => {
        axios.get(`http://localhost:8080/api/appointments/getAppointmentsByDoctor/${doctorId}`)
            .then(res => setBookedAppointments(res.data))
            .catch(err => console.error("Error fetching doctor appointments:", err));
    };

    // Fetch patient appointments
    const fetchPatientAppointments = () => {
        axios.get(`http://localhost:8080/api/appointments/getAppointmentsByPatient/${patientId}`)
            .then(res => setPatientAppointments(res.data))
            .catch(err => console.error("Error fetching patient appointments:", err));
    };

    // Get booked/patient times for selected date in HH:mm format
    const getTimesByCondition = (appointments, date) => {
        return appointments
            .filter(appt => new Date(appt.appointmentDateTime).toDateString() === date.toDateString())
            .map(appt => {
                const d = new Date(appt.appointmentDateTime);
                return d.toTimeString().slice(0, 5); // Extract "HH:mm"
            });
    };


    const bookedTimes = getTimesByCondition(bookedAppointments, selectedDate);
    const patientTimes = getTimesByCondition(
        patientAppointments.filter(appt => parseInt(appt.doctorId) === doctorId),
        selectedDate
    );

    // All time slots for selected day
    const timeSlots = generateTimeSlotsForDay(selectedDate.getDay());

    // Handle time slot click
    const handleTimeClick = (timeValue) => {
        if (!bookedTimes.includes(timeValue) || patientTimes.includes(timeValue)) {
            setSelectedTime(timeValue);
        }
    };

    // Handle date selection
    const handleDateClick = (date) => {
        setSelectedDate(date);
        setSelectedTime(null);
    };

    // Book appointment
    const handleBooking = () => {
        setBookingConfirmation({ type: '', message: "" });

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

            // Final format: 2025-06-10T14:30:00
            const appointmentDateTime = `${yyyy}-${mm}-${dd}T${hh}:${min}:00`;

            const appointmentData = {
                patientId,
                doctorId,
                appointmentDateTime,
                status: "pending"
            };

            // Post to backend
            axios.post("http://localhost:8080/api/appointments/saveAppointment", appointmentData)
                .then(() => {
                    const formattedDate = dt.toLocaleDateString('en-US', {
                        weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'
                    });
                    const formattedTime = dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

                     setBookingConfirmation({ type: 'success', message: `Appointment booked on ${formattedDate} at ${formattedTime}`});

                    // Refresh bookings and reset state
                    fetchBookedAppointments();
                    fetchPatientAppointments();
                    setSelectedTime(null);
                })
                .catch(error => {
                    setBookingConfirmation({
                        type: 'error',
                        message: error.response?.data || "Booking failed. Try again."
                    });
                });
        } else {
            setBookingConfirmation({
                type: 'warning',
                message: "Please select both date and time."
            });
        }
    };

    // Back button navigation
    const navigate = useNavigate();
    const handleBackClick = () => navigate(-1);

    return (
        <div className='body'>
            <div className="appointment-container">


                <header className="header">
                    <h1>Appointment Booking</h1>
                </header>

                {/* Doctor Info */}
                <div className="doctor-card">
                    <div className="doctor-image">
                        <img src={doctor1} alt="Doctor" />
                    </div>
                    <div className="doctor-details">
                        <h2>Dr. Walter White <span className="verified-badge">✔</span></h2>
                        <p className="specialization">MBBS - General physician | 4 Years</p>
                        <p className="about">Dr. Walter White is committed to delivering comprehensive medical care.</p>
                        <p className="fee">Appointment fee: <strong>$50</strong></p>
                    </div>
                </div>

                {/* Booking slots */}
                <div className="booking-section">
                    <h3>Booking Slots</h3>
                    <div className="booking-container">

                        {/* Date Selector */}
                        <div className="date-selector">
                            {dates.map((date, index) => (
                                <div   key={index}  className={`date ${selectedDate.toDateString() === date.toDateString() ? 'selected' : ''}`}  onClick={() => handleDateClick(date)} >
                                    {date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
                                    <br />
                                    <span>{date.getDate()}</span>
                                </div>
                            ))}
                        </div>

                        {/* Time Slot Selector */}
                        <div className="time-selector">
                            {timeSlots.map(({ label, value }, index) => {
                                const isBooked = bookedTimes.includes(value);
                                const isMine = patientTimes.includes(value);
                                let className = "time";
                                if (isBooked && !isMine) className += " booked";
                                if (isMine) className += " patient-booked";
                                if (selectedTime === value) className += " selected";

                                return (
                                    <div key={index} className={className} onClick={() => handleTimeClick(value)} title={ isMine ? "You already booked this slot" : isBooked ? "Already booked"  : "Click to book" }> {label} </div>
                                );
                            })}
                        </div>

                        <button className="booking-button" onClick={handleBooking}>Book an appointment</button>

                        {/* Legend */}
                        <div className="status-legend">
                            <div className="status-item"><span className="status-circle status-available"></span>Available</div>
                            <div className="status-item"><span className="status-circle status-unavailable"></span>Unavailable</div>
                            <div className="status-item"><span className="status-circle status-selected"></span>Selected</div>
                            <div className="status-item"><span className="status-circle status-your-booking"></span>Your Booking</div>
                        </div>
                    </div>
                </div>

                {/* Back button */}
                <button className="back-button" onClick={handleBackClick}><FaAnglesLeft /> Back</button>

                {/* Popup message for success/error */}
                <PopupMessage type={bookingConfirmation.type} message={bookingConfirmation.message} />
            </div>
        </div>
    );
}

export default AppointmentPage;
