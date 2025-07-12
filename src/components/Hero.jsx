const Hero = () => {
  const avatars = [
    "/assets/logos/Ellipse1.png",
    "/assets/logos/Ellipse2.png",
    "/assets/logos/Ellipse3.png",
    "/assets/logos/Ellipse4.png",
  ];

  return (
    <section className="pt-28 pb-16 bg-heroBg text-center">
      <div className="max-w-4xl mx-auto px-4">
        {/* Avatar group + text */}
        <div className="flex justify-center items-center space-x-4 mb-4">
          <div className="flex -space-x-2">
            {avatars.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Logo ${idx + 1}`}
                className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
              />
            ))}
          </div>
          <p className="text-xl text-gray-800 font-medium">
            Over <span className="font-bold">200+</span> Verified business
          </p>
        </div>

        {/* Heading */}
        <h1 className="text-5xl sm:text-5xl font-bold mb-4 leading-tight">
          Find and connect with trusted places, businesses, and services
          <br className="hidden sm:inline" /> around you
        </h1>
        <p className="text-gray-600 text-base sm:text-lg mb-6">
          From towns and cities to states, provinces and countries, we help your
          LOCAL space stand out on a CONTINENTAL Stage. It all starts when you
          List, Search, or Share.
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-2 bg-customGold text-white font-medium px-6 py-3 rounded-full hover:bg-yellow-500 transition"
        >
          Explore location
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 17L17 7M7 7h10v10"
            />
          </svg>
        </a>
      </div>

      {/*Hero Image with overlay */}
      <div className="relative mt-10 mx-auto px-4 w-full max-w-6xl">
        <div className="relative w-full h-[240px] sm:h-[320px] md:h-[412px]">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&auto=format&fit=crop"
            alt="Skyscrapers"
            className="w-full h-full object-cover rounded-[50px]"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-[50px]" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
