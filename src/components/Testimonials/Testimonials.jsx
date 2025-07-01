import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import bharathImage from '../../assets/Bharath Kannan.jpg';
import vijayImage from '../../assets/Vijayaraghavan Venkatadri.png';
import ayyappaImage from '../../assets/Ayyappa.jpg';
import './Testimonials.css';
import { initializeApp } from "firebase/app";
import { getDatabase, ref as dbRef, onValue } from "firebase/database";
import LoadingSpinner from '../../LoadingSpinner';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBFfBeD_q7N5BHUSVUFjmp8N47ihLiMQDc",
  authDomain: "frugaltrailphotos.firebaseapp.com",
  projectId: "frugaltrailphotos",
  messagingSenderId: "387948789176",
  appId: "1:387948789176:web:2174d8a080369751de634d",
  databaseURL: "https://frugaltrailphotos-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const fallbackImages = [bharathImage, ayyappaImage, vijayImage];

const Testimonials = () => {
  const [showAll, setShowAll] = useState(false);
  const [expandedIndexes, setExpandedIndexes] = useState(new Set());
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refTestimonials = dbRef(database, "testimonials");
    const unsubscribe = onValue(refTestimonials, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Use image from firebase if present, else fallback to local images
        const arr = Object.entries(data).map(([id, value], idx) => ({
          id,
          ...value,
          image: value.image && value.image.trim() !== "" ? value.image : fallbackImages[idx % fallbackImages.length],
        }));
        setTestimonials(arr.reverse());
      } else {
        setTestimonials([]);
      }
      setLoading(false);
    }, () => setLoading(false));
    return () => unsubscribe();
  }, []);

  const displayedTestimonials = showAll ? testimonials : testimonials.slice(0, 3);

  const handleViewMoreClick = () => {
    setShowAll(!showAll);
    if (!showAll) {
      setTimeout(() => {
        window.scrollBy({
          top: 100,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  const handleReadMore = (index) => {
    setExpandedIndexes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <section className="testimonials py-5">
      <div className="bg-pattern"></div>
      <Container>
        <div className="text-center mb-5" data-aos="fade-up">
          <span className="section-subtitle">Testimonials</span>
          <h2 className="section-title"> What Our Travelers Say</h2>
          <div className="title-underline mx-auto"></div>
        </div>
        {loading ? (
          <LoadingSpinner message="Just a minute..." />
        ) : testimonials.length === 0 ? (
          <div style={{ color: "#1ABC9C", textAlign: "center", fontWeight: 600, fontSize: "1.1rem", padding: "40px 0" }}>
            No testimonials available.
          </div>
        ) : (
          <Row className="testimonials-grid">
            {displayedTestimonials.map((testimonial, index) => (
              <Col lg={4} key={testimonial.id || index} className="mb-4">
                <Card 
                  className="testimonial-card border-0 h-100 shadow-hover"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <Card.Body className="p-4">
                    <div className="quote-icon">❝</div>
                    <div className="testimonial-content">
                      <div className="testimonial-header mb-4">
                        <div className="d-flex align-items-center">
                          <div className="testimonial-img-wrapper">
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.name} 
                              className="testimonial-img"
                            />
                          </div>
                          <div className="ms-3" style={{ width: "100%" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                              <h5 className="mb-1 fw-bold">{testimonial.name}</h5>
                              
                            </div>
                            {(testimonial.role || testimonial.location) && (
                              <div style={{ fontSize: "0.95rem", color: "#1ABC9C", fontWeight: 500, display: "flex", alignItems: "center", gap: 8 }}>
                                {testimonial.role}
                                {testimonial.location && (
                                  <>
                                    {" "}
                                    <i className="bi bi-geo-alt-fill" style={{ color: "#1ABC9C", marginRight: 4, marginLeft: 8 }}></i>
                                    <span style={{ color: "#888", fontWeight: 400 }}>{testimonial.location}</span>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`testimonial-quote ${expandedIndexes.has(index) ? 'expanded' : ''}`}
                        style={{
                          fontWeight: "bold",
                          fontFamily: "cursive",
                          color: "black",
                          fontSize: "1.2rem",
                          margin: "10px 0",
                        }}
                      >
                        {testimonial.quote}
                      </div>
                      <p
                        className={`testimonial-text ${expandedIndexes.has(index) ? 'expanded' : ''}`}
                        style={{
                          whiteSpace: "pre-line",
                          color: "#333",
                          lineHeight: 1.6,
                        }}
                      >
                        {testimonial.paragraph}
                      </p>
                      <button 
                        onClick={() => handleReadMore(index)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: ' #1ABC9C',
                          fontWeight: '600',
                          fontSize: '16px',
                          cursor: 'pointer',
                          padding: '5px 0',
                          marginTop: '10px'
                        }}
                      >
                        {expandedIndexes.has(index) ? 'Read Less' : 'Read More'}
                        <i 
                          className={`bi bi-arrow-${expandedIndexes.has(index) ? 'up' : 'down'}`}
                          style={{ marginLeft: '5px' }}
                        ></i>
                      </button>
                      <div className="rating mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="star">⭐</span>
                        ))}
                      </div>
                      <div className="testimonial-footer">
                        <span className="verified-badge">
                          <i className="bi bi-patch-check-fill text-primary me-2"></i>
                          Verified Travel
                        </span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        <div className="text-center mt-5" data-aos="fade-up">
          <button 
            className="view-more-btn"
            onClick={handleViewMoreClick}
          >
            {showAll ? 'Show Less Reviews' : 'View More Reviews'}
            <i className={`bi bi-arrow-${showAll ? 'up' : 'down'} ms-2`}></i>
          </button>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;