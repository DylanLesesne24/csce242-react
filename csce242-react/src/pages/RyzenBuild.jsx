import React from "react";

export default function RyzenBuild() {
  return (
    <main>
      <section className="build-preview">
        <h2>Ryzen Build – $1450</h2>
        <img src="/images/ryzenpc.jpg" alt="Ryzen Build" />
        <ul className="spec-list">
          <li><strong>CPU:</strong> AMD Ryzen 5</li>
          <li><strong>GPU:</strong> NVIDIA RTX 3070</li>
          <li><strong>RAM:</strong> 16GB DDR4</li>
          <li><strong>Storage:</strong> 1TB SSD</li>
          <li><strong>Motherboard:</strong> Micro-ATX</li>
          <li><strong>Power Supply:</strong> 750W</li>
        </ul>
      </section>
    </main>
  );
}
