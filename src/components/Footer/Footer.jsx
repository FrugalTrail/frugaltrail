import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import footerLogo from '../../assets/frugal-trail.svg';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-pattern"></div>
      <div className="footer-curve">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
      </div>
      <Container>
        <Row className="footer-content">
          <Col lg={4} className="mb-5 mb-lg-0 footer-brand-section" data-aos="fade-right">
            <div className="footer-brand">
              <div className="footer-logo-wrapper">
                <img src={footerLogo} alt="FrugalTrail Logo" className="footer-logo animate-pulse" />
              </div>
            </div>
            <p className="footer-tagline">
              We plan like it's our own trip — because we care that much.
            </p>
          </Col>
                
          <Col lg={4} md={6} className="mb-5 mb-lg-0" data-aos="fade-up">
            <div className="footer-links-wrapper">
              <h5 className="footer-title">Quick Links</h5>
              <ul className="footer-links">
                {['About', 'Services', 'Blog', 'Contact'].map((link, index) => (
                  <li key={link} className="hover-slide-right">
                    <i className="bi bi-chevron-right"></i>
                    <a href={`/${link.toLowerCase()}`}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </Col>

          <Col lg={4} md={6} className="mb-5 mb-lg-0" data-aos="fade-left">
            <div className="footer-contact-wrapper">
              <h5 className="footer-title">Contact Info</h5>
              <ul className="footer-contact">
                <li className="hover-float">
                  <i className="bi bi-geo-alt-fill"></i>
                  <span>46&47, Booma Illam, Mani Garden,<br/>Y. Pudhupatti, Arumbanoor P.O.
Kadachanendal,<br/>Madurai - 625104</span>
                </li>
                <li className="hover-float">
                  <i className="bi bi-telephone-fill"></i>
                  <a href="tel:+919840454758">+91 98404 54758</a>
                </li>
                <li className="hover-float">
                  <i className="bi bi-envelope-fill"></i>
                  <a href="mailto:hello@frugaltrail.com">hello@frugaltrail.com</a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        
        <div className="footer-divider"></div>
        
        <div className="social-icons-wrapper">
          {[
            { platform: 'facebook', url: ' https://www.facebook.com/profile.php?id=61573447725702' },
            { platform: 'instagram', url: 'https://www.instagram.com/frugal_trail/' },
            { platform: 'linkedin', url: 'https://www.linkedin.com/company/frugal-trail/?viewAsMember=true' },
             { platform: 'youtube', url: 'https://www.youtube.com/@frugaltrail' },
          ].map((social, index) => (
            <a 
              key={index} 
              href={social.url} 
              className={`social-icon ${social.platform}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className={`bi bi-${social.platform}`}></i>
            </a>
          ))}
        </div>
        
        <p className="copyright">
          © {new Date().getFullYear()} <span className="highlight">FrugalTrail</span>. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;