import React from "react";
import BuildList from "./BuildList";

export default function Home() {
  return (
    <main>
      <section id="hero">
        <h2>Your One Stop PC Building Resource!</h2>
        <p>Browse pre-built PCs or start learning how to build your own.</p>
        <img src="/images/headerimage.jpg" alt="Hero Banner" />
      </section>

      <BuildList />
    </main>
  );
}
