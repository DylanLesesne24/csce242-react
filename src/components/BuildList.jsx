import React, { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function BuildList({ autoplay = true, interval = 4500, maxSlides = null }) {
  const [rawBuilds, setRawBuilds] = useState(null);
  const slides = useMemo(
    () => (Array.isArray(rawBuilds) ? rawBuilds.slice(0, maxSlides || rawBuilds.length) : []),
    [rawBuilds, maxSlides]
  );
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef(null);
  const autoplayRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const rawApi = process.env.REACT_APP_API_URL || "https://csce242-react-server.onrender.com";
    const API = rawApi.replace(/\/+$/g, "");
    const url = `${API}/api/builds`;
    console.log("DEBUG: fetching builds from", url);

    fetch(url, { cache: "no-store" })
      .then((r) => {
        console.log("DEBUG: /api/builds status", r.status, r.statusText);
        if (!r.ok) return r.text().then((t) => { throw new Error(`HTTP ${r.status}: ${t.slice(0, 200)}`); });
        return r.json();
      })
      .then((data) => {
        console.log("DEBUG: builds payload", data);
        setRawBuilds(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("DEBUG: failed to load builds:", err);
        setRawBuilds([]);
      });
  }, []);

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

  if (rawBuilds === null) {
    return (
      <section id="prebuilt">
        <h2>Pre-Built PCs</h2>
        <div>Loading builds…</div>
      </section>
    );
  }

  if (!slides.length) {
    return (
      <section id="prebuilt">
        <h2>Pre-Built PCs</h2>
        <div>No builds found.</div>
      </section>
    );
  }

  return (
    <section id="prebuilt">
      <h2>Pre-Built PCs</h2>
      <div
        className="build-slideshow"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-roledescription="carousel"
      >
        <div className="slideshow-track" ref={trackRef}>
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
              >
                <div
                  className="slide-link"
                  onClick={() => onSlideClick(b._id ?? i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") onSlideClick(b._id ?? i);
                  }}
                  role="link"
                  tabIndex={0}
                  aria-label={`Open ${b.title}`}
                >
                  <img className="slide-image" src={img} alt={b.title || `Build ${i + 1}`} loading="lazy" />
                  <div className="slide-text">
                    <h3 className="slide-title">{b.title}</h3>
                    {b.price && <div className="slide-price">{b.price}</div>}
                    {b.description && <p className="slide-desc">{b.description}</p>}
                    <ul className="spec-list">
                      {b.cpu && <li><strong>CPU:</strong> {b.cpu}</li>}
                      {b.gpu && <li><strong>GPU:</strong> {b.gpu}</li>}
                      {b.ram && <li><strong>RAM:</strong> {b.ram}</li>}
                      {b.storage && <li><strong>Storage:</strong> {b.storage}</li>}
                      {b.motherboard && <li><strong>Motherboard:</strong> {b.motherboard}</li>}
                      {b.power_supply && <li><strong>Power Supply:</strong> {b.power_supply}</li>}
                      {!b.power_supply && b.psu && <li><strong>Power Supply:</strong> {b.psu}</li>}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {slides.length > 1 && (
          <>
            <button className="slideshow-btn prev" onClick={prev} aria-label="Previous slide">‹</button>
            <button className="slideshow-btn next" onClick={next} aria-label="Next slide">›</button>

            <div className="slideshow-dots" role="tablist">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`dot ${i === index ? "active" : ""}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
