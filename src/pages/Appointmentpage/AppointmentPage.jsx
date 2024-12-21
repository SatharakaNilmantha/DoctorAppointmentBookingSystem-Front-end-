import React, { useState } from 'react';
import './AppointmentPage.css'

function AppointmentPage() {

    const today = new Date();

  // Generate dates for the next 7 days
  const generateDates = () => {
      const dates = [];
      for (let i = 0; i < 7; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() + i);
          dates.push(date);
      }
      return dates;
  };

  // Generate time slots based on the day of the week
  const generateTimeSlotsForDay = (dayOfWeek) => {
      let start, end, interval = 30;
      
      // Define time slots for each day (example)
      switch(dayOfWeek) {
          case 0: // Sunday
              start = new Date(0, 0, 0, 11, 0);
              end = new Date(0, 0, 0, 15, 0);
              break;
          case 6: // Saturday
              start = new Date(0, 0, 0, 9, 0);
              end = new Date(0, 0, 0, 12, 0);
              break;
          default: // Weekdays
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
  const [bookingConfirmation, setBookingConfirmation] = useState("");

  // Generate time slots based on the selected date's day of the week
  const timeSlots = generateTimeSlotsForDay(selectedDate.getDay());

  const handleTimeClick = (time) => {
      setSelectedTime(time);
  };

  const handleBooking = () => {
      if (selectedDate && selectedTime) {
          const formattedDate = selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
          setBookingConfirmation(`Appointment booked on ${formattedDate} at ${selectedTime}`);
      } else {
          setBookingConfirmation("Please select both a date and time.");
      }
  };







  return (
    <div className="appointment-container">
        <header className="header">
            <h1>Appointment Booking</h1>
        </header>

        <div className="doctor-card">
            <div className="doctor-image">
            <img
                src="https://via.placeholder.com/150"
                alt="Doctor"
            />
            </div>
            <div className="doctor-details">
            <h2>Dr. Richard James <span className="verified-badge">✔</span></h2>
            <p className="specialization">MBBS - General physician | 4 Years</p>
            <p className="about">
                Dr. Davis is committed to delivering comprehensive medical care, focusing on preventive medicine and effective treatment strategies.
            </p>
            <p className="fee">Appointment fee: <strong>$50</strong></p>
            </div>
        </div>

        <div className="booking-section">
            <h3>Booking Slots</h3>
            <div className="booking-container">
            <div className="date-selector">
                {dates.map((date, index) => (
                    <div
                        key={index}
                        className={`date ${selectedDate.toDateString() === date.toDateString() ? 'selected' : ''}`}
                        onClick={() => setSelectedDate(date)}
                    >
                        {date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
                        <br />
                        <span>{date.getDate()}</span>
                    </div>
                ))}
            </div>

            <div className="time-selector">
                {timeSlots.map((time, index) => (
                    <div
                        key={index}
                        className={`time ${selectedTime === time ? 'selected' : ''}`}
                        onClick={() => handleTimeClick(time)}
                    >
                        {time}
                    </div>
                ))}
            </div>

            <button className="book-button" onClick={handleBooking}>
                Book an appointment
            </button>

            {bookingConfirmation && (
                <div className="confirmation-message">
                    {bookingConfirmation}
                </div>
            )}
        </div>
        </div>
    </div>
  )
}

export default AppointmentPage