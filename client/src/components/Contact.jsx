import React from "react";
export default function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div className="container-xl">
        <p className="section-label">Get In Touch</p>
        <h2>Contact Us</h2>
        <div className="row g-4 mt-3">
          <div className="col-lg-6">
            <iframe
              className="map-box"
              src="https://www.google.com/maps?q=Flushing%20NY&output=embed"
              loading="lazy"
              title="Google Map showing restaurant location"
            ></iframe>
          </div>
          <div className="col-lg-6">
            <form className="contact-form">
              <input className="form-control" type="text" placeholder="Your Name" required />
              <input className="form-control" type="email" placeholder="Your Email" required />
              <textarea className="form-control" placeholder="Your Message" required></textarea>
              <button className="btn primary-btn" type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
