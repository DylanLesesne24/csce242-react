import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BuildDetail() {
  const { id } = useParams();
  const [build, setBuild] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    const API = process.env.REACT_APP_API_URL || "https://csce242-react-server.onrender.com/";
    fetch(`${API}/api/builds/${encodeURIComponent(id)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Build not found");
        return res.json();
      })
      .then((data) => {
        setBuild(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error loading build");
        setLoading(false);
      });
  }, [id]);

  const resolveImg = (p) => {
    if (!p) return process.env.PUBLIC_URL + "/images/placeholder-300x200.jpg";
    if (p.startsWith("http")) return p;
    if (p.startsWith("/")) return process.env.PUBLIC_URL + p;
    if (p.startsWith("images/")) return process.env.PUBLIC_URL + "/" + p;
    return process.env.PUBLIC_URL + "/images/" + p;
  };

  const addToCart = () => {
    try {
      const cartRaw = localStorage.getItem("cart");
      const cart = cartRaw ? JSON.parse(cartRaw) : [];
      const item = {
        id: build._id ?? id,
        title: build.title ?? "Build",
        price: build.price ?? "",
        timestamp: Date.now()
      };
      cart.push(item);
      localStorage.setItem("cart", JSON.stringify(cart));
      setResult("Added to cart");
    } catch (e) {
      setResult("Error adding to cart");
    }
  };

  if (loading) return <main className="build-preview"><p>Loading...</p></main>;
  if (error) return <main className="build-preview"><p style={{ color: "red" }}>{error}</p></main>;
  if (!build) return <main className="build-preview"><p>No build data.</p></main>;

  return (
    <main className="build-preview">
      <h2>{build.title} — {build.price}</h2>
      <div className="build-detail-media">
        <img
          src={resolveImg(build.img_name)}
          alt={build.title}
          className="build-detail-image"
        />
      </div>
      {build.description && <p className="build-desc">{build.description}</p>}
      <ul className="spec-list">
        {build.cpu && <li><strong>CPU:</strong> {build.cpu}</li>}
        {build.gpu && <li><strong>GPU:</strong> {build.gpu}</li>}
        {build.ram && <li><strong>RAM:</strong> {build.ram}</li>}
        {build.storage && <li><strong>Storage:</strong> {build.storage}</li>}
        {build.motherboard && <li><strong>Motherboard:</strong> {build.motherboard}</li>}
        {build.power_supply && <li><strong>Power Supply:</strong> {build.power_supply}</li>}
        {!build.power_supply && build.psu && <li><strong>Power Supply:</strong> {build.psu}</li>}
      </ul>
      <div className="build-actions">
        <button id="build-btn" onClick={addToCart}>Add to cart</button>
        <div id="add-result">{result}</div>
      </div>
    </main>
  );
}
