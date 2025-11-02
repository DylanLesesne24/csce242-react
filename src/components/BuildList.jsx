import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import builds from "./builds.json";

export default function BuildList({ autoplay = true, interval = 4500, maxSlides = null }) {
  const slides = Array.isArray(builds) ? builds.slice(0, maxSlides || builds.length) : [];
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef(null);
  const autoplayRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!autoplay || slides.length <= 1) return;
    if (paused) return;
    autoplayRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, interval);
    return () => clearInterval(autoplayRef.current);
  }, [autoplay, interval, paused, slides.length]);

  useEffect(() => {
    if (!trackRef.current) return;
    trackRef.current.style.transform = `translateX(-${index * 100}%)`;
  }, [index]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slides.length]);

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);
  const goTo = (i) => setIndex(((i % slides.length) + slides.length) % slides.length);

  const resolveImg = (p) => {
    if (!p) return process.env.PUBLIC_URL + "/images/placeholder-300x200.jpg";
    if (p.startsWith("http")) return p;
    if (p.startsWith("/")) return process.env.PUBLIC_URL + p;
    if (p.startsWith("images/")) return process.env.PUBLIC_URL + "/" + p;
    return process.env.PUBLIC_URL + "/images/" + p;
  };

  const onSlideClick = (id) => {
    navigate(`/builds/${encodeURIComponent(id)}`);
  };

  if (!slides.length) {
    return (
      <section id="prebuilt" style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Pre-Built PCs</h2>
        <div style={{ padding: 20 }}>No builds found.</div>
      </section>
    );
  }

  const containerStyle = {
    position: "relative",
    width: "100%",
    maxWidth: 980,
    margin: "0 auto",
    overflow: "hidden",
    background: "white",
    borderRadius: 6,
    border: `2px solid ${getComputedRootColor("--primary-color") || "#333"}`,
    padding: 8,
    boxShadow: "3px 3px #f2f2f2",
  };

  function getComputedRootColor(varName) {
    try {
      return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    } catch (e) {
      return null;
    }
  }

  const trackStyle = {
    display: "flex",
    transition: "transform 420ms cubic-bezier(.22,.9,.35,1)",
    width: "100%",
    alignItems: "center",
  };

  const slideStyle = {
    minWidth: "100%",
    boxSizing: "border-box",
    padding: "8px 12px",
    display: "flex",
    alignItems: "center",
    gap: 16,
    justifyContent: "center",
  };

  const imgStyle = {
    width: 200,
    maxWidth: "28%",
    height: 160,
    objectFit: "cover",
    borderRadius: 4,
    border: "1px solid #cccccc",
    boxShadow: "2px 2px #f2f2f2",
    flexShrink: 0,
  };

  const textStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    maxWidth: "68%",
    color: getComputedRootColor("--primary-color") || "#333",
    textAlign: "left",
  };

  const btnStyle = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: 38,
    height: 38,
    borderRadius: "50%",
    border: "none",
    background: "rgba(0,0,0,0.38)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    zIndex: 20,
  };

  return (
    <section id="prebuilt" style={{ padding: "2rem" }}>
      <h2 style={{ textAlign: "center" }}>Pre-Built PCs</h2>
      <div
        className="build-slideshow"
        style={containerStyle}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-roledescription="carousel"
      >
        <div className="slideshow-track" ref={trackRef} style={trackStyle}>
          {slides.map((b, i) => {
            const img = resolveImg(b.img_name);
            const key = b._id ?? i;
            return (
              <div
                className={`slideshow-slide ${i === index ? "active" : ""}`}
                key={key}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${slides.length}`}
                style={slideStyle}
              >
                <div
                  style={{ display: "flex", gap: 16, alignItems: "center", width: "100%", cursor: "pointer" }}
                  onClick={() => onSlideClick(b._id ?? i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") onSlideClick(b._id ?? i);
                  }}
                  role="link"
                  tabIndex={0}
                  aria-label={`Open ${b.title}`}
                >
                  <img style={imgStyle} src={img} alt={b.title || `Build ${i + 1}`} loading="lazy" />
                  <div className="slide-text" style={textStyle}>
                    <h3 style={{ margin: 0, fontSize: "1rem", color: getComputedRootColor("--primary-color") || "#333" }}>
                      {b.title}
                    </h3>
                    {b.price && <div style={{ fontWeight: 700 }}>{b.price}</div>}
                    {b.description && <p style={{ margin: 0, color: getComputedRootColor("--dark-gray") || "#444" }}>{b.description}</p>}
                    <ul style={{ listStyle: "none", padding: 0, marginTop: 6 }}>
                      {b.cpu && <li><strong>CPU:</strong> {b.cpu}</li>}
                      {b.gpu && <li><strong>GPU:</strong> {b.gpu}</li>}
                      {b.ram && <li><strong>RAM:</strong> {b.ram}</li>}
                      {b.storage && <li><strong>Storage:</strong> {b.storage}</li>}
                      {b.motherboard && <li><strong>Motherboard:</strong> {b.motherboard}</li>}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {slides.length > 1 && (
          <>
            <button
              className="slideshow-btn prev"
              onClick={prev}
              aria-label="Previous slide"
              style={{ ...btnStyle, left: 10 }}
            >
              ‹
            </button>
            <button
              className="slideshow-btn next"
              onClick={next}
              aria-label="Next slide"
              style={{ ...btnStyle, right: 10 }}
            >
              ›
            </button>

            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 10 }}>
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: i === index ? (getComputedRootColor("--primary-color") || "#333") : "#999",
                    border: "none",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
