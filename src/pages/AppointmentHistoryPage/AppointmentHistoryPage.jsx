import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AppointmentHistoryPage.css";
import HeaderContent from "../../Components/HeaderContent/HeaderContent.jsx";
import BodyContent from "../../Components/BoadyContent/BodyContent.jsx";

import { FaCheckCircle, FaTimesCircle, FaHourglassHalf } from "react-icons/fa";



function AppointmentHistoryPage() {
  const [appointments, setAppointments] = useState([]);
  const userId = localStorage.getItem("patientId") || "";

useEffect(() => {
  axios
    .get("http://localhost:8080/api/appointments/getAppointments")
    .then(async (response) => {
      if (response.data && Array.isArray(response.data)) {
        const today = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);

        const filteredAppointments = response.data
          .filter((appointment) => {
            if (appointment.patientId != userId) return false;
            if (!appointment.appointmentDateTime) return false;

            const appointmentDate = new Date(appointment.appointmentDateTime);
            return appointmentDate >= sevenDaysAgo && appointmentDate <= today;
          })
          .sort((a, b) => new Date(b.appointmentDateTime) - new Date(a.appointmentDateTime)); // sort descending

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



const getStatusIcon = (status) => {
  switch (status) {
    case "accepted":
      return <FaCheckCircle className="status-icon accepted-icon" />;
    case "canceled":
      return <FaTimesCircle className="status-icon canceled-icon" />;
    case "pending":
      return <FaHourglassHalf className="status-icon pending-icon" />;
    default:
      return null;
  }
};

  return (
    <>
      <HeaderContent />
      <BodyContent>
        <div className="body-content scroll-animation duration-2">
          <h1 className="textunderline">Appointment History</h1> 
          <p className="appointment-caption"> This page shows your <strong>accepted</strong>, <strong>pending</strong>, and <strong>rejected</strong>  doctor consultations from the <strong>past 7 days</strong>. Review your recent appointment activity below.</p>
          {appointments.length > 0 ? (
            <div className="appointment-card-container">
              {appointments.map((appointment, index) => (
                <div
                  key={index}
                  className={`appointment-card ${
                    appointment.status === "accepted"
                      ? "accepted-card"
                      : appointment.status === "pending"
                      ? "pending-card"
                      : appointment.status === "canceled"
                      ? "canceled-card"
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
                          <strong>Doctor Title:</strong>{" "}
                          {appointment.doctorDetails?.title}
                        </p>
                      </div>
                      <div>
                      <button>
                        <strong>{getStatusIcon(appointment.status)}</strong>
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
                       <p><div className={`state1 ${appointment.status}-status1`}>{appointment.status === "canceled" ? "rejected" : appointment.status}</div></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="messagenotfound">No appointments found.</p>
          )}
        </div>
      </BodyContent>
    </>
  );
}

export default AppointmentHistoryPage;
