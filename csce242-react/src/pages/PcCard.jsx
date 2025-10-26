import React from "react";
import { Link } from "react-router-dom";

export default function PcCard({
  img,
  title,
  price,
  desc,
  cpu,
  gpu,
  ram,
  storage,
  motherboard,
  id,
}) {
  // helper to resolve any incoming img value to the correct PUBLIC_URL path
  const resolveImg = (p) => {
    if (!p) return process.env.PUBLIC_URL + "/images/placeholder-300x200.jpg";
    if (p.startsWith("http")) return p;
    // if already starts with /images or /something
    if (p.startsWith("/")) return process.env.PUBLIC_URL + p;
    // if given "images/..." without leading slash
    if (p.startsWith("images/")) return process.env.PUBLIC_URL + "/" + p;
    // otherwise treat as filename in images folder
    return process.env.PUBLIC_URL + "/images/" + p;
  };

  const link =
    id === 1 ? "/intel-build" :
    id === 2 ? "/ryzen-build" : "#";

  return (
    <article className="pc-card">
      <img
        src={resolveImg(img)}
        alt={title}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = process.env.PUBLIC_URL + "/images/placeholder-300x200.jpg";
        }}
      />
      <h3>
        <Link to={link}>{title} — {price}</Link>
      </h3>
      <p>{desc}</p>
      <ul className="spec-list">
        <li><strong>CPU:</strong> {cpu}</li>
        <li><strong>GPU:</strong> {gpu}</li>
        <li><strong>RAM:</strong> {ram}</li>
        <li><strong>Storage:</strong> {storage}</li>
        <li><strong>Motherboard:</strong> {motherboard}</li>
      </ul>
    </article>
  );
}
