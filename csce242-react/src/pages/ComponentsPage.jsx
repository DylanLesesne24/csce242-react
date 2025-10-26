import React from "react";

export default function ComponentsPage() {
  const components = [
    { name: "CPU (Processor)", desc: "The brain of the computer.", img: "/images/cpu.jpg" },
    { name: "GPU (Graphics Card)", desc: "Renders images, videos, and games.", img: "/images/gpu.jpg" },
    { name: "RAM (Memory)", desc: "Short-term memory for active tasks.", img: "/images/ram.jpg" },
    { name: "Motherboard", desc: "Connects all components together.", img: "/images/motherboard.jpg" },
    { name: "Storage", desc: "Holds your files, OS, and applications.", img: "/images/storage.jpg" },
    { name: "Power Supply (PSU)", desc: "Delivers electricity safely and efficiently.", img: "/images/psu.jpg" },
  ];

  return (
    <main>
      <section id="components">
        <h2>Components</h2>
        <p>Every computer is made up of core components that work together to bring your system to life.</p>
        <div className="component-info-grid">
          {components.map((c, i) => (
            <div key={i} className="component-info-card">
              <img src={c.img} alt={c.name} />
              <h3>{c.name}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
