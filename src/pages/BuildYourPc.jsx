import React, { useState } from "react";

export default function BuildYourPc() {
  const API_BASE = "https://csce242-react-server.onrender.com";

  const [form, setForm] = useState({
    cpu: "",
    gpu: "",
    ram: "",
    motherboard: "",
    storage: "",
    power_supply: ""
  });

  const parts = [
    { name: "CPU", key: "cpu", options: ["Select CPU", "Intel i5", "Intel i7", "Ryzen 5", "Ryzen 7"] },
    { name: "GPU", key: "gpu", options: ["Select GPU", "NVIDIA RTX 3060", "NVIDIA RTX 3070", "AMD RX 6700 XT"] },
    { name: "RAM", key: "ram", options: ["Select RAM", "8GB DDR4", "16GB DDR4", "32GB DDR5"] },
    { name: "Motherboard", key: "motherboard", options: ["Select Motherboard", "ATX", "Micro-ATX", "Mini-ITX"] },
    { name: "Storage", key: "storage", options: ["Select Storage", "500GB SSD", "1TB SSD", "2TB HDD"] },
    { name: "Power Supply", key: "power_supply", options: ["Select Power Supply", "500W", "650W", "750W"] }
  ];

  const [createdBuild, setCreatedBuild] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleViewBuild() {
    try {
      const res = await fetch(`${API_BASE}/api/userbuilds`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("Non-JSON response from server:", text);
        alert("Server returned a non-JSON response. Check console for details.");
        return;
      }

      if (res.ok && data && data.success) {
        setCreatedBuild(data.build);
        alert("Build stored successfully!");
      } else {
        console.error("Server rejected request:", data || text);
        alert("Error saving build: " + (data && (data.message || JSON.stringify(data)) || text));
      }
    } catch (err) {
      console.error("Network or fetch error:", err);
      alert("Could not connect to the server!");
    }
  }

  return (
    <main>
      <section id="builder">
        <h2>Build Your PC</h2>
        <p>Use the dropdowns below to choose your components.</p>

        <div className="builder-grid">
          {parts.map((part, i) => (
            <div key={i} className="builder-card">
              <h3>{part.name}</h3>
              <select name={part.key} value={form[part.key]} onChange={handleChange}>
                {part.options.map((opt, j) => (
                  <option key={j} value={opt === part.options[0] ? "" : opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <button onClick={handleViewBuild}>View Build</button>

        {createdBuild && (
          <section id="preview" style={{ marginTop: 30 }}>
            <h3>Your Build</h3>
            <div className="preview-box" style={{ border: "1px solid #ddd", padding: 15 }}>
              <p><strong>CPU:</strong> {createdBuild.cpu}</p>
              <p><strong>GPU:</strong> {createdBuild.gpu}</p>
              <p><strong>RAM:</strong> {createdBuild.ram}</p>
              <p><strong>Motherboard:</strong> {createdBuild.motherboard}</p>
              <p><strong>Storage:</strong> {createdBuild.storage}</p>
              <p><strong>Power Supply:</strong> {createdBuild.power_supply}</p>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
