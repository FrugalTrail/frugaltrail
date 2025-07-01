import React, { useState, useRef } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './Services.css';

const Services = () => {
  const [showAll, setShowAll] = useState(false);
  const servicesRef = useRef(null);

  const services = [
    {
      icon: "🌍",
      title: "International Trip Planning",
      description: "Personalized itineraries across Europe, Southeast Asia & more.",
      features: ["Custom day-wise plans based on your goals", "Assistance with flight & hotel coordination", "Suggestions within your budget"]
    },
    {
      icon: "🏔️",
      title: "Domestic Travel Coordination",
      description: "Help with travel plans across India — from Himachal to Kerala.",
      features: ["Budget-focused options and local experiences", "Destination and itinerary suggestions", "Local transport ideas and tips"]
    },
    {
      icon: "🛂",
      title: "Visa Application Guidance",
      description: "We simplify visa paperwork and process.",
      features: ["Cover letter & itinerary drafts", "Documentation checklist and review", "Specific help for Schengen, Singapore, etc."]
    },
    {
      icon: "✈️🏨",
      title: "Hotel & Flight Booking Coordination",
      description: "We help you book smart — with your own card.",
      features: ["Suggest best-value hotels and flights", "Share exact booking links", "You remain in control of payments"]
    },
    {
      icon: "👨‍👩‍👧‍👦",
      title: "Group & Family Travel Planning",
      description: "Trips planned for 3 to 15 people without confusion.",
      features: ["Shared itinerary docs for everyone", "Common activity planning", "Simple coordination across families"]
    },
    {
      icon: "💑",
      title: "Honeymoon / Couple Itinerary Support",
      description: "Not a 'package' — a plan based on your vibe.",
      features: ["Peaceful, scenic, or adventurous? You decide", "Matching destinations to mood and budget", "Focus on comfort, privacy, and ease"]
    },
    {
      icon: "🚕",
      title: "Local Transport Planning",
      description: "Getting around made simple.",
      features: ["Cab/van suggestions", "Local pass tips (metro, MRT, etc.)", "Route plans with time estimates"]
    },
    {
      icon: "💰",
      title: "Budget Optimization & Destination Suggestion",
      description: "Tell us your budget — we suggest where to go.",
      features: ["Clear answers: What's possible within your budget", "Alternatives if your choice exceeds your budget", "Honest feedback, no false promises"]
    },
    {
      icon: "📘",
      title: "Passport Application / Renewal Support",
      description: "Help with new passport or renewing your old one.",
      features: ["Process explanation", "Checklist of documents", "Online form guidance"]
    }
  ];

  const visibleServices = showAll ? services : services.slice(0, 3);

  const handleShowToggle = () => {
    setShowAll(!showAll);
    if (showAll) {
      servicesRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setTimeout(() => {
        window.scrollBy({
          top: -80,
          behavior: 'smooth'
        });
      }, 500);
    }
  };

  return (
    <section id="services" className="services py-5" ref={servicesRef}>
      <div className="services-pattern"></div>
      <Container>
        <div className="text-center mb-5" data-aos="fade-up">
          <span className="section-subtitle">Our Services</span>
          <h2 className="section-title">What We Offer</h2>
          <div className="title-underline mx-auto"></div>
        </div>

        <Row>
          {visibleServices.map((service, index) => (
            <Col lg={4} md={6} key={index} className="mb-4">
              <Card 
                className="service-card h-100 border-0"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <Card.Body className="text-center p-4">
                  <div className="service-icon mb-4">
                    <span>{service.icon}</span>
                  </div>
                  <h4 className="service-title mb-3">{service.title}</h4>
                  <p className="text-muted mb-4">{service.description}</p>
                  <ul className="feature-list">
                    {service.features.map((feature, i) => (
                      <li key={i} className="mb-2">
                        <i className="bi bi-check2-circle text-primary me-2"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {services.length > 3 && (
          <div className="text-center mt-4">
            <button 
              className="btn view-more-btn" // Removed btn-primary class
              onClick={handleShowToggle}
              data-aos="fade-up"
            >
              {showAll ? (
                <>
                  Show Less <i className="bi bi-chevron-up ms-2"></i>
                </>
              ) : (
                <>
                  View More Services <i className="bi bi-chevron-down ms-2"></i>
                </>
              )}
            </button>
          </div>
        )}
      </Container>
    </section>
  );
};

export default Services;