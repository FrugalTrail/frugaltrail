import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Blog.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref as dbRef, onValue } from "firebase/database";
import LoadingSpinner from "../../LoadingSpinner"; // Adjust the path if needed

// Import blog post images from your existing gallery
import image2 from "../../assets/IMG-20250227-WA0024.jpg";
import image7 from "../../assets/IMG-20250227-WA0029.jpg";
import image11 from "../../assets/IMG-20250227-WA0033.jpg";
import image15 from "../../assets/IMG-20250227-WA0037.jpg";
import image22 from "../../assets/IMG-20250227-WA0044.jpg";
import image28 from "../../assets/IMG-20250227-WA0058.jpg";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBFfBeD_q7N5BHUSVUFjmp8N47ihLiMQDc",
  authDomain: "frugaltrailphotos.firebaseapp.com",
  projectId: "frugaltrailphotos",
  messagingSenderId: "387948789176",
  appId: "1:387948789176:web:2174d8a080369751de634d",
  databaseURL:
    "https://frugaltrailphotos-default-rtdb.asia-southeast1.firebasedatabase.app",
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const staticBlogPosts = [
  // {
  //   id: "static1",
  //   image: image2,
  //   category: "Travel Guide",
  //   title: "Planning a Europe Trip from Madurai? Read This First",
  //   excerpt:
  //     "A step-by-step breakdown of what you need to know about planning your European adventure from South India...",
  //   link: "#",
  // },
  // {
  //   id: "static2",
  //   image: image7,
  //   category: "Visa Tips",
  //   title: "Visa Rejection? Here's How to Avoid the Common Mistakes",
  //   excerpt:
  //     "Real examples and solutions from past client experiences to help you secure your visa approval...",
  //   link: "#",
  // },
  // {
  //   id: "static3",
  //   image: image11,
  //   category: "Budget Travel",
  //   title: "What ₹1 Lakh Can Get You in Southeast Asia",
  //   excerpt:
  //     "Breaking down destinations that fit the budget, with real costs and travel tips...",
  //   link: "#",
  // },
  // {
  //   id: "static4",
  //   image: image15,
  //   category: "Cultural Travel",
  //   title: "Hidden Temples of Tamil Nadu",
  //   excerpt:
  //     "Discover the ancient architectural marvels and spiritual sanctuaries across Tamil Nadu's lesser-known regions...",
  //   link: "#",
  // },
  // {
  //   id: "static5",
  //   image: image22,
  //   category: "Adventure",
  //   title: "Trekking in the Western Ghats",
  //   excerpt:
  //     "A comprehensive guide to the best trekking routes in the Western Ghats, from beginner trails to challenging peaks...",
  //   link: "#",
  // },
  // {
  //   id: "static6",
  //   image: image28,
  //   category: "Photography",
  //   title: "Best Photo Spots in South India",
  //   excerpt:
  //     "Top locations for capturing the perfect shots of South India's diverse landscapes and cultural heritage...",
  //   link: "#",
  // },
];

