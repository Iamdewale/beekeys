import React from "react";

export default function StateHero({
  title,
  subtitle,
  backgroundUrl,
  ctaText,
  ctaOnClick
}) {
  return (
    <section
      className="relative w-full h-[60vh] flex flex-col items-center justify-center text-center text-white"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-2xl font-light drop-shadow-md mb-6">
            {subtitle}
          </p>
        )}
        {ctaText && (
          <button
            onClick={ctaOnClick}
            className="bg-yellow-500 text-white px-6 py-3 rounded-full font-medium text-base md:text-lg hover:bg-yellow-600 transition-colors shadow-lg"
          >
            {ctaText}
          </button>
        )}
      </div>
    </section>
  );
}
