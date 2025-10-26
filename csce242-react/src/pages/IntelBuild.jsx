import React from "react";

export default function IntelBuild() {
  return (
    <main>
      <section className="build-preview">
        <h2>Intel Build – $1300</h2>
        <img src="/images/intelpc.jpg" alt="Intel Build" />
        <ul className="spec-list">
          <li><strong>CPU:</strong> Intel i5</li>
          <li><strong>GPU:</strong> NVIDIA RTX 3060</li>
          <li><strong>RAM:</strong> 16GB DDR4</li>
          <li><strong>Storage:</strong> 512GB SSD</li>
          <li><strong>Motherboard:</strong> ATX</li>
          <li><strong>Power Supply:</strong> 650W</li>
        </ul>
      </section>
    </main>
  );
}
