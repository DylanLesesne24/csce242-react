import React, { useState } from "react";

export default function Contact() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);
    formData.append("access_key", "d9ac404a-d035-45b5-9053-83b46f496925");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      setResult("Error");
    }
  };

  return (
    <main id="contact">
      <div className="contact-columns">
        <section className="one">
          <h3>Our Location</h3>
          <iframe
            id="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6616.06598204007!2d-81.02688852399209!3d33.99290197313709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f8bad83e84d8df%3A0x66f7fe71b3a65949!2s1100%20Wheat%20St%2C%20Columbia%2C%20SC%2029201!5e0!3m2!1sen!2sus!4v1737069000000!5m2!1sen!2sus"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>

        <section className="one">
          <form id="contact-form" onSubmit={onSubmit}>
            <p>
              <label htmlFor="name">Name:</label>
              <input id="name" name="name" type="text" required />
            </p>
            <p>
              <label htmlFor="email">Email:</label>
              <input id="email" name="email" type="email" required />
            </p>
            <p>
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" required></textarea>
            </p>
            <button type="submit">Submit Form</button>
            <div id="contact-result">{result}</div>
          </form>
        </section>
      </div>
    </main>
  );
}
