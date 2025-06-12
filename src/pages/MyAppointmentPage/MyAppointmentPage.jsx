import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyAppointmentPage.css";
import HeaderContent from "../../Components/HeaderContent/HeaderContent.jsx";
import BodyContent from "../../Components/BoadyContent/BodyContent.jsx";


function MyAppointmentPage() {
  const [appointments, setAppointments] = useState([]);
  const userId = localStorage.getItem("patientId") || "";

  // Fetch appointments on component mount
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/appointments/getAppointments")
      .then(async (response) => {
        if (response.data && Array.isArray(response.data)) {
          // Set today's date at 00:00:00 for filtering
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          // Filter appointments: patientId matches, status pending or accepted, date >= today
          const filteredAppointments = response.data.filter((appointment) => {
            const appointmentDate = new Date(appointment.appointmentDateTime);
            appointmentDate.setHours(0, 0, 0, 0);

            return (
              appointment.patientId == userId &&
              (appointment.status === "pending" || appointment.status === "accepted") &&
              appointmentDate >= today
            );
          });

          // Sort appointments in ascending order by appointmentDateTime
          filteredAppointments.sort(
            (a, b) => new Date(a.appointmentDateTime) - new Date(b.appointmentDateTime)
          );

          // Fetch doctor details for each filtered appointment
          const appointmentsWithDoctors = await Promise.all(
            filteredAppointments.map(async (appointment) => {
              try {
                const doctorResponse = await axios.get(
                  `http://localhost:8080/api/doctors/${appointment.doctorId}`
                );
                const doctorDetails = doctorResponse.data;
                return { ...appointment, doctorDetails };
              } catch (error) {
                console.error(
                  `Error fetching doctor details for doctorId ${appointment.doctorId}:`,
                  error
                );
                return { ...appointment, doctorDetails: null };
              }
            })
          );

          setAppointments(appointmentsWithDoctors);
        }
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  }, [userId]);

  // Function to handle appointment cancellation
  const handleCancelAppointment = async (appointmentId, appointmentDateTime) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const appointmentDate = new Date(appointmentDateTime);
    appointmentDate.setHours(0, 0, 0, 0);

    if (appointmentDate.getTime() === today.getTime()) {
      alert("⚠️ You cannot cancel today's appointment.");
      return;
    }

    const isConfirmed = window.confirm("Are you sure you want to cancel this appointment?");
    if (isConfirmed) {
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.appointmentId !== appointmentId)
      );

      try {
        const response = await axios.delete(
          `http://localhost:8080/api/appointments/${appointmentId}`
        );
        if (response.status !== 200) {
          throw new Error("Failed to cancel appointment");
        }
      } catch (error) {
        console.error("Error canceling appointment:", error);
      }
    }
  };

 // This effect sets up an IntersectionObserver to add a class for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll(".scroll-animation");
    animatedElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <HeaderContent />
      <BodyContent>
        <div className="body-content scroll-animation duration-2">
          <h1 className="textunderline">My Appointments</h1>
          <p className="appointment-caption">
            This page shows your <strong>accepted</strong> and <strong>pending</strong> doctor
            consultations scheduled for today and upcoming dates. Please review and prepare
            accordingly.
          </p>
          {appointments.length > 0 ? (
            <div className="appointment-card-container ">
              {appointments.map((appointment, index) => (
                <div
                  key={index}
                  className={`appointment-card ${
                    appointment.status === "accepted"
                      ? "accepted-card"
                      : appointment.status === "pending"
                      ? "pending-card"
                      : ""
                  }`}
                >
                  <img
                    src={`http://localhost:8080/api/doctors/image/${appointment.doctorId}`}
                    className="doctor-image"
                    alt="Doctor"
                  />
                  <div className="appointment-details">
                    <div className="row">
                      <div>
                        <h2>{appointment.doctorDetails?.fullName || "Doctor"}</h2>
                        <p>
                          <strong>Doctor Title:</strong> {appointment.doctorDetails?.title}
                        </p>
                      </div>
                      <div>
                        <button className="type">
                          <strong>{appointment.type}</strong>
                        </button>
                      </div>
                    </div>
                    <hr />
                    <div className="row1">
                      <p>
                        <strong>Date & Time:</strong>{" "}
                        {appointment.appointmentDateTime
                          ? new Date(appointment.appointmentDateTime).toLocaleDateString() +
                            " " +
                            new Date(appointment.appointmentDateTime).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })
                          : "N/A"}
                      </p>
                      <p><span className={`state ${appointment.status}-status`}>{appointment.status}</span></p><p>
                        <button className="cancel-appointment"onClick={() =>handleCancelAppointment(appointment.appointmentId, appointment.appointmentDateTime)}>Cancel Appointment</button>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="messagenotfound">No upcoming appointments found.</p>
          )}
        </div>
      </BodyContent>
    </>
  );
}

export default MyAppointmentPage;
