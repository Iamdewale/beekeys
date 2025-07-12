import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Container1 from "../assets/images/Container1.png";

const values = [
  {
    title: "Verified & Trusted",
    description:
      "Owner-verified listings with manual verification. No fake reviews, no guess work. Just authentic businesses you can trust.",
    image: Container1,
    link: "#"
  },
  {
    title: "Made for Search",
    description:
      "Clinic, café, or the local graphic design studio? From retail to finance, we sort local listings by what your customers need. Fast.",
    image: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "#"
  },
  {
    title: "Fast & Accurate",
    description:
      "Simple navigation. Direct access to verified contact information, hours and services updated by business owners themselves.",
    image: "https://plus.unsplash.com/premium_photo-1664647267269-cc68263fc517?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "#"
  },
];

const Features = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="bg-heroBg py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <p className="text-sm text-gray-600 mb-2">Our Values</p>
        <h2 className="text-3xl md:text-4xl font-semibold leading-snug max-w-3xl mb-12">
          We’re building trust in local business discovery with unique features you won’t find anywhere else.
        </h2>

        {/* Mobile Swiper */}
        <div className="md:hidden">
          <Swiper spaceBetween={16} slidesPerView={1.1} className="pl-1">
            {values.map((feature, idx) => (
              <SwiperSlide key={idx}>
                <a
                  href={feature.link}
                  className="block relative h-64 rounded-xl overflow-hidden group"
                >
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition" />
                  <div className="absolute inset-0 flex flex-col justify-end p-5 text-white z-10">
                    <h4 className="text-lg font-semibold mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm leading-snug">{feature.description}</p>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {values.map((feature, idx) => (
            <a
              key={idx}
              href={feature.link}
              className="relative h-64 rounded-xl overflow-hidden group"
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 text-white z-10">
                <h4 className="text-lg font-semibold mb-1">{feature.title}</h4>
                <p className="text-sm leading-snug">{feature.description}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Collapsible toggle (mobile fallback) */}
        <div className="md:hidden mt-6 text-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-yellow-600 font-semibold underline"
          >
            {expanded ? "Hide features" : "View features as list"}
          </button>
          {expanded && (
            <div className="mt-4 space-y-6">
              {values.map((feature, idx) => (
                <div key={idx} className="border rounded-lg p-4 bg-white">
                  <h4 className="font-bold">{feature.title}</h4>
                  <p className="text-sm text-gray-700">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Features;