const Blog = () => {
  const [showAll, setShowAll] = useState(false);
  const [firebaseBlogs, setFirebaseBlogs] = useState([]);
  const [firebaseBlogsMeta, setFirebaseBlogsMeta] = useState([]);
  const [loading, setLoading] = useState(true);
  const [metaLoading, setMetaLoading] = useState(false);

  // Fetch blogs from Firebase
  useEffect(() => {
    setLoading(true);
    const blogsDbRef = dbRef(database, "blogs");
    const unsubscribe = onValue(
      blogsDbRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const blogsArr = Object.entries(data).map(([id, value]) => ({
            id,
            ...value,
          }));
          setFirebaseBlogs(blogsArr.reverse());
        } else {
          setFirebaseBlogs([]);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // Fetch blog meta for firebase blogs
  useEffect(() => {
    const fetchMeta = async () => {
      if (firebaseBlogs.length === 0) {
        setFirebaseBlogsMeta([]);
        return;
      }

      setMetaLoading(true);
      try {
        const metas = await Promise.all(
          firebaseBlogs.map(async (blog) => {
            try {
              const res = await fetch(
                `https://api.allorigins.win/get?url=${encodeURIComponent(
                  blog.link
                )}`
              );
              const data = await res.json();
              const html = data.contents;

              // Extract og:title
              const ogTitleMatch = html.match(
                /property=["']og:title["'] content=["']([^"']+)["']/i
              );
              let title = blog.title || "";
              if (ogTitleMatch) {
                title = ogTitleMatch[1].trim();
              } else {
                const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
                title = h1Match
                  ? h1Match[1].replace(/<[^>]+>/g, "").trim()
                  : title;
              }

              // Extract og:image
              const imgMatch = html.match(
                /property=["']og:image["'] content=["']([^"']+)["']/i
              );
              const image = imgMatch ? imgMatch[1] : blog.image || "";

              // Extract og:description
              const descMatch = html.match(
                /property=["']og:description["'] content=["']([^"']+)["']/i
              );
              const excerpt = descMatch
                ? descMatch[1]
                : blog.excerpt || "";

              // Extract category
              const catMatch = html.match(
                /property=["']article:section["'] content=["']([^"']+)["']/i
              );
              const category = catMatch
                ? catMatch[1]
                : blog.category || "";

              return {
                ...blog,
                title,
                image,
                excerpt,
                category,
              };
            } catch (error) {
              console.error("Error fetching meta for blog:", blog.link, error);
              return {
                ...blog,
                title: blog.title || "",
                image: blog.image || "",
                excerpt: blog.excerpt || "",
                category: blog.category || "",
              };
            }
          })
        );
        setFirebaseBlogsMeta(metas);
      } catch (error) {
        console.error("Error in meta fetching:", error);
        setFirebaseBlogsMeta(firebaseBlogs);
      } finally {
        setMetaLoading(false);
      }
    };

    fetchMeta();
  }, [firebaseBlogs]);

  // Combine firebase blogs (first) and static blogs (after)
  const allBlogs = [...firebaseBlogsMeta, ...staticBlogPosts];

  // Show only 3 blogs if not showAll, otherwise show all
  const displayedBlogs = showAll ? allBlogs : allBlogs.slice(0, 3);

  // Get unique categories from all blogs
  const categories = Array.from(
    new Set(allBlogs.map((b) => b.category).filter(Boolean))
  );

  return (
    <div className="page-wrapper">
      <section id="blog" className="blog py-5">
        <div className="blog-pattern"></div>
        <Container>
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="section-subtitle">Letters from Our Blog</span>
            <h2 className="section-title">Latest Travel Insights</h2>
            <div className="title-underline mx-auto"></div>
          </div>

          {loading || metaLoading ? (
            <LoadingSpinner message="Loading blogs..." />
          ) : (
            <>
              <Row className="blog-grid">
                {allBlogs.length === 0 ? (
                  <Col className="text-center py-5">
                    <div className="no-blogs-message">
                      No blogs available at the moment. Check back later!
                    </div>
                  </Col>
                ) : (
                  displayedBlogs.map((blog, index) => (
                    <Col lg={4} md={6} key={blog.id} className="mb-4">
                      <Card
                        className="blog-card border-0 h-100"
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                      >
                        <div className="blog-img-wrapper">
                          {blog.image ? (
                            <Card.Img
                              variant="top"
                              src={
                                typeof blog.image === "string"
                                  ? blog.image
                                  : blog.image
                              }
                              alt={blog.title}
                              className="blog-img"
                            />
                          ) : (
                            <div
                              className="blog-img-placeholder"
                              style={{
                                width: "100%",
                                height: "200px",
                                backgroundColor: "#f5f5f5",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <span>No Image</span>
                            </div>
                          )}
                          <div className="blog-overlay">
                            <a
                              href={blog.link || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="read-more-btn"
                            >
                              Read More
                            </a>
                          </div>
                        </div>
                        <Card.Body className="p-4">
                          {blog.category && (
                            <div className="blog-category">{blog.category}</div>
                          )}
                          <Card.Title className="blog-title h5 mb-3">
                            {blog.title || "Untitled Blog Post"}
                          </Card.Title>
                          <Card.Text className="blog-excerpt">
                            {blog.excerpt || "No excerpt available."}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                )}
              </Row>

              {allBlogs.length > 3 && (
                <div className="text-center mt-5" data-aos="fade-up">
                  <button
                    className="view-all-btn"
                    onClick={() => setShowAll((prev) => !prev)}
                  >
                    {showAll ? "Show Less" : "View All Posts"}
                    <i
                      className={`bi bi-arrow-${
                        showAll ? "up" : "down"
                      } ms-2`}
                    ></i>
                  </button>
                </div>
              )}
            </>
          )}
        </Container>
      </section>
    </div>
  );
};

export default Blog;