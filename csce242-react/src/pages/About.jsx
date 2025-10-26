import React from "react";

export default function About() {
  return (
    <main>
      <section id="about">
        <h2>Who We Are</h2>
        <div className="about-grid">
          <img
            src={process.env.PUBLIC_URL + "/images/ourteam.jpg"}
            alt="Our Team"
          />
          <p>
            We’re a team of PC enthusiasts who believe that building your own computer should be fun,
            affordable, and accessible to everyone. Our mission is to make the process simple by breaking
            it down into clear steps, whether you’re putting together your first budget build or planning
            a high-end gaming rig.
            <br />
            <br />
            At <em>We Build PCs</em>, we provide guides, component explanations, and example builds to
            help you understand not just <strong>what</strong> to buy, but <strong>why</strong>. We know it
            can feel overwhelming with all the choices out there, so our goal is to give you the confidence
            to choose the right parts for your needs.
            <br />
            <br />
            We’re here to share our knowledge, inspire creativity, and make sure your next PC build is one
            you can be proud of. Whether you’re new to computers or a long-time builder, this site is your
            go-to resource for everything PC building.
          </p>
        </div>
      </section>
    </main>
  );
}
