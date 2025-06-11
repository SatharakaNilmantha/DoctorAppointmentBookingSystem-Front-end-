import React, { useEffect, useState } from "react";
import { Card, Button } from 'react-bootstrap';
import { FiCalendar, FiClock, FiMapPin, FiCheckCircle, FiTrash } from 'react-icons/fi';
import { BsExclamationCircle } from "react-icons/bs";

import './NotificationPage.css';
import HeaderContent from '../../Components/HeaderContent/HeaderContent';

function NotificationPage() {
  const notifications = [
    {
      id: 1,
      type: 'accepted',
      doctorName: 'Dr. Sarah Wilson',
      specialization: 'Senior Cardiologist',
      date: 'Thursday, December 15, 2023',
      time: '10:30 AM (EST)',
      location: 'Medical Center, Floor 3, Room 302',
    },
    {
      id: 2,
      type: 'rejected',
      doctorName: 'Dr. Michael Lee',
      specialization: 'Orthopedic Surgeon',
      date: 'Friday, December 16, 2023',
      time: '11:00 AM (EST)',
      location: 'City Hospital, Block B, Room 205',
    },
    {
      id: 3,
      type: 'accepted',
      doctorName: 'Dr. Emily Clark',
      specialization: 'Neurologist',
      date: 'Monday, December 18, 2023',
      time: '2:00 PM (EST)',
      location: 'Neuro Care Center, Room 10',
    },
    {
      id: 4,
      type: 'rejected',
      doctorName: 'Dr. David Kim',
      specialization: 'General Physician',
      date: 'Wednesday, December 20, 2023',
      time: '9:30 AM (EST)',
      location: 'Health Plus Clinic, Room 5',
    },
    {
      id: 5,
      type: 'accepted',
      doctorName: 'Dr. Olivia Brown',
      specialization: 'Dermatologist',
      date: 'Friday, December 22, 2023',
      time: '4:15 PM (EST)',
      location: 'Skin Health Center, Room 202',
    },
  ];


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
      <div className="body-content scroll-animation duration-2 ">
        <div className="notification-container d-flex flex-wrap gap-4 justify-content-center">
          {notifications.map((item, index) => (
            <Card className="notification-card shadow" key={index}>

              <Card.Header className="bg-gradient d-flex align-items-center justify-content-between py-3">
                <div className="d-flex align-items-center gap-2">
                  <span className={`badge rounded-pill ${item.type === 'accepted' ? 'bg-success' : 'bg-danger'}`}>{item.type === 'accepted' ? 'Accepted' : 'Rejected'}</span>
                  <h5 className="mb-0 fw-semibold"> Appointment {item.type === 'accepted' ? 'Approved' : 'Rejected'}</h5>
                </div>
                <span className="text-muted small">Just now</span>
              </Card.Header>

              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-4 doctor-profile">
                  <img  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d" alt="Doctor" className="doctor-img rounded-circle border border-2 me-3"/>
                  <div>
                    <h6 className="mb-1 fw-bold">{item.doctorName}</h6>
                    <p className="text-muted mb-0 small">{item.specialization}</p> {item.type === 'accepted' && (<span className="badge bg-light text-dark">Verified ✓</span>)}
                  </div>
                </div>

                {item.type === 'rejected' && (
                  <div className="appointment-details1 align-items-center px-3">
                    <p className="p-2 text-danger"> <BsExclamationCircle /> Doctor is unavailable due to emergency<br /> schedule conflict.</p>
                  </div>
                )}

                <div className="appointment-details mb-4 ms-0">
                  <div className="list-group-item px-3 py-3 d-flex align-items-center">
                    <FiCalendar className={`${item.type === 'accepted' ? 'text-primary' : 'text-danger'} me-3 fs-5`} />
                    <div>
                      {item.type === 'accepted' && <small className="text-muted d-block">Date</small>}
                      <span className="fw-medium">{item.date}</span>
                    </div>
                  </div>

                  <div className="list-group-item px-3 py-3 d-flex align-items-center">
                    <FiClock className={`${item.type === 'accepted' ? 'text-primary' : 'text-danger'} me-3 fs-5`} />
                    <div>
                      {item.type === 'accepted' && <small className="text-muted d-block">Time</small>}
                      <span className="fw-medium">{item.time}</span>
                    </div>
                  </div>

                  <div className="list-group-item px-3 py-3 d-flex align-items-center">
                    <FiMapPin className={`${item.type === 'accepted' ? 'text-primary' : 'text-danger'} me-3 fs-5`} />
                    <div>
                      {item.type === 'accepted' && <small className="text-muted d-block">Location</small>}
                      <span className="fw-medium">{item.location}</span>
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-3">
                  <Button variant="primary" className="flex-grow-1 d-flex align-items-center justify-content-center gap-2 py-2">
                    <FiCheckCircle /> Mark as Read
                  </Button>
                  <Button variant="outline-danger" className="flex-grow-1 d-flex align-items-center justify-content-center gap-2 py-2">
                    <FiTrash /> Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

export default NotificationPage;
