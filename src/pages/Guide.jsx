import React from "react";

export default function Guide() {
  return (
    <main>
      <section id="guide">
        <h2>PC Building Guide</h2>
        <p>Now that you’ve learned about the components, here’s how to choose compatible
          parts and put them together into a working PC build.</p>

        <div className="guide-sections">
          <div className="guide-card">
            <img src={process.env.PUBLIC_URL + "/images/guide-cpu-motherboard.jpg"} alt="CPU and Motherboard" />
            <h3>Choosing a CPU and Motherboard</h3>
            <p>Make sure your CPU matches the motherboard socket type.</p>
          </div>

          <div className="guide-card">
            <img src={process.env.PUBLIC_URL + "/images/guide-ram.jpg"} alt="RAM" />
            <h3>Selecting RAM</h3>
            <p>Motherboards support specific RAM types and speeds. Check before buying.</p>
          </div>

          <div className="guide-card">
            <img src={process.env.PUBLIC_URL + "/images/guide-gpu-psu.jpg"} alt="GPU and PSU" />
            <h3>Pairing a GPU with a Power Supply</h3>
            <p>Choose a PSU with enough wattage for your graphics card.</p>
          </div>

          <div className="guide-card">
            <img src={process.env.PUBLIC_URL + "/images/guide-storage.jpg"} alt="Storage" />
            <h3>Picking Storage</h3>
            <p>SSDs offer faster performance than HDDs.</p>
          </div>

          <div className="guide-card">
            <img src={process.env.PUBLIC_URL + "/images/guide-case-cooling.jpg"} alt="Case and Cooling" />
            <h3>Case and Cooling</h3>
            <p>Ensure your case fits your motherboard and provides good airflow.</p>
          </div>
        </div>
      </section>

      <section id="beginner-videos">
        <h2>Beginner Videos</h2>
        <div className="video-grid">
          <iframe width="560" height="315"
            src="https://www.youtube.com/embed/PCwYQQKgtXQ"
            title="How to Build a PC - Step by Step Beginners Guide"
            allowFullScreen></iframe>

          <iframe width="560" height="315"
            src="https://www.youtube.com/embed/IhX0fOUYd8Q"
            title="How to Build a PC Step by Step"
            allowFullScreen></iframe>
        </div>
      </section>
    </main>
  );
}
