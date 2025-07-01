import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './About.css';
import logo from '../../assets/2.png';
// Import team images from assets
import monishImg from '../../assets/monish-1.jpg';
import karthikImg from '../../assets/karthik.jpg';
import chiefImg from '../../assets/Chief Pawsenger Officer.jpg';
import { initializeApp } from "firebase/app";
import { getDatabase, ref as dbRef, onValue } from "firebase/database";
import LoadingSpinner from '../../LoadingSpinner';

// Firebase config (reuse your config)
const firebaseConfig = {
  apiKey: "AIzaSyAt2hBdvPBiq91odRqu9wGFVfdODX0wbxA",
  authDomain: "frugaltrail-7eb2c.firebaseapp.com",
  databaseURL: "https://frugaltrail-7eb2c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "frugaltrail-7eb2c",
  storageBucket: "frugaltrail-7eb2c.firebasestorage.app",
  messagingSenderId: "437021902208",
  appId: "1:437021902208:web:6da1c0d0e16adf6a2d6d65"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const About = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [showAllImages, setShowAllImages] = useState(false);
  const [showVideos, setShowVideos] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryVideos, setGalleryVideos] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(true);

  const stats = [
    { number: '', text: 'Chosen by Families. Loved by Couples. Trusted by Women. Because every journey we plan puts your safety and peace of mind first.', icon: '😊' },
    { number: '', text: 'Complete Guidance from Start to End', icon: '🏁' }
  ];

  const features = [
    {
      icon: '🛫',
      title: 'Transparent Service Fee (12%)',
      text: 'Tailored experiences for every traveler'
    },
    {
      icon: '🎯',
      title: 'Tailored Itineraries, Not Templates',
      text: 'Professional local guides worldwide'
    },
    {
      icon: '🏨',
      title: 'No Markups on Flight or Hotel',
      text: 'Premium accommodations at top locations'
    },
    {
      icon: '💬',
      title: 'Support via WhatsApp Throughout',
      text: '24/7 Support throughout your journey'
    }
  ];

  // Use imported images for team members
  const teamMembers = [
    {
      src: monishImg,
      alt: "Monish",
      name: "Monish – Co-founder and Chief Travel Strategist, Frugal Trail",
      text:  <>
      Travel has always been more than just a hobby for me—it's a passion that has shaped my perspective on the world. Having traveled to 40 countries and experienced diverse cultures, I've learned the ins and outs of planning a perfect trip, whether it's navigating visa processes, finding hidden gems, or crafting the most budget-friendly yet fulfilling itineraries.<br /><br />
      
      Over the years, I've helped countless friends and family members plan their travels, ensuring they have a hassle-free and unforgettable experience. From choosing the right destinations to securing visas smoothly, I've always enjoyed making travel simpler and more accessible for others. Seeing them return with incredible memories, thanking me for the seamless trips, made me realize that this is something I want to do on a larger scale.<br /><br />
      
      As a filmmaker, my work has taken me across borders, allowing me to explore places in ways most travelers don't. This experience has given me a unique perspective on travel—beyond tourist spots, I look for authentic experiences that make each journey special. That's what led me to co-found Frugal Trail—a platform where I can combine my love for travel and my expertise in planning to help others travel smarter, explore more, and spend less.
    </>
    },
    {
      src: karthikImg,
      alt: "Karthik",
      name: "Karthik – Co-founder & Chief Growth Officer, FrugalTrail",
      text: <>I've always believed that the real magic of travel lies not just in exploring new destinations, but in how thoughtfully those experiences are planned, communicated, and delivered. With over a decade of experience in customer success and operations, I've spent years solving problems, building systems, and ensuring people have seamless experiences — and that's exactly what I bring to FrugalTrail.<br></br>
      <br></br>

      While I'm not the one crafting day-by-day itineraries, I'm the guy behind everything that makes FrugalTrail feel dependable and human. I take care of customer experience, brand positioning, partnerships, and community — the things that ensure FrugalTrail is not just a travel service, but a brand people remember and trust.<br></br>
      <br></br>
      
      My journey into travel began out of sheer curiosity — I loved watching how people planned trips, how destinations came alive through local culture, and how small details could make or break an experience. That curiosity turned into purpose when I realized most travel consultancies either overpromise or underdeliver. With FrugalTrail, we're rewriting that script — by being honest, transparent, and absolutely committed to making travel simpler and smarter.<br></br>
      <br></br>
      
      If Monish is the guy who fixes your itinerary, I'm the guy ensuring you love every step of interacting with us — from the first WhatsApp message to the post-trip thank you.
        </>
    },
    {
      src: chiefImg,
      alt: "Chief",
      name: "Meet Our Chief Paw-senger Officers (CPOs)",
      text:  <>
      The Real Brains Behind the Brand 🐾<br /><br />
      
      Every great company has a leadership team that works hard, stays focused, and makes big decisions. We don't. Instead, we have a bunch of furry managers who nap through meetings and still expect applause.<br /><br />
      
      Our Chief Paw-senger Officers proudly handle the following responsibilities:<br />
      ✔ Sniffing out the best travel spots (and unattended snacks) 🌍🍗<br />
      ✔ Auditing naps at every location (quality control, of course) 🛏️😴<br />
      ✔ Providing instant approvals by walking on keyboards mid-task 🐾⌨️<br />
      ✔ Reminding us daily that "pack light" doesn't apply to treats 🧳🍖<br /><br />
      
      They may not respond to emails or answer travel queries, but they firmly believe that every trip should involve curiosity, chaos, and at least one nap in the sun.
    </>
    }
  ];

  useEffect(() => {
    setLoadingGallery(true);
    const galleryDbRef = dbRef(database, "gallery");
    const unsubscribe = onValue(galleryDbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const images = Object.entries(data).map(([id, value]) => ({
          id,
          ...value
        }));
        setGalleryImages(images.reverse());
      } else {
        setGalleryImages([]);
      }
      setLoadingGallery(false);
    }, () => setLoadingGallery(false));
    return () => unsubscribe();
  }, []);

  // Fetch videos from Firebase
  useEffect(() => {
    const videosDbRef = dbRef(database, "galleryVideos");
    const unsubscribe = onValue(videosDbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const videos = Object.entries(data).map(([id, value]) => ({
          id,
          ...value
        }));
        setGalleryVideos(videos.reverse());
      } else {
        setGalleryVideos([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // Display all images if showAllImages is true, otherwise show first 3
  const displayedImages = showAllImages ? galleryImages : galleryImages.slice(0, 3);
  console.log('Number of images displayed:', displayedImages.length);

  const handleSeeMore = () => {
    setShowAllImages(!showAllImages);
    
    // Scroll behavior based on expanding/collapsing
    setTimeout(() => {
      if (!showAllImages) {
        // Expanding - scroll down a bit
        window.scrollBy({
          top: 100,
          behavior: 'smooth'
        });
      } else {
        // Collapsing - scroll back up to gallery section
        document.querySelector('.gallery-section').scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // Helper to get embeddable video URL
  function getEmbedUrl(url) {
    if (!url) return "";
    // YouTube normal
    if (url.includes("youtube.com/watch?v=")) {
      const id = url.split("v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    // YouTube short
    if (url.includes("youtube.com/shorts/")) {
      const id = url.split("youtube.com/shorts/")[1].split(/[?&/]/)[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    // Vimeo
    if (url.includes("vimeo.com/")) {
      const id = url.split("vimeo.com/")[1].split(/[?/]/)[0];
      return `https://player.vimeo.com/video/${id}`;
    }
    // Google Drive
    if (url.includes("drive.google.com")) {
      let id = "";
      if (url.includes("/file/d/")) {
        id = url.split("/file/d/")[1].split("/")[0];
      } else if (url.includes("id=")) {
        id = url.split("id=")[1].split("&")[0];
      }
      if (id) {
        return `https://drive.google.com/file/d/${id}/preview`;
      }
    }
    // Default: return original (may fail)
    return url;
  }

  return (
    <div className="page-wrapper">
      <section id="about" className="about py-4">
        <div className="about-pattern"></div>
        <Container>
          {/* Compact Header */}
          <Row className="justify-content-center mb-4">
            <Col lg={8} className="text-center">
              <div data-aos="fade-up">
                <span className="section-subtitle">About Us</span>
                <h2 className="section-title"> Your Travel, Our Process.</h2>
              </div>
            </Col>
          </Row>

          {/* Modified Main Content Row */}
          <Row className="align-items-center mb-4">
            <Col lg={5} className="mb-4 mb-lg-0">
              <div className="about-image-wrapper">
                <div 
                  className="about-image-container grid-container" 
                  style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr', 
                    gap: '60px', 
                    height: '100%',
                    alignItems: 'center'
                  }}
                >
                  {teamMembers.map((member, index) => (
                    <div key={index} className="grid-item" style={{ display: 'flex', justifyContent: 'center' }}>
                      <img 
                        src={member.src} 
                        alt={member.alt}
                        onClick={() => setSelectedMember(member)}
                        style={{ 
                          width: '250px', 
                          height: '250px', 
                          objectFit: 'cover',
                          borderRadius: '50%',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          border: '3px solid #1ABC9C'
                        }}
                        onMouseOver={(e) => {
                          e.target.style.transform = 'scale(1.05)';
                          e.target.style.boxShadow = '0 8px 25px rgba(26, 188, 156, 0.4)';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.transform = 'scale(1)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Col>
            <Col lg={7}>
              <div className="about-content ps-lg-4" data-aos="fade-left">
                <h3 className="content-title mb-3">
                  Crafting Unforgettable Experiences
                </h3>
                <div className="content-description">
                  <p className="lead mb-3">
                  FrugalTrail was created to fix the mess that most people face while planning trips. Instead of selling rigid "packages", we offer custom itineraries based on your destination, number of travelers, duration, and budget. That's all we ask. Once we have that, we help you plan every detail — from flights and visas to hotels and local transport. No fluff. No upselling. Just practical, honest travel planning.
                  <br></br>
                  <br></br>
We've helped families, solo travelers, and groups experience stress-free trips without spending a rupee more than necessary.
<br></br>
<br></br>
Whether you're exploring nearby states or applying for a Schengen visa — we're the calm in your travel chaos.

                  </p>
                </div>
                <div className="stats-grid">
                  {stats.map((stat, index) => (
                    <div 
                      key={index} 
                      className="stat-card"
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                    >
                      <span className="stat-icon">{stat.icon}</span>
                      <h4 className="stat-number">{stat.number}</h4>
                      <p className="stat-text">{stat.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>

          {/* Features Section - Compact */}
          <Row className="mt-4">
            {features.map((feature, index) => (
              <Col md={6} lg={3} key={index} className="mb-3">
                <div className="feature-card" data-aos="fade-up" data-aos-delay={index * 100}>
                  <div className="feature-icon">{feature.icon}</div>
                  <h5 className="feature-title mb-2">{feature.title}</h5>
                  <p className="feature-text mb-0">{feature.text}</p>
                </div>
              </Col>
            ))}
          </Row>

          {/* Gallery Section */}
          <div className="gallery-section mt-5 text-center">
            <div
              className="gallery-header-flex"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                position: 'relative',
                width: '100%',
              }}
            >
              {/* Heading and subtitle centered */}
              <div style={{ margin: '0 auto', textAlign: 'left', width: '100%', maxWidth: 700 }}>
                <span className="section-subtitle" style={{ display: 'block', textAlign: 'left', width: '100%' }}>
                  {showVideos ? "Video Gallery" : "Photo Gallery"}
                </span>
                <h2 className="section-title mb-4" style={{ marginBottom: 0, textAlign: 'left', width: '100%' }}>
                  {showVideos ? "Explore Our Travel Videos" : "Explore Our Travel Memories"}
                </h2>
                {/* Toggle buttons: visible below heading only on mobile */}
                <div
                  className="gallery-toggle-btns mobile-toggle-btns"
                  style={{
                    display: 'none',
                    marginTop: 12,
                    justifyContent: 'center',
                  }}
                >
                  <button
                    onClick={() => setShowVideos(false)}
                    style={{
                      background: !showVideos ? '#1ABC9C' : '#eee',
                      color: !showVideos ? 'white' : '#1ABC9C',
                      border: 'none',
                      borderRadius: '20px 0 0 20px',
                      padding: '6px 14px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      outline: 'none',
                      fontSize: '0.95rem',
                      minWidth: 70,
                      marginRight: 2,
                    }}
                  >
                    Photos
                  </button>
                  <button
                    onClick={() => setShowVideos(true)}
                    style={{
                      background: showVideos ? '#1ABC9C' : '#eee',
                      color: showVideos ? 'white' : '#1ABC9C',
                      border: 'none',
                      borderRadius: '0 20px 20px 0',
                      padding: '6px 14px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      outline: 'none',
                      fontSize: '0.95rem',
                      minWidth: 70,
                      marginLeft: 2,
                    }}
                  >
                    Videos
                  </button>
                </div>
              </div>
              {/* Toggle buttons: visible at left only on desktop */}
              <div
                className="gallery-toggle-btns desktop-toggle-btns"
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  display: 'flex',
                  zIndex: 2,
                }}
              >
                <button
                  onClick={() => setShowVideos(false)}
                  style={{
                    background: !showVideos ? '#1ABC9C' : '#eee',
                    color: !showVideos ? 'white' : '#1ABC9C',
                    border: 'none',
                    borderRadius: '20px 0 0 20px',
                    padding: '8px 24px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  Photos
                </button>
                <button
                  onClick={() => setShowVideos(true)}
                  style={{
                    background: showVideos ? '#1ABC9C' : '#eee',
                    color: showVideos ? 'white' : '#1ABC9C',
                    border: 'none',
                    borderRadius: '0 20px 20px 0',
                    padding: '8px 24px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  Videos
                </button>
              </div>
            </div>
            <p className="text-muted mb-4">
              {showVideos
                ? "Browse through some of the travel videos our travelers have shared. Real trips, real moments."
                : "Browse through some of the destinations we've helped travelers explore. Real trips, real memories."}
            </p>

            {!showVideos ? (
              loadingGallery ? (
                <LoadingSpinner message="Just a minute..." />
              ) : displayedImages.length === 0 ? (
                <div style={{ color: "#1ABC9C", textAlign: "center", fontWeight: 600, fontSize: "1.1rem", padding: "40px 0" }}>
                  No photos available.
                </div>
              ) : (
                <>
                  <Row className="g-4">
                    {displayedImages.map((image, index) => (
                      <Col md={4} key={image.id || index} className="mb-4">
                        <div
                          className="gallery-item"
                          style={{ cursor: 'pointer', height: '300px', borderRadius: '15px', overflow: 'hidden' }}
                          onClick={() => handleImageClick(image)}
                        >
                          <img
                            src={image.base64}
                            alt={image.destination}
                            className="w-100 h-100 object-fit-cover"
                          />
                          <div className="gallery-overlay">
                            <div className="gallery-content text-center">
                              <img src={logo} alt="Company Logo" className="gallery-icon" style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
                            </div>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                  <div className="text-center mt-4 mb-5">
                    <button
                      onClick={handleSeeMore}
                      style={{
                        cursor: 'pointer',
                        background: showAllImages ? 'transparent' : '#1ABC9C',
                        color: showAllImages ? '#1ABC9C' : 'white',
                        border: showAllImages ? '2px solid #1ABC9C' : 'none',
                        padding: '15px 40px',
                        borderRadius: '30px',
                        fontSize: '18px',
                        fontWeight: '600',
                        transition: 'all 0.3s ease',
                        boxShadow: showAllImages ? 'none' : '0 4px 15px #1ABC9C',
                        outline: 'none',
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                      onMouseOver={(e) => {
                        if (showAllImages) {
                          e.target.style.background = '#1ABC9C';
                          e.target.style.color = 'white';
                        } else {
                          e.target.style.background = '#16a085';
                        }
                        e.target.style.transform = 'translateY(-3px)';
                        e.target.style.boxShadow = '0 6px 20px rgba(26, 188, 156, 0.3)';
                      }}
                      onMouseOut={(e) => {
                        if (showAllImages) {
                          e.target.style.background = 'transparent';
                          e.target.style.color = '#1ABC9C';
                        } else {
                          e.target.style.background = '#1ABC9C';
                        }
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = showAllImages ? 'none' : '0 4px 15px rgba(26, 188, 156, 0.2)';
                      }}
                    >
                      {showAllImages ? (
                        <>
                          Show Less Photos
                          <span style={{ fontSize: '20px', marginLeft: '5px' }}>↑</span>
                        </>
                      ) : (
                        <>
                          See More Photos
                          <span style={{ fontSize: '20px', marginLeft: '5px' }}>↓</span>
                        </>
                      )}
                    </button>
                  </div>
                </>
              )
            ) : (
              <Row className="g-4">
                {galleryVideos.length === 0 ? (
                  <div style={{ color: "#888", width: "100%", padding: "40px 0", fontSize: "1.1rem" }}>
                    No videos available.
                  </div>
                ) : (
                  galleryVideos.map((video, idx) => (
                    <Col md={4} key={video.id || idx} className="mb-4">
                      <div
                        className="gallery-item"
                        style={{ height: '300px', borderRadius: '15px', overflow: 'hidden', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        {/* Use iframe for YouTube/Vimeo/Drive, else fallback to <video> */}
                        {video.url && (video.url.includes('youtube') || video.url.includes('youtu.be') || video.url.includes('vimeo') || video.url.includes('drive.google.com')) ? (
                          <iframe
                            src={getEmbedUrl(video.url)}
                            title="Gallery Video"
                            style={{ width: "100%", height: "100%", border: 0, borderRadius: 15 }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <video
                            src={video.url}
                            controls
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '15px' }}
                          >
                            Your browser does not support the video tag.
                          </video>
                        )}
                      </div>
                    </Col>
                  ))
                )}
              </Row>
            )}
          </div>

          {/* Selected Member Modal */}
          {selectedMember && (
            <>
              <div 
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  zIndex: 999
                }}
                onClick={() => setSelectedMember(null)}
              />
              <div 
                style={{
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '15px',
                  boxShadow: '0 4px 20px rgba(26, 188, 156, 0.2)',
                  zIndex: 1000,
                  width: '90%',
                  maxWidth: '500px',
                  maxHeight: '80vh',
                  overflowY: 'auto',
                  animation: 'fadeIn 0.3s ease',
                  border: '1px solid rgba(26, 188, 156, 0.1)'
                }}
              >
                <div 
                  style={{ 
                    position: 'absolute', 
                    top: '10px', 
                    right: '10px',
                    cursor: 'pointer',
                    fontSize: '24px',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    backgroundColor: '#1ABC9C',
                    color: 'white',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => setSelectedMember(null)}
                >
                  ×
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '20px', 
                  marginBottom: '15px' 
                }}>
                  <img 
                    src={selectedMember.src} 
                    alt={selectedMember.alt} 
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '10px',
                      boxShadow: '0 4px 15px rgba(26, 188, 156, 0.15)'
                    }}
                  />
                  <h4 style={{ 
                    margin: 0, 
                    color: '#1ABC9C',
                    fontSize: '18px',
                    fontWeight: '600'
                  }}>
                    {selectedMember.name}
                  </h4>
                </div>
                <div style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: '#555',
                  paddingRight: '10px',
                  maxHeight: '50vh',
                  overflowY: 'auto'
                }}>
                  {selectedMember.text}
                </div>
              </div>
            </>
          )}

          {/* Image Modal */}
          {selectedImage && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                cursor: 'pointer'
              }}
              onClick={() => setSelectedImage(null)}
            >
              <div
                style={{
                  maxWidth: '90%',
                  maxHeight: '90vh',
                  position: 'relative'
                }}
                onClick={e => e.stopPropagation()}
              >
                <img
                  src={selectedImage.base64}
                  alt={selectedImage.destination}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '80vh',
                    objectFit: 'contain'
                  }}
                />
                <h4
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    marginTop: '20px',
                    fontSize: '20px'
                  }}
                >
                  {/* {selectedImage.destination} */}
                </h4>
              </div>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
};

export default About;