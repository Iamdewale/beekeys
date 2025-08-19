// src/components/StateHero.jsx
import React from "react";

export default function StateHero({ title, subtitle, backgroundUrl }) {
  return (
    <div
      className="relative w-full h-64 md:h-96 flex items-center justify-center text-center text-white"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      <div className="relative z-10 px-4">
        <h1 className="text-3xl md:text-5xl font-bold">{title}</h1>
        {subtitle && <p className="mt-2 text-lg md:text-xl">{subtitle}</p>}
      </div>
    </div>
  );
}
