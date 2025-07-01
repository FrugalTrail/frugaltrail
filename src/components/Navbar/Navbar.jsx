import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import coloredLogo from '../../assets/frugal-trail (3).svg';
import transparentLogo from '../../assets/frugal-trail.svg';

import '../../styles/animations.css';
import './Navbar.css';

const NavigationBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleNavClick = (item, e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      scrollToSection(item.toLowerCase());
    }
    setExpanded(false);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      scrollToSection('hero');
    }
    setExpanded(false);
  };

  return (
    <Navbar 
      expand="lg" 
      fixed="top" 
      className={`custom-navbar ${scrolled ? 'navbar-scrolled' : ''}`}
      expanded={expanded}
      onToggle={setExpanded}
      ref={navRef}
    >
      <Container>
        <Navbar.Brand 
          as={Link} 
          to="/" 
          onClick={handleLogoClick}
          className="d-flex align-items-center"
        >
          <div className="navbar-logo-wrapper">
            <img 
              src={scrolled ? coloredLogo : transparentLogo}
              alt="FrugalTrail Logo" 
              className="navbar-logo"
            />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          className="custom-toggler"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {['Home', 'About', 'Services', 'Blog', 'Contact'].map((item) => (
              <Nav.Link 
                key={item}
                as={Link} 
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="nav-link-custom"
                onClick={(e) => handleNavClick(item === 'Home' ? 'hero' : item, e)}
              >
                {item}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;