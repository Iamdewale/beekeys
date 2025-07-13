import { useEffect, useState, useRef } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Listings = () => {
  const [businesses, setBusinesses] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setBusinesses(data))
      .catch((err) => console.error("Failed to load listings", err));
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
    }

    return stars;
  };

  // Optional: scroll left/right functions
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 pb-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-4xl font-bold">Popular Listings</h2>
        <div className="hidden sm:flex gap-2">
          <button
            onClick={scrollLeft}
            className="px-3 py-1 border rounded-full text-sm hover:bg-gray-100"
          >
            ←
          </button>
          <button
            onClick={scrollRight}
            className="px-3 py-1 border rounded-full text-sm hover:bg-gray-100"
          >
            →
          </button>
        </div>
      </div>

      {/* Carousel Scroll Wrapper */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-6 pb-4"
      >
        {businesses.map((biz) => (
          <div
            key={biz.id}
            className="min-w-[280px] sm:min-w-[320px] snap-start bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
          >
            <img
              src={biz.image}
              alt={biz.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {biz.name}
              </h3>
              <p className="text-sm text-gray-500">{biz.category}</p>
              <p className="text-xs text-gray-400">{biz.location}</p>

              <div className="flex items-center space-x-1 text-yellow-500 text-sm mt-2">
                {renderStars(biz.rating)}
                <span className="ml-2 text-gray-600 font-medium">
                  {biz.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Listings;
