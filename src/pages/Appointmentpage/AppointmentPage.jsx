import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './AppointmentPage.css';
import { FaAnglesLeft } from "react-icons/fa6";
import PopupMessage from '../../Components/PopupMessage/popupMessage.jsx';

function AppointmentPage() {
    const patientId = parseInt(localStorage.getItem("patientId"));
    const { id } = useParams();
    const doctorId = id;
    const parsedDoctorId = parseInt(doctorId);
    const [doctorDetails, setDoctorDetails] = useState(null);


    // Fetch doctor details using the doctorId from URL params
    useEffect(() => {
        axios.get(`http://localhost:8080/api/doctors/${parsedDoctorId}`)
            .then((res) => setDoctorDetails(res.data))
            .catch((err) => console.error("Error fetching doctor details", err));
    }, [parsedDoctorId]);

    // Generate next 7 dates starting from tomorro
    const generateDates = () => {
        const dates = [];
        for (let i = 1; i <= 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            dates.push(date);
        }
        return dates;
    };

    // Generate time slots for a given day of the week based on doctor's schedule
    const generateTimeSlotsForDay = (dayOfWeek) => {
        if (!doctorDetails) return [];

        const parseTime = (timeStr) => {
            const [h, m, s] = timeStr.split(':').map(Number);
            const now = new Date();
            now.setHours(h, m, s || 0, 0);
            return new Date(now);
        };

        let start, end;
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            start = parseTime(doctorDetails.weekendStartTime);
            end = parseTime(doctorDetails.weekendEndTime);
        } else {
            start = parseTime(doctorDetails.shiftStartTime);
            end = parseTime(doctorDetails.shiftEndTime);
        }

        const times = [];
        const current = new Date(start);
        while (current < end) {
            times.push({
                label: current.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
                value: current.toTimeString().slice(0, 5)
            });
            current.setMinutes(current.getMinutes() + 30);
        }
        return times;
    };


    const dates = generateDates();
    const [selectedDate, setSelectedDate] = useState(dates[0]);
    const [selectedTime, setSelectedTime] = useState(null);
    const [bookingConfirmation, setBookingConfirmation] = useState({});
    const [bookedAppointments, setBookedAppointments] = useState([]);
    const [patientAppointments, setPatientAppointments] = useState([]);

    // Fetch booked appointments and patient appointments on component mount
    useEffect(() => {
        fetchBookedAppointments();
        fetchPatientAppointments();
    }, []);

    // Function to fetch booked appointments for the doctor
    const fetchBookedAppointments = () => {
        axios.get(`http://localhost:8080/api/appointments/getAppointmentsByDoctor/${doctorId}`)
            .then(res => setBookedAppointments(res.data))
            .catch(err => console.error("Error fetching doctor appointments:", err));
    };

    // Function to fetch appointments booked by the patient
    const fetchPatientAppointments = () => {
        axios.get(`http://localhost:8080/api/appointments/getAppointmentsByPatient/${patientId}`)
            .then(res => setPatientAppointments(res.data))
            .catch(err => console.error("Error fetching patient appointments:", err));
    };

    // Function to get booked times for a specific date
    // and filter patient appointments by doctorId
    const getTimesByCondition = (appointments, date) => {
        return appointments
            .filter(appt => new Date(appt.appointmentDateTime).toDateString() === date.toDateString())
            .map(appt => new Date(appt.appointmentDateTime).toTimeString().slice(0, 5));
    };

    // Get booked times for the selected date and filter patient appointments by doctorId
    // This will return an array of time strings in HH:MM format
    const bookedTimes = getTimesByCondition(bookedAppointments, selectedDate);
    const patientTimes = getTimesByCondition(
        patientAppointments.filter(appt => parseInt(appt.doctorId) === parsedDoctorId),
        selectedDate
    );

    const timeSlots = generateTimeSlotsForDay(selectedDate.getDay());


    // Handle time selection and booking logic
    // If the time is already booked by another patient, it won't be selectable
    // If the time is booked by the patient, it will be selectable but not clickable
    // If the time is available, it will be selectable and clickable
    // If the time is selected, it will be highlighted
    const handleTimeClick = (timeValue) => {
        if (!bookedTimes.includes(timeValue) || patientTimes.includes(timeValue)) {
            setSelectedTime(timeValue);
        }
    };

    // Handle date selection and reset selected time
    const handleDateClick = (date) => {
        setSelectedDate(date);
        setSelectedTime(null);
    };

   // Handle booking logic
   // This function will be called when the user clicks the "Book an appointment" button
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

            const appointmentDateTime = `${yyyy}-${mm}-${dd}T${hh}:${min}:00`;

            const appointmentData = {
                patientId,
                doctorId: parsedDoctorId,
                appointmentDateTime,
                status: "pending"
            };

            axios.post("http://localhost:8080/api/appointments/saveAppointment", appointmentData)
                .then(() => {
                    const formattedDate = dt.toLocaleDateString('en-US', {
                        weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'
                    });
                    const formattedTime = dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

                    setBookingConfirmation({
                        type: 'success',
                        message: `Appointment booked on ${formattedDate} at ${formattedTime}`
                    });

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

    const navigate = useNavigate();
    const handleBackClick = () => navigate(-1);

    return (
        <div className='body'>
            <div className="appointment-container">

                <header className="header">
                    <h1>Appointment Booking</h1>
                </header>

                {/* Display doctor details if available */}
                {doctorDetails && (
                    <div className="doctor-card">
                        <div className="doctorimage">
                            <img src={`http://localhost:8080/api/doctors/image/${doctorDetails.doctorId}`} alt="Doctor" />
                        </div>
                        <div className="doctor-details">
                            <h2>{doctorDetails.fullName} <span className="verified-badge">✔</span></h2>
                            <p className="specialization">{doctorDetails.title} <span className="verified-badge1">|</span> {doctorDetails.degree}</p>
                            <p className="about">{doctorDetails.description}</p>
                            <p className="fee">Appointment fees: <strong>$ {doctorDetails.fees}</strong></p>
                        </div>
                    </div>
                )}

                { /* Booking section with date and time selection */}
                <div className="booking-section">
                    <h3>Booking Slots</h3>
                    <div className="booking-container">
                        <div className="date-selector">
                            {dates.map((date, index) => (
                                <div key={index}
                                    className={`date ${selectedDate.toDateString() === date.toDateString() ? 'selected' : ''}`}
                                    onClick={() => handleDateClick(date)}>
                                    {date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
                                    <br />
                                    <span>{date.getDate()}</span>
                                </div>
                            ))}
                        </div>

                        <div className="time-selector">
                            {timeSlots.map(({ label, value }, index) => {
                                const isBooked = bookedTimes.includes(value);
                                const isMine = patientTimes.includes(value);
                                let className = "time";
                                if (isBooked && !isMine) className += " booked";
                                if (isMine) className += " patient-booked";
                                if (selectedTime === value) className += " selected";

                                return (
                                    <div key={index}
                                        className={className}
                                        onClick={() => handleTimeClick(value)}
                                        title={isMine ? "You already booked this slot" : isBooked ? "Already booked" : "Click to book"}>
                                        {label}
                                    </div>
                                );
                            })}
                        </div>

                        <button className="booking-button" onClick={handleBooking}>Book an appointment</button>

                        <div className="status-legend">
                            <div className="status-item"><span className="status-circle status-available"></span>Available</div>
                            <div className="status-item"><span className="status-circle status-unavailable"></span>Unavailable</div>
                            <div className="status-item"><span className="status-circle status-selected"></span>Selected</div>
                            <div className="status-item"><span className="status-circle status-your-booking"></span>Your Booking</div>
                        </div>
                    </div>
                </div>

                <button className="back-button" onClick={handleBackClick}><FaAnglesLeft /> Back</button>
                <PopupMessage type={bookingConfirmation.type} message={bookingConfirmation.message} />
            </div>
        </div>
    );
}

export default AppointmentPage;
