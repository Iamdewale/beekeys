import React from "react";

export default function WorldMapSVG() {
  return (
    <svg viewBox="0 0 1000 500" className="w-full h-auto">
      {/* Example: Africa region */}
      <a href="/country/nigeria">
        <path
          d="M500,250 L520,270 L510,280 Z"
          fill="#2563eb"
          stroke="#fff"
          strokeWidth="1"
          className="hover:fill-blue-700 transition-all duration-300 cursor-pointer"
        />
      </a>

      <a href="/country/kenya">
        <circle
          cx="550"
          cy="300"
          r="8"
          fill="#2563eb"
          className="hover:fill-blue-700 cursor-pointer transition"
        />
      </a>

      {/* Add more paths or circles here */}
    </svg>
  );
}
