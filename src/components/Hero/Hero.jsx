import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './Hero.css';
import nature_trip_1 from '../../assets/nature_trip_1.jpg';
import nature_trip_2 from '../../assets/nature_trip_3.jpg';
import nature_trip_3 from '../../assets/nature_travel_8.jpg';
import logo from '../../assets/2.png';

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const location = useLocation();
  
  const images = [
    nature_trip_1,
    nature_trip_2,
    nature_trip_3
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleExploreTours = () => {
    if (location.pathname === '/') {
      const servicesSection = document.querySelector('.services');
      if (servicesSection) {
        servicesSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  const handleLearnMore = () => {
    if (location.pathname === '/') {
      const aboutSection = document.querySelector('.about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="hero" className="hero d-flex align-items-center">
      {images.map((image, index) => (
        <div
          key={index}
          className={`slide ${index === currentImageIndex ? 'active' : ''}`}
          style={{ 
            backgroundImage: `url(${image})`,
            transform: `translateX(${(index - currentImageIndex) * 100}%)`,
            transition: 'all 1s ease-in-out'
          }}
        />
      ))}
      <div className="hero-overlay"></div>
      <Container>
        <Row className="align-items-center">
          <Col lg={6} md={12} sm={12} className="text-white">
            <div className="hero-content" data-aos="fade-up">
              <h1 className="display-4 fw-bold mb-4 hero-title">
                We Don't Sell Trips. We Plan Them Like It's Ours.
              </h1>
              <p className="lead mb-5 hero-text">
                Think of us as the family member who knows how to plan everything — sensibly.
              </p>
              <div className="hero-buttons">
                <button 
                  className="btn btn-light btn-lg me-3 hover-scale"
                  onClick={handleExploreTours}
                >
                  Explore
                </button>
                <button 
                  className="btn btn-outline-light btn-lg hover-scale"
                  onClick={handleLearnMore}
                >
                  Learn More
                </button>
              </div>
            </div>
          </Col>
          
        </Row>
      </Container>
    </section>
  );
};

export default Hero;