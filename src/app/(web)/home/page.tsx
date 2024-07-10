import { Avatar, AvatarFallback, AvatarImage } from "@/components";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import "./home.css";

export default function Home() {
  return (
    <>
      <header>
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <Image
                src="/s-logo.png"
                alt="NHFC Logo"
                width={100}
                height={100}
              />
            </div>
            <nav>
              <ul>
                <li>
                  <a href="#home">Home</a>
                </li>
                <li>
                  <a href="#about">About Us</a>
                </li>
                <li>
                  <a href="#finance">Finance Solutions</a>
                </li>
                <li>
                  <a href="#projects">Projects</a>
                </li>
                <li>
                  <a href="#tenders">Tenders</a>
                </li>
                <li>
                  <a href="#careers">Careers</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </nav>
            <div className="auth-buttons">
              <Link href="/login" className="login-btn">Login</Link>
              <Link href="/register" className="register-btn">Register</Link>
            </div>
          </div>
        </div>
      </header>

      <section id="home" className="hero">
        <div className="hero-content">
          <h1>Innovative and Affordable Housing Finance Solutions</h1>
          <p>
            Empowering South African Households with Quality Living Environments
          </p>
          <a href="#finance" className="cta-button">
            Explore Our Solutions
          </a>
        </div>
      </section>

        <section id="about" className="section">
          <div className="container">
            <h2>About NHFC</h2>
            <p>
              The National Housing Finance Corporation (NHFC) is dedicated to
              making quality housing accessible and affordable for low to middle
              income South African households. We strive to be a world-className
              development finance institution that delivers innovative and
              affordable housing finance solutions to support the national
              priority of sustainable human settlements.
            </p>
            <a href="#" className="cta-button">
              Learn More About Us
            </a>
          </div>
        </section>

        <section id="mission-values" className="mission-values">
          <div className="container">
            <h2>Our Purpose, Mission & Values</h2>
            <div className="mission-values-grid">
              <div className="mission-values-item">
                <i className="fas fa-bullseye"></i>
                <h3>Our Purpose</h3>
                <p>
                  To make housing and home ownership accessible to more South
                  Africans.
                </p>
              </div>
              <div className="mission-values-item">
                <i className="fas fa-flag"></i>
                <h3>Our Mission</h3>
                <p>
                  To be a world className DFI that leads in the development and
                  funding of sustainable human settlements.
                </p>
              </div>
              <div className="mission-values-item">
                <i className="fas fa-heart"></i>
                <h3>Our Values</h3>
                <p>
                  Excellence, Innovation, Integrity, Partnership, Service
                  Oriented.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="mandate" className="mandate">
          <div className="container">
            <h2>Our Mandate</h2>
            <div className="mandate-content">
              <p>
                The NHFC&apos;s mandate is to facilitate and fund the
                development of sustainable human settlements and to make housing
                and home ownership accessible to all South Africans. We do this
                by:
              </p>
              <ul>
                <li>
                  Providing wholesale finance and support to intermediaries
                </li>
                <li>
                  Leveraging private sector funding for housing development
                </li>
                <li>
                  Facilitating increased and sustained lending by financial
                  institutions to the affordable housing market
                </li>
                <li>
                  Supporting the establishment of new housing intermediaries and
                  financing institutions
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="finance" className="section">
          <div className="container">
            <h2>Our Finance Solutions</h2>
            <div className="card-grid">
              <div className="card">
                <div className="card-content">
                  <h3>
                    <i className="fas fa-home"></i> Social Housing Finance
                  </h3>
                  <p>
                    Supporting the development of affordable rental housing for
                    low to moderate income households.
                  </p>
                  <a href="#" className="cta-button">
                    Learn More
                  </a>
                </div>
              </div>
              <div className="card">
                <div className="card-content">
                  <h3>
                    <i className="fas fa-building"></i> Private Rental Housing
                    Finance
                  </h3>
                  <p>
                    Financing solutions for private landlords to develop and
                    maintain quality rental properties.
                  </p>
                  <a href="#" className="cta-button">
                    Learn More
                  </a>
                </div>
              </div>
              <div className="card">
                <div className="card-content">
                  <h3>
                    <i className="fas fa-bridge"></i> Affordable Housing
                    Bridging Finance
                  </h3>
                  <p>
                    Short-term financing to bridge the gap in affordable housing
                    development projects.
                  </p>
                  <a href="#" className="cta-button">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="container">
            <h2>Featured Projects</h2>
            <div className="card-grid">
              <div className="card">
                <div className="card-content">
                  <h3>
                    <i className="fas fa-city"></i> Fleurhof Integrated Housing
                    Development
                  </h3>
                  <p>
                    A mixed-use development providing over 10,000 housing units
                    in Johannesburg.
                  </p>
                  <a href="#" className="cta-button">
                    View Project
                  </a>
                </div>
              </div>
              <div className="card">
                <div className="card-content">
                  <h3>
                    <i className="fas fa-house-user"></i> Belhar Social Housing
                    Project
                  </h3>
                  <p>
                    A social housing initiative delivering 629 units in Cape
                    Town.
                  </p>
                  <a href="#" className="cta-button">
                    View Project
                  </a>
                </div>
              </div>
              <div className="card">
                <div className="card-content">
                  <h3>
                    <i className="fas fa-hotel"></i> Westgate Social Housing
                    Project
                  </h3>
                  <p>
                    Providing 1,000 affordable rental units in Pietermaritzburg.
                  </p>
                  <a href="#" className="cta-button">
                    View Project
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="section testimonials">
          <div className="container">
            <h2>Success Stories</h2>
            <div className="card-grid">
              <div className="testimonial-card">
                <Image src="/s-logo" alt="Thabo M." width="100" height="100" />
                <p>
                  &qout;Thanks to NHFC&apos;s affordable housing finance, I now
                  have a place to call home. The process was smooth and the
                  support was incredible.&qout;
                </p>
                <h4>Thabo M., Johannesburg</h4>
              </div>
              <div className="testimonial-card">
                <Image
                  src="/s-logo.png"
                  alt="Nomsa K."
                  width="100"
                  height="100"
                />
                <p>
                  &qout;As a single mother, owning a home seemed impossible.
                  NHFC made it a reality for me and my children. I&apos;m
                  forever grateful&qout;
                </p>
                <h4>Nomsa K., Cape Town</h4>
              </div>
              <div className="testimonial-card">
                <Image
                  src="/s-logo.png"
                  alt="Sipho N."
                  width="100"
                  height="100"
                />
                <p>
                  &qout;NHFC&apos;s social housing project has given me access
                  to quality, affordable housing near my workplace. It&apos;s
                  changed my life.&qout;
                </p>
                <h4>Sipho N., Durban</h4>
              </div>
            </div>
          </div>
        </section>

        <section id="tenders" className="section">
          <div className="container">
            <h2>Current Tenders</h2>
            <div className="card-grid">
              <div className="card">
                <div className="card-content">
                  <h3>
                    <i className="fas fa-gavel"></i> Tender NHFC/03/2023
                  </h3>
                  <p>Provision of Legal Services</p>
                  <a href="#" className="cta-button">
                    View Details
                  </a>
                </div>
              </div>
              <div className="card">
                <div className="card-content">
                  <h3>
                    <i className="fas fa-chair"></i> Tender NHFC/04/2023
                  </h3>
                  <p>Supply and Delivery of Office Furniture</p>
                  <a href="#" className="cta-button">
                    View Details
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="careers" className="section">
          <div className="container">
            <h2>Join Our Team</h2>
            <p>
              Be part of our mission to transform housing finance in South
              Africa. We offer exciting career opportunities, internship
              programs, and bursaries for deserving students.
            </p>
            <a href="#" className="cta-button">
              View Opportunities
            </a>
          </div>
        </section>

        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Contact Us</h3>
              <p>Phone: +27 11 644 9800</p>
              <p>
                Email:{" "}
                <a
                  href="/cdn-cgi/l/email-protection"
                  className="__cf_email__"
                  data-cfemail="3d54535b527d53555b5e135e5213475c"
                >
                  [email&#160;protected]
                </a>
              </p>
              <p>
                Address: Old Trafford 3, Isle of Houghton, 11 Boundary Road,
                Houghton, 2198
              </p>
            </div>
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul>
                <li>
                  <a href="#about">About Us</a>
                </li>
                <li>
                  <a href="#finance">Finance Solutions</a>
                </li>
                <li>
                  <a href="#projects">Projects</a>
                </li>
                <li>
                  <a href="#tenders">Tenders</a>
                </li>
                <li>
                  <a href="#careers">Careers</a>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Follow Us</h3>
              <div className="social-icons">
                <a href="#">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="copyright">
            <p>
              &copy; 2023 National Housing Finance Corporation. All rights
              reserved.
            </p>
          </div>
        </div>
    </>
  );
}
