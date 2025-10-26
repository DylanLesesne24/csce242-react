import React from "react";

export default function BuildYourPc() {
  const parts = ["CPU", "GPU", "RAM", "Motherboard", "Storage", "Power Supply"];

  return (
    <main>
      <section id="builder">
        <h2>Build Your PC</h2>
        <p>Use the dropdowns below to choose your components.</p>

        <div className="builder-grid">
          {parts.map((part, i) => (
            <div key={i} className="builder-card">
              <h3>{part}</h3>
              <select>
                <option>Select {part}</option>
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
            </div>
          ))}
        </div>

        <section id="preview">
          <h2>Your Build Preview</h2>
          <div className="preview-box">
            <p>Selected components will appear here.</p>
          </div>
          <button id="build-btn">Build</button>
        </section>
      </section>
    </main>
  );
}
