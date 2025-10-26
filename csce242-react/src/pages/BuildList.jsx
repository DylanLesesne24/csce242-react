import React from "react";
import builds from "../components/builds.json";
import PcCard from "./PcCard";

export default function BuildList() {
  return (
    <section id="prebuilt">
      <h2>Pre-Built PCs</h2>
      <div className="pc-grid">
        {builds.map((item) => (
          <PcCard
            key={item._id}
            img={item.img_name}
            title={item.title}
            price={item.price}
            desc={item.description}
            cpu={item.cpu}
            gpu={item.gpu}
            ram={item.ram}
            storage={item.storage}
            motherboard={item.motherboard}
            id={item._id}
          />
        ))}
      </div>
    </section>
  );
}
