import React from "react";

export default function PcCard({
  img, title, price, desc, cpu, gpu, ram, storage, motherboard, id
}) {
  const link =
    id === 1 ? "/intel-build" :
    id === 2 ? "/ryzen-build" : "#";

  return (
    <article className="pc-card">
      <img
        src={`/${img}`}
        alt={title}
        onError={(e) => (e.target.src = "/images/placeholder-300x200.jpg")}
      />
      <h3><a href={link}>{title} — {price}</a></h3>
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
