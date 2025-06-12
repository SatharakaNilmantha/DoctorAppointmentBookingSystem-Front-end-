import React, { useEffect, useState } from "react";
import { Card, Button, Badge } from 'react-bootstrap';
import { FiCalendar, FiClock, FiMapPin, FiCheckCircle, FiTrash } from 'react-icons/fi';
import { BsExclamationCircle } from "react-icons/bs";
import axios from 'axios';
import './NotificationPage.css';
import HeaderContent from '../../Components/HeaderContent/HeaderContent';

function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const patientId = localStorage.getItem("patientId");
 
  // set the localstorage item for unread count
  useEffect(() => {
    localStorage.setItem('unreadCount', unreadCount);
    console.log("Unread count updated:", unreadCount);
  }, [unreadCount]);

  // Check if patientId is available
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Fetch notifications for the patient
        const notificationsResponse = await axios.get(`http://localhost:8080/api/notification/getNotificationByPatient/${patientId}`);

        const filteredNotifications = notificationsResponse.data.filter(n => n.status !== 'deleted');
        // Sort notifications by dateTime (newest first)
        const sortedNotifications = [...filteredNotifications].sort((a, b) => {
          return new Date(b.dateTime) - new Date(a.dateTime);
        });

        // Count unread notifications
        const unread = sortedNotifications.filter(n => n.status === 'unread').length;
        setUnreadCount(unread);

        // For each notification, fetch doctor details
        const notificationsWithDoctorDetails = await Promise.all(
          sortedNotifications.map(async (notification) => {
            try {
              const doctorResponse = await axios.get(`http://localhost:8080/api/doctors/${notification.doctorId}`);
              return {
                ...notification,
                doctorName: doctorResponse.data.fullName,
                specialization: doctorResponse.data.title,
                appointmentdate: formatDate(notification.appointmentDateTime),
                appointmenttime: formatTime(notification.appointmentDateTime),
                location: "Medical Center, Floor 3, Room 302"
              };
            } catch (error) {
              console.error(`Error fetching doctor details for doctorId ${notification.doctorId}:`, error);
              return {
                ...notification,
                doctorName: "Unknown Doctor",
                specialization: "Unknown Specialization",
                appointmentdate: formatDate(notification.appointmentDateTime),
                appointmenttime: formatTime(notification.appointmentDateTime),
                location: "Unknown Location"
              };
            }
          })
        );
        
        setNotifications(notificationsWithDoctorDetails);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setError("Failed to load notifications. Please try again later.");
      }
    };

    if (patientId) {
      fetchNotifications();
    } else {
      setError("Patient ID not found. Please log in again.");
    }

    // Scroll animation setup
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
  }, [patientId]);

  // Helper function to format date
  const formatDate = (dateTime) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateTime).toLocaleDateString('en-US', options);
  };

  // Helper function to format time
  const formatTime = (dateTime) => {
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    return new Date(dateTime).toLocaleTimeString('en-US', options) + ' (IST)';
  };

  // Helper function to format the notification time
  const formatNotificationTime = (dateTime) => {
    const now = new Date();
    const notificationDate = new Date(dateTime);
    const diffInSeconds = Math.floor((now - notificationDate) / 1000);
    
    if (diffInSeconds < 60) {
      return "just now";
    }

    const formattedTime = notificationDate.toLocaleString('en-US', {
      timeZone: 'Asia/Colombo',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    const [datePart, timePart] = formattedTime.split(', ');
    const [month, day, year] = datePart.split('/');
    const [time, period] = timePart.split(' ');
    
    return `${day}/${month}/${year}, ${time} ${period.toUpperCase().replace('.', '')}`;
  };


  const handleMarkAsRead = async (notificationId) => {
    try {
      await axios.put(`http://localhost:8080/api/notification/statusUpdate/${notificationId}`, {
        status: "read"
      });
      
      const updatedNotifications = notifications.map(n => 
        n.notificationId === notificationId ? { ...n, status: 'read' } : n
      );
      
      setNotifications(updatedNotifications);
      
      // Calculate and update unread count immediately
      const newUnreadCount = updatedNotifications.filter(n => n.status === 'unread').length;
      setUnreadCount(newUnreadCount);
      localStorage.setItem('unreadCount', newUnreadCount); // Update localStorage immediately
    } catch (error) {
      console.error("Error marking notification as read:", error);
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


  const handleDeleteNotification = async (notificationId) => {
    // Show confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to delete this notification?");
    
    if (!isConfirmed) {
      return; // Exit if user cancels
    }

    try {
      // Optimistically update UI first
      const updatedNotifications = notifications.filter(n => n.notificationId !== notificationId);
      setNotifications(updatedNotifications);
      
      // Update unread count if needed
      const deletedNotification = notifications.find(n => n.notificationId === notificationId);
      if (deletedNotification?.status === 'unread') {
        const newUnreadCount = unreadCount - 1;
        setUnreadCount(newUnreadCount);
        localStorage.setItem('unreadCount', newUnreadCount);
      }

      // Send API request to update status
      await axios.put(`http://localhost:8080/api/notification/statusUpdate/${notificationId}`, {
        status: "deleted"
      });

    } catch (error) {
      console.error("Error deleting notification:", error);
      // Revert UI changes if API fails
      setNotifications(notifications);
      if (deletedNotification?.status === 'unread') {
        setUnreadCount(unreadCount);
        localStorage.setItem('unreadCount', unreadCount);
      }
    }
  };

  if (error) {
    return (
      <>
        <HeaderContent />
        <div className="body-content d-flex justify-content-center align-items-center">
          <div className="alert alert-danger">{error}</div>
        </div>
      </>
    );
  }

  if (notifications.length === 0 && !error) {
    return (
      <>
        <HeaderContent />
        <div className="body-content d-flex justify-content-center align-items-center">
          <div className="alert alert-info">No notifications found.</div>
        </div>
      </>
    );
  }

  return (
    <>
      <HeaderContent />
      <div className="body-content">

        <div className="notification-container d-flex flex-wrap gap-4 justify-content-center">

        
          {notifications.map((item, index) => (
            <Card  className={`notification-card shadow ${item.status === 'unread' ? 'unread' : ''}`} key={index}>
              <Card.Header className={`bg-gradient d-flex align-items-center justify-content-between py-3 ${item.status === 'unread' ? 'unread-header' : ''}`} 
                style={{ backgroundColor: item.type === 'accepted' ? '#eaffed' : '#ffe3e6' }}>
                <div className="d-flex align-items-center gap-2">
                  <span className={`badge rounded-pill ${item.type === 'accepted' ? 'bg-success' : 'bg-danger'}`}>
                    {item.type === 'accepted' ? 'Accepted' : 'Rejected'}
                  </span>
                  <h5 className="mb-0 fw-semibold">Appointment {item.type === 'accepted' ? 'Approved' : 'Rejected'}</h5>
                </div>
                <div className="text-muted dateTime ms-3">
                  {formatNotificationTime(item.dateTime)}
                </div>
              </Card.Header>

              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-4 doctor-profile">
                  <img 
                    src={`http://localhost:8080/api/doctors/image/${item.doctorId}`} 
                    alt="Doctor" 
                    className="doctor-img rounded-circle border border-2 me-3"
                  />
                  <div>
                    <h6 className="mb-1 fw-bold">{item.doctorName}</h6>
                    <p className="text-muted mb-0 small">{item.specialization}</p>
                    {item.type === 'accepted' && (<span className="badge bg-light text-dark">Verified ✓</span>)}
                  </div>
                </div>

                {item.type === 'rejected' && (
                  <div className="appointment-details1 align-items-center px-3">
                    <p className="p-2 text-danger"> 
                      <BsExclamationCircle /> Doctor is unavailable due to emergency<br /> schedule conflict.
                    </p>
                  </div>
                )}

                <div className="appointment-details mb-4 ms-0">
                  <div className="list-group-item px-3 py-3 d-flex align-items-center">
                    <FiCalendar className={`${item.type === 'accepted' ? 'text-primary' : 'text-danger'} me-3 fs-5`} />
                    <div>
                      {item.type === 'accepted' && <small className="text-muted d-block">Date</small>}
                      <span className="fw-medium">{item.appointmentdate}</span>
                    </div>
                  </div>

                  <div className="list-group-item px-3 py-3 d-flex align-items-center">
                    <FiClock className={`${item.type === 'accepted' ? 'text-primary' : 'text-danger'} me-3 fs-5`} />
                    <div>
                      {item.type === 'accepted' && <small className="text-muted d-block">Time</small>}
                      <span className="fw-medium">{item.appointmenttime}</span>
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
                <div className="row g-2">
                  <div className="col-md-6">
                    <Button 
                      variant={item.status === 'unread' ? 'primary' : 'outline-secondary'}  
                      className="w-100 d-flex align-items-center justify-content-center gap-2 py-2" 
                      onClick={() => handleMarkAsRead(item.notificationId)} 
                      disabled={item.status === 'read'}>
                      <FiCheckCircle /> 
                      {item.status === 'unread' ? 'Mark as Read' : 'Already Read'}
                    </Button>
                  </div>
                  <div className="col-md-6">
                    <Button 
                      variant="outline-danger" 
                      className="w-100 d-flex align-items-center justify-content-center gap-2 py-2" 
                      onClick={() => handleDeleteNotification(item.notificationId)}>
                      <FiTrash /> Delete
                    </Button>
                  </div>
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